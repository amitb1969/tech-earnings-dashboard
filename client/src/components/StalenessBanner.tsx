import { AlertCircle } from "lucide-react";
import { useRecentEarnings } from "@/lib/useRecentEarnings";

interface Props {
  ticker: string;
  // Card's curated reportDate as displayed (e.g. "April 29, 2026").
  curatedReportDate: string;
}

// Returns Date|null. Tolerates both "April 29, 2026" and ISO "2026-04-29".
function parseLooseDate(s: string): Date | null {
  const t = Date.parse(s);
  if (!Number.isNaN(t)) return new Date(t);
  return null;
}

function fmtFriendly(iso: string): string {
  const d = parseLooseDate(iso);
  if (!d) return iso;
  return d.toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" });
}

// Shows a banner when Finnhub reports a strictly-newer earnings date for
// this ticker than the curated card's labeled reportDate. Renders nothing
// otherwise, so curated cards are unchanged on quiet weeks.
export default function StalenessBanner({ ticker, curatedReportDate }: Props) {
  const { data } = useRecentEarnings();
  if (!data || !data.available) return null;

  const radarRow = data.results.find((r) => r.ticker === ticker);
  if (!radarRow) return null;

  const curated = parseLooseDate(curatedReportDate);
  const radar = parseLooseDate(radarRow.reportDate);
  if (!curated || !radar) return null;

  // Only flag if Finnhub's date is strictly newer (require at least one
  // calendar day gap to avoid false positives from timezone slop).
  const dayMs = 24 * 60 * 60 * 1000;
  if (radar.getTime() - curated.getTime() < dayMs) return null;

  return (
    <div
      className="rounded-md mb-4 px-3 py-2 flex items-start gap-2"
      style={{ background: "#FEF3C720", border: "1px solid #F59E0B40" }}
    >
      <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#B45309" }} />
      <div className="text-xs leading-relaxed" style={{ color: "#78350F" }}>
        <span className="font-bold">New results released {fmtFriendly(radarRow.reportDate)}.</span>{" "}
        Hard numbers (revenue, EPS, surprise vs. estimate, stock reaction) are in the
        <span className="font-bold"> Recent Tech Earnings</span> section above. The deep-dive
        analysis below still reflects the prior quarter ({curatedReportDate}); narrative will be
        refreshed in a future update — we don't auto-generate qualitative content.
      </div>
    </div>
  );
}
