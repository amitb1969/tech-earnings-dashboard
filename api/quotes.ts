// Live quote proxy. Fetches real prices from Yahoo Finance's public v8 chart
// endpoint (no API key, no crumb cookie required) so the dashboard never
// fabricates price data. The v7 /quote endpoint frequently 401s without a
// crumb; the v8 /chart endpoint is reliable for a single price point.
//
// Runs as a Vercel Node serverless function.

import type { IncomingMessage, ServerResponse } from "http";

interface ChartMeta {
  regularMarketPrice?: number;
  chartPreviousClose?: number;
  previousClose?: number;
  regularMarketTime?: number;
  currency?: string;
  symbol?: string;
  marketState?: string;
}

interface ChartResponse {
  chart?: {
    result?: Array<{ meta?: ChartMeta }>;
    error?: { code?: string; description?: string } | null;
  };
}

interface Quote {
  symbol: string;
  price: number | null;
  previousClose: number | null;
  change: number | null;
  changePercent: number | null;
  currency: string;
  marketState: string | null;
  asOf: string | null;
}

const ALLOWED = new Set(["META", "MSFT", "GOOGL", "AMZN", "AAPL"]);
const TIMEOUT_MS = 5000;

async function fetchOne(symbol: string): Promise<Quote> {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=1d`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; tech-earnings-dashboard/1.0; +https://github.com/amitb1969/tech-earnings-dashboard)",
        Accept: "application/json",
      },
    });
    if (!res.ok) {
      return emptyQuote(symbol);
    }
    const data = (await res.json()) as ChartResponse;
    const meta = data.chart?.result?.[0]?.meta;
    if (!meta || typeof meta.regularMarketPrice !== "number") {
      return emptyQuote(symbol);
    }
    const price = meta.regularMarketPrice;
    const prev = meta.chartPreviousClose ?? meta.previousClose ?? null;
    const change = prev != null ? price - prev : null;
    const changePercent = prev != null && prev !== 0 ? ((price - prev) / prev) * 100 : null;
    return {
      symbol,
      price,
      previousClose: prev,
      change,
      changePercent,
      currency: meta.currency ?? "USD",
      marketState: meta.marketState ?? null,
      asOf: meta.regularMarketTime ? new Date(meta.regularMarketTime * 1000).toISOString() : null,
    };
  } catch {
    return emptyQuote(symbol);
  } finally {
    clearTimeout(timer);
  }
}

function emptyQuote(symbol: string): Quote {
  return {
    symbol,
    price: null,
    previousClose: null,
    change: null,
    changePercent: null,
    currency: "USD",
    marketState: null,
    asOf: null,
  };
}

export default async function handler(
  req: IncomingMessage & { query?: Record<string, string | string[]> },
  res: ServerResponse
) {
  const url = new URL(req.url || "/", "http://localhost");
  const symbolsParam = (req.query?.symbols as string) ?? url.searchParams.get("symbols") ?? "";
  const requested = symbolsParam
    .split(",")
    .map((s) => s.trim().toUpperCase())
    .filter((s) => ALLOWED.has(s));

  const symbols = requested.length > 0 ? requested : Array.from(ALLOWED);

  res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=300");
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  try {
    const quotes = await Promise.all(symbols.map(fetchOne));
    const ok = quotes.some((q) => q.price != null);
    res.statusCode = ok ? 200 : 502;
    res.end(
      JSON.stringify({
        quotes,
        source: "Yahoo Finance (chart v8)",
        fetchedAt: new Date().toISOString(),
        partial: !quotes.every((q) => q.price != null),
      })
    );
  } catch (err) {
    res.statusCode = 500;
    res.end(
      JSON.stringify({
        error: "fetch_failed",
        message: err instanceof Error ? err.message : String(err),
      })
    );
  }
}
