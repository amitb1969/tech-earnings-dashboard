import { useEffect, useState } from "react";

export interface RadarRow {
  ticker: string;
  name: string | null;
  logo: string | null;
  marketCapB: number | null;
  reportDate: string; // ISO YYYY-MM-DD
  hour: string | null;
  epsActual: number | null;
  epsEstimate: number | null;
  epsSurprisePct: number | null;
  revenueActualB: number | null;
  revenueEstimateB: number | null;
  revenueSurprisePct: number | null;
  priceReactionPct: number | null;
  beat: "beat" | "miss" | "mixed" | "n/a";
}

export interface RadarResponse {
  available: boolean;
  reason?: string;
  windowFrom?: string;
  windowTo?: string;
  fetchedAt?: string;
  sources?: string[];
  results: RadarRow[];
}

// Module-level promise cache so RecentTechEarnings + per-company
// staleness banners share a single in-flight fetch per page load.
let cached: Promise<RadarResponse> | null = null;

function fetchRadar(): Promise<RadarResponse> {
  if (cached) return cached;
  cached = fetch("/api/recent-earnings", { cache: "no-store" })
    .then(async (r) => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return (await r.json()) as RadarResponse;
    })
    .catch((err) => {
      // Reset cache on error so a later mount can retry.
      cached = null;
      throw err;
    });
  return cached;
}

export function useRecentEarnings(): {
  data: RadarResponse | null;
  loading: boolean;
  error: string | null;
} {
  const [data, setData] = useState<RadarResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchRadar()
      .then((d) => {
        if (!cancelled) setData(d);
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
}
