// Recent earnings radar. Pulls the last 7 days of US tech earnings from
// Finnhub's calendar, filters against a curated large-cap tech universe,
// sorts by market cap, takes the top 10, and computes a 1-day price
// reaction from Yahoo's v8 chart endpoint.
//
// Requires the FINNHUB_API_KEY env var. If missing, the endpoint returns
// {available:false} so the UI can gracefully hide the section.

import type { IncomingMessage, ServerResponse } from "http";

// Curated US-listed large-cap tech universe (mega + large + select mid).
// Keeping this curated rather than auto-detecting industry codes because
// Finnhub's industry classification is noisy (e.g. AMZN = Consumer
// Cyclical, META = Communication Services).
const TECH_UNIVERSE = [
  "AAPL", "MSFT", "GOOGL", "GOOG", "AMZN", "META", "NVDA", "TSLA",
  "AVGO", "ORCL", "TSM", "ADBE", "CSCO", "NFLX", "AMD", "CRM",
  "IBM", "INTU", "NOW", "QCOM", "TXN", "ARM", "INTC", "MU",
  "ADI", "PLTR", "BKNG", "UBER", "AMAT", "KLAC", "LRCX", "ASML",
  "SHOP", "ABNB", "PANW", "CRWD", "FTNT", "SNOW", "DDOG", "NET",
  "MELI", "SPOT", "ANET", "MRVL", "MDB", "OKTA", "PYPL", "SMCI",
  "DELL", "HPE", "WDAY", "TEAM",
];

const FINNHUB = "https://finnhub.io/api/v1";
const YAHOO_CHART = "https://query1.finance.yahoo.com/v8/finance/chart";
const TIMEOUT_MS = 6000;
const UA =
  "Mozilla/5.0 (compatible; tech-earnings-dashboard/1.0; +https://github.com/amitb1969/tech-earnings-dashboard)";

interface FinnhubCalendarItem {
  date: string;
  hour?: string; // "bmo" | "amc" | "dmh" | ""
  symbol: string;
  epsActual?: number | null;
  epsEstimate?: number | null;
  revenueActual?: number | null;
  revenueEstimate?: number | null;
  year?: number;
  quarter?: number;
}

interface FinnhubProfile {
  name?: string;
  ticker?: string;
  logo?: string;
  marketCapitalization?: number; // millions of USD
  finnhubIndustry?: string;
  exchange?: string;
  weburl?: string;
}

interface ResultRow {
  ticker: string;
  name: string | null;
  logo: string | null;
  marketCapB: number | null; // billions USD
  reportDate: string;
  hour: string | null;
  epsActual: number | null;
  epsEstimate: number | null;
  epsSurprisePct: number | null;
  revenueActualB: number | null; // billions USD
  revenueEstimateB: number | null;
  revenueSurprisePct: number | null;
  priceReactionPct: number | null;
  beat: "beat" | "miss" | "mixed" | "n/a";
}

