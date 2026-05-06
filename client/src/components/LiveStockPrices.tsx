import { useEffect, useMemo, useState } from "react";
import { TrendingUp, TrendingDown, Minus, RefreshCw } from "lucide-react";
import { earningsDayClose } from "@/lib/earningsData";

interface Quote {
  symbol: string;
  price: number | null;
  change: number | null;
  changePercent: number | null;
  previousClose: number | null;
  currency: string;
  marketState: string | null;
  asOf: string | null;
}

interface QuoteResponse {
  quotes: Quote[];
  source: string;
  fetchedAt: string;
}

const TICKERS = Object.keys(earningsDayClose);

export default function LiveStockPrices() {
  const [quotes, setQuotes] = useState<Quote[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fetchedAt, setFetchedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const load = useMemo(
    () => async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/quotes?symbols=${TICKERS.join(",")}`, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as QuoteResponse;
        setQuotes(data.quotes ?? []);
        setFetchedAt(data.fetchedAt ?? new Date().toISOString());
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load prices");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    load();
  }, [load]);

  const fetchedLabel = fetchedAt
    ? new Date(fetchedAt).toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    : null;

  return (
    <div className="border-b border-border bg-white">
      <div className="container py-8">
        <div className="flex items-end justify-between gap-4 mb-4 flex-wrap">
          <div>
            <h2 className="text-2xl font-bold" style={{ fontFamily: "'Sora', sans-serif" }}>
              Live Stock Prices
            </h2>
            <p className="text-muted-foreground text-sm">
              Real-time quotes from Yahoo Finance · change shown vs. earnings-day close
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {fetchedLabel && <span>As of {fetchedLabel}</span>}
            <button
              onClick={load}
              disabled={loading}
              className="inline-flex items-center gap-1 px-2 py-1 rounded border border-border hover:bg-gray-50 disabled:opacity-50"
            >
              <RefreshCw className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>
        </div>

        {error && (
          <div className="text-xs text-red-600 mb-3">
            Could not load live prices ({error}). Showing earnings-day close only.
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {TICKERS.map((ticker) => {
            const meta = earningsDayClose[ticker];
            const q = quotes?.find((x) => x.symbol === ticker);
            const live = q?.price ?? null;
            const sinceEarnings = live != null ? live - meta.price : null;
            const sinceEarningsPct = sinceEarnings != null ? (sinceEarnings / meta.price) * 100 : null;
            const dayPct = q?.changePercent ?? null;
            const dirColor =
              sinceEarningsPct == null
                ? "#6B7280"
                : sinceEarningsPct > 0.05
                ? "#059669"
                : sinceEarningsPct < -0.05
                ? "#DC2626"
                : "#6B7280";
            const Icon = sinceEarningsPct == null
              ? Minus
              : sinceEarningsPct > 0
              ? TrendingUp
              : sinceEarningsPct < 0
              ? TrendingDown
              : Minus;

            return (
              <div
                key={ticker}
                className="rounded-xl p-4 border bg-white"
                style={{ borderColor: `${meta.color}40` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded text-white"
                      style={{ background: meta.color }}
                    >
                      {ticker}
                    </span>
                    <span className="text-xs text-muted-foreground">{meta.name}</span>
                  </div>
                  <Icon className="w-4 h-4" style={{ color: dirColor }} />
                </div>
                <div className="flex items-baseline gap-2">
                  <div
                    className="text-2xl font-bold metric-number"
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    {live != null ? `$${live.toFixed(2)}` : loading ? "…" : "—"}
                  </div>
                  {dayPct != null && (
                    <div
                      className="text-xs font-bold"
                      style={{ color: dayPct >= 0 ? "#059669" : "#DC2626" }}
                      title="Today's change"
                    >
                      {dayPct >= 0 ? "+" : ""}
                      {dayPct.toFixed(2)}%
                    </div>
                  )}
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  Earnings close ({meta.date}): ${meta.price.toFixed(2)}
                </div>
                {sinceEarningsPct != null && (
                  <div className="mt-1 text-xs font-bold" style={{ color: dirColor }}>
                    {sinceEarningsPct >= 0 ? "+" : ""}
                    {sinceEarningsPct.toFixed(2)}% since earnings
                    <span className="text-muted-foreground font-normal">
                      {" "}
                      ({sinceEarnings != null && sinceEarnings >= 0 ? "+" : ""}
                      ${sinceEarnings?.toFixed(2)})
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
