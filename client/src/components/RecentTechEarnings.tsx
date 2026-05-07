import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useRecentEarnings, type RadarRow as ResultRow } from "@/lib/useRecentEarnings";

function fmtMoney(v: number | null, digits = 2): string {
  if (v == null) return "—";
  return `$${v.toFixed(digits)}`;
}

function fmtPct(v: number | null, digits = 1): string {
  if (v == null) return "—";
  const sign = v > 0 ? "+" : "";
  return `${sign}${v.toFixed(digits)}%`;
}

function fmtMcap(v: number | null): string {
  if (v == null) return "—";
  if (v >= 1000) return `$${(v / 1000).toFixed(2)}T`;
  return `$${v.toFixed(0)}B`;
}

function fmtDate(iso: string): string {
  const d = new Date(iso + "T12:00:00Z");
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function hourLabel(h: string | null): string {
  if (h === "bmo") return "BMO";
  if (h === "amc") return "AMC";
  if (h === "dmh") return "Mid-day";
  return "";
}

const beatColor: Record<ResultRow["beat"], string> = {
  beat: "#10B981",
  miss: "#EF4444",
  mixed: "#F59E0B",
  "n/a": "#9CA3AF",
};

const beatLabel: Record<ResultRow["beat"], string> = {
  beat: "Double Beat",
  miss: "Double Miss",
  mixed: "Mixed",
  "n/a": "Not reported",
};

export default function RecentTechEarnings() {
  const { data, loading, error } = useRecentEarnings();

  if (loading) return null;
  if (error) return null;
  if (!data || !data.available || data.results.length === 0) return null;

  const fetched = data.fetchedAt
    ? new Date(data.fetchedAt).toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  return (
    <div className="border-b border-border bg-gray-50">
      <div className="container py-8">
        <div className="flex items-end justify-between mb-1">
          <h2 className="text-lg font-bold uppercase tracking-wider">
            Recent Tech Earnings — Last 7 Days
          </h2>
          {fetched && (
            <div className="text-xs text-muted-foreground">Updated {fetched}</div>
          )}
        </div>
        <p className="text-sm text-muted-foreground mb-5">
          Top {data.results.length} largest tech reporters since {data.windowFrom}. Auto-pulled from
          Finnhub earnings calendar. Curated deep-dive below.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {data.results.map((r) => {
            const reaction = r.priceReactionPct;
            const ReactionIcon =
              reaction == null
                ? Minus
                : reaction > 0.05
                ? TrendingUp
                : reaction < -0.05
                ? TrendingDown
                : Minus;
            const reactionColor =
              reaction == null
                ? "#6B7280"
                : reaction > 0.05
                ? "#10B981"
                : reaction < -0.05
                ? "#EF4444"
                : "#6B7280";

            return (
              <div
                key={r.ticker}
                className="bg-white rounded-lg border border-border p-3 flex flex-col gap-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-base font-bold leading-tight">{r.ticker}</div>
                    <div className="text-[11px] text-muted-foreground truncate">
                      {r.name ?? r.ticker}
                    </div>
                  </div>
                  <div
                    className="text-[10px] px-2 py-0.5 rounded font-bold whitespace-nowrap"
                    style={{ background: `${beatColor[r.beat]}20`, color: beatColor[r.beat] }}
                    title={beatLabel[r.beat]}
                  >
                    {beatLabel[r.beat]}
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>{fmtDate(r.reportDate)}{hourLabel(r.hour) ? ` · ${hourLabel(r.hour)}` : ""}</span>
                  <span>{fmtMcap(r.marketCapB)} mcap</span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-gray-100">
                  <div>
                    <div className="text-[10px] text-muted-foreground uppercase">Revenue</div>
                    <div className="text-sm font-bold metric-number" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                      {r.revenueActualB != null ? `$${r.revenueActualB.toFixed(2)}B` : "—"}
                    </div>
                    <div
                      className="text-[10px] font-bold"
                      style={{
                        color:
                          r.revenueSurprisePct == null
                            ? "#6B7280"
                            : r.revenueSurprisePct >= 0
                            ? "#10B981"
                            : "#EF4444",
                      }}
                    >
                      {fmtPct(r.revenueSurprisePct)} vs est
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-muted-foreground uppercase">EPS</div>
                    <div className="text-sm font-bold metric-number" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                      {fmtMoney(r.epsActual)}
                    </div>
                    <div
                      className="text-[10px] font-bold"
                      style={{
                        color:
                          r.epsSurprisePct == null
                            ? "#6B7280"
                            : r.epsSurprisePct >= 0
                            ? "#10B981"
                            : "#EF4444",
                      }}
                    >
                      {fmtPct(r.epsSurprisePct)} vs est
                    </div>
                  </div>
                </div>

                <div
                  className="flex items-center gap-1 pt-1 border-t border-gray-100 text-xs font-bold"
                  style={{ color: reactionColor }}
                  title="1-day price reaction around the report"
                >
                  <ReactionIcon className="w-3.5 h-3.5" />
                  <span>{fmtPct(reaction)} stock reaction</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-3 text-[11px] text-muted-foreground">
          Sources: {(data.sources ?? []).join(" · ")} · 6h cache. Section auto-hides on weeks with no
          tech reports.
        </div>
      </div>
    </div>
  );
}