async function fetchJson<T>(url: string, signal: AbortSignal): Promise<T | null> {
  try {
    const res = await fetch(url, {
      signal,
      headers: { "User-Agent": UA, Accept: "application/json" },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

function isoDaysAgo(days: number): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - days);
  return d.toISOString().slice(0, 10);
}

function pct(actual: number | null | undefined, est: number | null | undefined): number | null {
  if (actual == null || est == null || est === 0) return null;
  return ((actual - est) / Math.abs(est)) * 100;
}

function classifyBeat(epsPct: number | null, revPct: number | null): ResultRow["beat"] {
  if (epsPct == null && revPct == null) return "n/a";
  const epsBeat = epsPct != null && epsPct >= 0;
  const revBeat = revPct != null && revPct >= 0;
  const epsMiss = epsPct != null && epsPct < 0;
  const revMiss = revPct != null && revPct < 0;
  if (epsBeat && revBeat) return "beat";
  if (epsMiss && revMiss) return "miss";
  return "mixed";
}

// Compute the 1-day price reaction around the report.
// hour="bmo" => reaction = (close_report - close_prior) / close_prior
// hour="amc" or empty => reaction = (close_next - close_report) / close_report
async function priceReaction(
  symbol: string,
  reportDate: string,
  hour: string,
  signal: AbortSignal
): Promise<number | null> {
  // Pull a 1-month daily window centered on the report date so we have
  // both the prior and next trading day available regardless of weekends.
  const url = `${YAHOO_CHART}/${encodeURIComponent(symbol)}?interval=1d&range=1mo`;
  type ChartResp = {
    chart?: {
      result?: Array<{
        timestamp?: number[];
        indicators?: { quote?: Array<{ close?: (number | null)[] }> };
      }>;
    };
  };
  const data = await fetchJson<ChartResp>(url, signal);
  const r = data?.chart?.result?.[0];
  const ts = r?.timestamp ?? [];
  const closes = r?.indicators?.quote?.[0]?.close ?? [];
  if (ts.length === 0 || ts.length !== closes.length) return null;

  // Find the index of the report date (or the closest trading day at or before it).
  const reportEpoch = Date.parse(reportDate + "T00:00:00Z") / 1000;
  let idxReport = -1;
  for (let i = 0; i < ts.length; i++) {
    const dayStart = ts[i];
    if (dayStart <= reportEpoch + 86400 && dayStart >= reportEpoch - 86400) {
      idxReport = i;
      break;
    }
  }
  if (idxReport < 0) return null;

  const isBMO = hour === "bmo";
  const idxBefore = isBMO ? idxReport - 1 : idxReport;
  const idxAfter = isBMO ? idxReport : idxReport + 1;
  if (idxBefore < 0 || idxAfter >= closes.length) return null;
  const cBefore = closes[idxBefore];
  const cAfter = closes[idxAfter];
  if (cBefore == null || cAfter == null || cBefore === 0) return null;
  return ((cAfter - cBefore) / cBefore) * 100;
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  const apiKey = process.env.FINNHUB_API_KEY;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=21600, stale-while-revalidate=86400");

  if (!apiKey) {
    res.statusCode = 200;
    res.end(
      JSON.stringify({
        available: false,
        reason: "FINNHUB_API_KEY not configured",
        results: [],
      })
    );
    return;
  }

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS * 4);

  try {
    const from = isoDaysAgo(7);
    const to = isoDaysAgo(0);

    type CalendarResp = { earningsCalendar?: FinnhubCalendarItem[] };
    const cal = await fetchJson<CalendarResp>(
      `${FINNHUB}/calendar/earnings?from=${from}&to=${to}&token=${apiKey}`,
      ctrl.signal
    );
    const calendar = cal?.earningsCalendar ?? [];

    const universe = new Set(TECH_UNIVERSE);
    // Dedupe by symbol, keep latest date if multiple.
    const bySymbol = new Map<string, FinnhubCalendarItem>();
    for (const item of calendar) {
      if (!universe.has(item.symbol)) continue;
      const prev = bySymbol.get(item.symbol);
      if (!prev || item.date > prev.date) bySymbol.set(item.symbol, item);
    }
    const candidates = Array.from(bySymbol.values());

    // Fetch profiles in parallel for market cap.
    const profiles = await Promise.all(
      candidates.map(async (c) => {
        const p = await fetchJson<FinnhubProfile>(
          `${FINNHUB}/stock/profile2?symbol=${encodeURIComponent(c.symbol)}&token=${apiKey}`,
          ctrl.signal
        );
        return { item: c, profile: p };
      })
    );

    // Sort by market cap (descending), drop ones we couldn't price.
    profiles.sort((a, b) => (b.profile?.marketCapitalization ?? 0) - (a.profile?.marketCapitalization ?? 0));
    const top = profiles.slice(0, 10);

    // Compute price reactions in parallel.
    const reactions = await Promise.all(
      top.map((entry) => priceReaction(entry.item.symbol, entry.item.date, entry.item.hour ?? "", ctrl.signal))
    );

    const results: ResultRow[] = top.map((entry, i) => {
      const c = entry.item;
      const p = entry.profile;
      const epsPct = pct(c.epsActual ?? null, c.epsEstimate ?? null);
      const revPct = pct(c.revenueActual ?? null, c.revenueEstimate ?? null);
      // Finnhub revenue is reported in raw USD; convert to billions.
      const toB = (v: number | null | undefined) => (v == null ? null : v / 1_000_000_000);
      // marketCapitalization is in millions of USD.
      const mcapB = p?.marketCapitalization != null ? p.marketCapitalization / 1000 : null;
      return {
        ticker: c.symbol,
        name: p?.name ?? null,
        logo: p?.logo ?? null,
        marketCapB: mcapB,
        reportDate: c.date,
        hour: c.hour ?? null,
        epsActual: c.epsActual ?? null,
        epsEstimate: c.epsEstimate ?? null,
        epsSurprisePct: epsPct,
        revenueActualB: toB(c.revenueActual ?? null),
        revenueEstimateB: toB(c.revenueEstimate ?? null),
        revenueSurprisePct: revPct,
        priceReactionPct: reactions[i],
        beat: classifyBeat(epsPct, revPct),
      };
    });

    res.statusCode = 200;
    res.end(
      JSON.stringify({
        available: true,
        windowFrom: from,
        windowTo: to,
        fetchedAt: new Date().toISOString(),
        sources: ["Finnhub (calendar/earnings, stock/profile2)", "Yahoo Finance (chart v8)"],
        results,
      })
    );
  } catch (err) {
    res.statusCode = 200;
    res.end(
      JSON.stringify({
        available: false,
        reason: err instanceof Error ? err.message : "fetch_failed",
        results: [],
      })
    );
  } finally {
    clearTimeout(timer);
  }
}
