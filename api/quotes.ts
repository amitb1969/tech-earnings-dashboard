// Live quote proxy. Fetches real prices from Yahoo Finance's public endpoint
// (no API key required) so the dashboard never fabricates price data.
// Runs as a Vercel Node serverless function.

import type { IncomingMessage, ServerResponse } from "http";

interface YahooQuote {
  symbol: string;
  regularMarketPrice?: number;
  regularMarketChange?: number;
  regularMarketChangePercent?: number;
  regularMarketPreviousClose?: number;
  regularMarketTime?: number;
  currency?: string;
  shortName?: string;
  marketState?: string;
}

interface YahooResponse {
  quoteResponse?: { result?: YahooQuote[]; error?: { description?: string } | null };
}

const ALLOWED = new Set(["META", "MSFT", "GOOGL", "AMZN", "AAPL"]);

export default async function handler(req: IncomingMessage & { query?: Record<string, string | string[]> }, res: ServerResponse) {
  const url = new URL(req.url || "", "http://localhost");
  const symbolsParam = (req.query?.symbols as string) ?? url.searchParams.get("symbols") ?? "";
  const requested = symbolsParam
    .split(",")
    .map((s) => s.trim().toUpperCase())
    .filter((s) => ALLOWED.has(s));

  const symbols = requested.length > 0 ? requested : Array.from(ALLOWED);

  res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=300");
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  try {
    const yahooUrl = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${encodeURIComponent(symbols.join(","))}`;
    const upstream = await fetch(yahooUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; tech-earnings-dashboard/1.0; +https://github.com/amitb1969/tech-earnings-dashboard)",
        Accept: "application/json",
      },
    });

    if (!upstream.ok) {
      res.statusCode = 502;
      res.end(JSON.stringify({ error: "upstream_error", status: upstream.status }));
      return;
    }

    const data = (await upstream.json()) as YahooResponse;
    const results = data.quoteResponse?.result ?? [];

    const quotes = results.map((q) => ({
      symbol: q.symbol,
      price: q.regularMarketPrice ?? null,
      change: q.regularMarketChange ?? null,
      changePercent: q.regularMarketChangePercent ?? null,
      previousClose: q.regularMarketPreviousClose ?? null,
      currency: q.currency ?? "USD",
      marketState: q.marketState ?? null,
      asOf: q.regularMarketTime ? new Date(q.regularMarketTime * 1000).toISOString() : null,
    }));

    res.statusCode = 200;
    res.end(JSON.stringify({ quotes, source: "Yahoo Finance", fetchedAt: new Date().toISOString() }));
  } catch (err) {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: "fetch_failed", message: err instanceof Error ? err.message : String(err) }));
  }
}
