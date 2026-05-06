// Hedge Fund Investment Intelligence Dashboard
// Focus: Growth drivers, guidance trends, management tone, competitive positioning
// Raw intelligence for investment decision-making — no explicit buy/sell recommendations

import { useState, useRef, useEffect } from "react";
import {
  investmentAnalysis,
  crossCompanyMetrics,
  type CompanyInvestmentAnalysis,
} from "@/lib/investmentData";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LineChart,
  Line,
  Legend,
  ScatterChart,
  Scatter,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Target,
  Zap,
} from "lucide-react";

// ─── Intersection observer hook ──────────────────────────────────────────────
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── Investment signal badge ────────────────────────────────────────────────
function SignalBadge({ signal }: { signal: "upgrade_trigger" | "downgrade_risk" | "neutral" }) {
  const config = {
    upgrade_trigger: { bg: "#10B98120", text: "#059669", icon: "↑", label: "UPGRADE TRIGGER" },
    downgrade_risk: { bg: "#EF444420", text: "#DC2626", icon: "↓", label: "DOWNGRADE RISK" },
    neutral: { bg: "#6B728020", text: "#4B5563", icon: "→", label: "NEUTRAL" },
  };
  const c = config[signal];
  return (
    <div className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-bold" style={{ background: c.bg, color: c.text }}>
      <span>{c.icon}</span>
      {c.label}
    </div>
  );
}

// ─── Management tone gauge ──────────────────────────────────────────────────
function ToneGauge({ score, sentiment }: { score: number; sentiment: string }) {
  const color = sentiment === "bullish" ? "#10B981" : sentiment === "cautious" ? "#EF4444" : "#6B7280";
  return (
    <div className="flex items-center gap-3">
      <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full transition-all duration-300"
          style={{ width: `${(score / 10) * 100}%`, background: color }}
        />
      </div>
      <div className="text-sm font-bold" style={{ color }}>
        {score}/10
      </div>
      <div className="text-xs uppercase font-semibold px-2 py-1 rounded" style={{ background: `${color}20`, color }}>
        {sentiment}
      </div>
    </div>
  );
}

// ─── Growth driver card ─────────────────────────────────────────────────────
function GrowthDriverCard({
  driver,
  contribution,
  sustainability,
  risk,
}: {
  driver: string;
  contribution: string;
  sustainability: "high" | "medium" | "low";
  risk: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const sustainColor =
    sustainability === "high" ? "#10B981" : sustainability === "medium" ? "#F59E0B" : "#EF4444";
  return (
    <div
      className="rounded-lg border p-4 mb-3 cursor-pointer transition-all"
      style={{ borderColor: `${sustainColor}40`, background: `${sustainColor}08` }}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="font-bold text-sm" style={{ color: sustainColor }}>
            {driver}
          </div>
          <div className="text-xs text-foreground/70 mt-1">{contribution}</div>
        </div>
        <div className="flex-shrink-0">
          {expanded ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </div>
      </div>
      {expanded && (
        <div className="mt-3 pt-3 border-t border-border/50">
          <div className="text-xs text-foreground/60 leading-relaxed">
            <span className="font-semibold">Risk:</span> {risk}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Inflection point card ──────────────────────────────────────────────────
function InflectionPointCard({
  change,
  prior,
  current,
  implication,
  investmentSignal,
}: {
  change: string;
  prior: string;
  current: string;
  implication: string;
  investmentSignal: "upgrade_trigger" | "downgrade_risk" | "neutral";
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      className="rounded-lg border p-4 mb-3 cursor-pointer transition-all"
      style={{ borderColor: "#1A56DB40", background: "#1A56DB08" }}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <div className="font-bold text-sm text-foreground">{change}</div>
          <div className="flex items-center gap-2 mt-2">
            <div className="text-xs text-muted-foreground">
              <span className="font-semibold">Prior:</span> {prior}
            </div>
            <TrendingUp className="w-3 h-3 text-blue-600" />
            <div className="text-xs text-muted-foreground">
              <span className="font-semibold">Current:</span> {current}
            </div>
          </div>
        </div>
        <div className="flex-shrink-0">
          {expanded ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </div>
      </div>
      {expanded && (
        <div className="mt-3 pt-3 border-t border-border/50">
          <div className="text-xs text-foreground/70 leading-relaxed mb-2">{implication}</div>
          <SignalBadge signal={investmentSignal} />
        </div>
      )}
    </div>
  );
}

// ─── Risk assessment card ───────────────────────────────────────────────────
function RiskCard({
  risk,
  probability,
  impact,
  mitigation,
}: {
  risk: string;
  probability: "high" | "medium" | "low";
  impact: "severe" | "moderate" | "minor";
  mitigation: string;
}) {
  const probColor = probability === "high" ? "#EF4444" : probability === "medium" ? "#F59E0B" : "#10B981";
  const impactColor = impact === "severe" ? "#EF4444" : impact === "moderate" ? "#F59E0B" : "#10B981";
  return (
    <div className="rounded-lg border border-border p-4 mb-3 bg-white">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="font-bold text-sm">{risk}</div>
        <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
      </div>
      <div className="flex gap-2 mb-2">
        <div className="text-xs px-2 py-1 rounded font-semibold" style={{ background: `${probColor}20`, color: probColor }}>
          Prob: {probability}
        </div>
        <div className="text-xs px-2 py-1 rounded font-semibold" style={{ background: `${impactColor}20`, color: impactColor }}>
          Impact: {impact}
        </div>
      </div>
      <div className="text-xs text-foreground/70 leading-relaxed">
        <span className="font-semibold">Mitigation:</span> {mitigation}
      </div>
    </div>
  );
}

// ─── Company deep dive section ──────────────────────────────────────────────
function CompanyDeepDive({ company }: { company: CompanyInvestmentAnalysis }) {
  const { ref, inView } = useInView(0.1);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  return (
    <section
      ref={ref}
      id={company.ticker}
      className="mb-16 scroll-mt-24"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
    >
      {/* Header */}
      <div
        className="rounded-xl p-6 mb-6"
        style={{ background: `${company.color}08`, borderLeft: `5px solid ${company.color}` }}
      >
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span
                className="text-xs font-bold px-2 py-0.5 rounded text-white"
                style={{ background: company.color }}
              >
                {company.ticker}
              </span>
              <span className="text-xs text-muted-foreground">{company.reportDate}</span>
            </div>
            <h2 className="text-3xl font-bold" style={{ color: company.color, fontFamily: "'Sora', sans-serif" }}>
              {company.name}
            </h2>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground mb-1">Stock Reaction</div>
            <div
              className={`text-2xl font-bold metric-number ${company.stockReaction > 1 ? "text-green-600" : company.stockReaction < -1 ? "text-red-500" : "text-gray-500"}`}
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              {company.stockReaction > 0 ? "+" : ""}{company.stockReaction}%
            </div>
            <div className="text-xs text-muted-foreground">P/E: {company.peRatio}</div>
          </div>
        </div>

        {/* Valuation implication */}
        <div
          className="rounded p-3 text-sm"
          style={{ background: `${company.color}10`, borderLeft: `3px solid ${company.color}` }}
        >
          <span className="font-semibold" style={{ color: company.color }}>
            Valuation Signal:{" "}
          </span>
          <span className="text-foreground/80">{company.targetPriceImplication}</span>
        </div>
      </div>

      {/* Two-column layout: Growth drivers + Management tone */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Growth drivers */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Growth Drivers
          </h3>
          {company.growthDrivers.map((driver, i) => (
            <GrowthDriverCard key={i} {...driver} />
          ))}
        </div>

        {/* Management tone */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">
            Management Tone & Conviction
          </h3>
          <div className="rounded-lg border border-border p-4 bg-white mb-4">
            <ToneGauge score={company.managementTone.score} sentiment={company.managementTone.overallSentiment} />
          </div>
          <div className="space-y-3">
            {company.managementTone.signals.map((signal, i) => (
              <div key={i} className="flex gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-foreground/80">{signal}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 rounded-lg" style={{ background: "#1A56DB10", borderLeft: "3px solid #1A56DB" }}>
            <div className="text-xs font-bold uppercase text-blue-700 mb-1">Capital Allocation</div>
            <div className="text-xs text-foreground/80">{company.managementTone.capitalAllocation}</div>
          </div>
        </div>
      </div>

      {/* Guidance analysis */}
      <div className="rounded-lg border border-border p-4 bg-white mb-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">
          Guidance Analysis
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div>
            <div className="text-xs text-muted-foreground mb-1">Next Quarter Revenue</div>
            <div className="text-sm font-bold">{company.guidance.nextQuarterRevenue}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Prior Guidance</div>
            <div className="text-sm font-bold">{company.guidance.priorGuidance}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Raise/Lower</div>
            <div className="text-sm font-bold" style={{ color: company.guidance.raise ? "#10B981" : "#EF4444" }}>
              {company.guidance.raise ? "RAISE" : "LOWER"} {company.guidance.magnitude}
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Conservatism</div>
            <div className="text-sm font-bold uppercase" style={{ color: company.color }}>
              {company.guidance.conservatism}
            </div>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-border text-sm text-foreground/80">
          {company.guidance.tone}
        </div>
      </div>

      {/* Margin trends */}
      <div className="rounded-lg border border-border p-4 bg-white mb-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">
          Margin Trends (Profitability Sustainability)
        </h3>
        <div className="space-y-3">
          {company.margins.map((margin, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded" style={{ background: "#F9FAFB" }}>
              <div>
                <div className="text-sm font-bold">{margin.metric}</div>
                <div className="text-xs text-muted-foreground">{margin.driver}</div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2">
                  <div className="text-sm font-bold metric-number" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                    {margin.current}%
                  </div>
                  <div className={`text-xs font-bold ${margin.trend === "expanding" ? "text-green-600" : margin.trend === "compressing" ? "text-red-500" : "text-gray-500"}`}>
                    {margin.trend === "expanding" ? "↑" : margin.trend === "compressing" ? "↓" : "→"}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {margin.trend === "expanding" ? "+" : margin.trend === "compressing" ? "-" : ""}{Math.abs(margin.current - margin.prior)}pp
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Competitive positioning */}
      <div className="rounded-lg border border-border p-4 bg-white mb-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">
          Competitive Positioning
        </h3>
        <div className="space-y-3">
          {company.competitive.map((comp, i) => (
            <div key={i} className="p-3 rounded" style={{ background: "#F9FAFB" }}>
              <div className="text-sm font-bold mb-1">
                {company.ticker} vs. {comp.vs}
              </div>
              <div className="text-xs text-muted-foreground mb-2">{comp.metric}</div>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div>
                  <div className="text-xs text-muted-foreground">Our Performance</div>
                  <div className="text-sm font-bold">{comp.ourPerformance}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Their Performance</div>
                  <div className="text-sm font-bold">{comp.theirPerformance}</div>
                </div>
              </div>
              <div className="text-xs text-foreground/70 italic">{comp.implication}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Inflection points */}
      <div className="mb-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">
          Key Inflection Points
        </h3>
        {company.inflectionPoints.map((point, i) => (
          <InflectionPointCard key={i} {...point} />
        ))}
      </div>

      {/* Risks */}
      <div className="mb-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">
          Downside Risks
        </h3>
        {company.risks.map((risk, i) => (
          <RiskCard key={i} {...risk} />
        ))}
      </div>

      {/* Analyst implications */}
      <div className="rounded-lg border border-border p-4 bg-white">
        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
          <Target className="w-4 h-4" />
          Analyst Implications
        </h3>
        <div className="space-y-3">
          <div>
            <div className="text-xs text-muted-foreground font-semibold mb-1">Likely Outcome</div>
            <div className="text-sm font-bold">{company.analystImplications.likely}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground font-semibold mb-1">Rationale</div>
            <div className="text-sm text-foreground/80">{company.analystImplications.rationale}</div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-xs text-muted-foreground font-semibold mb-1">Target Price Range</div>
              <div className="text-sm font-bold" style={{ color: company.color }}>
                {company.analystImplications.targetPrice}
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground font-semibold mb-1">Timeframe</div>
              <div className="text-sm font-bold">{company.analystImplications.timeframe}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function Home() {
  const [activeCompany, setActiveCompany] = useState<string | null>(null);
  const [headerVisible, setHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setHeaderVisible(currentScrollY < lastScrollY.current || currentScrollY < 100);
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToCompany = (ticker: string) => {
    setActiveCompany(ticker);
    const el = document.getElementById(ticker);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen" style={{ background: "#FAFAF8", fontFamily: "'IBM Plex Sans', sans-serif" }}>
      {/* ── Sticky navigation ── */}
      <header
        className="sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur-sm transition-transform duration-300"
        style={{ transform: headerVisible ? "translateY(0)" : "translateY(-100%)" }}
      >
        <div className="container">
          <div className="flex items-center justify-between h-14 gap-4">
            <div className="flex items-center gap-3">
              <div
                className="text-xs font-bold px-2 py-1 rounded"
                style={{ background: "#1A56DB", color: "white", fontFamily: "'Sora', sans-serif" }}
              >
                HF INTEL
              </div>
              <span className="font-bold text-sm hidden sm:block" style={{ fontFamily: "'Sora', sans-serif" }}>
                Big Tech Q1 2026 — Investment Analysis
              </span>
            </div>
            <nav className="flex items-center gap-1 overflow-x-auto">
              {investmentAnalysis.map((c) => (
                <button
                  key={c.ticker}
                  onClick={() => scrollToCompany(c.ticker)}
                  className="flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-200"
                  style={{
                    background: activeCompany === c.ticker ? c.color : "transparent",
                    color: activeCompany === c.ticker ? "white" : c.color,
                    border: `1.5px solid ${c.color}`,
                  }}
                >
                  {c.ticker}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <div
        className="border-b border-border"
        style={{ background: "linear-gradient(135deg, #0A1628 0%, #1A2E4A 50%, #0D1F3C 100%)" }}
      >
        <div className="container py-12">
          <div className="max-w-3xl mb-8">
            <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#4A90D9" }}>
              Hedge Fund Investment Intelligence · Q1 2026 Earnings
            </div>
            <h1
              className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Big Tech Q1 2026
              <br />
              <span style={{ color: "#4A90D9" }}>Investment Analysis</span>
            </h1>
            <p className="text-white/70 text-base leading-relaxed max-w-2xl">
              Five companies reported earnings this week. This analysis focuses on what matters for investment
              decisions: growth drivers, guidance trends, management tone, competitive positioning, and downside risks.
              No explicit buy/sell signals — raw intelligence for your investment committee.
            </p>
          </div>

          {/* Summary scorecard */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {investmentAnalysis.map((c) => (
              <button
                key={c.ticker}
                onClick={() => scrollToCompany(c.ticker)}
                className="rounded-xl p-4 text-left transition-all duration-200 hover:scale-105"
                style={{ background: `${c.color}20`, border: `1px solid ${c.color}40` }}
              >
                <div className="text-xs font-bold mb-1" style={{ color: c.color, fontFamily: "'Sora', sans-serif" }}>
                  {c.ticker}
                </div>
                <div className="text-xs text-white/60 mb-2">P/E: {c.peRatio}</div>
                <div
                  className={`text-lg font-bold metric-number ${c.stockReaction > 1 ? "text-green-300" : c.stockReaction < -1 ? "text-red-300" : "text-yellow-300"}`}
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  {c.stockReaction > 0 ? "+" : ""}{c.stockReaction}%
                </div>
                <div className="text-xs text-white/50">Stock reaction</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Cross-company comparison ── */}
      <div className="border-b border-border bg-white">
        <div className="container py-10">
          <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>
            Investment Scorecard
          </h2>
          <p className="text-muted-foreground text-sm mb-6">
            Growth acceleration, margin expansion, management conviction, and upgrade/downgrade probability
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Growth acceleration */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
                Growth Acceleration (YoY %)
              </h3>
              <div className="space-y-2">
                {crossCompanyMetrics.growthAcceleration.map((item: any, i: number) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded bg-gray-50">
                    <div className="text-sm font-bold">{item.ticker}</div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-bold metric-number" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                        {item.current}%
                      </div>
                      <div className={`text-xs font-bold ${item.acceleration > 0 ? "text-green-600" : "text-red-600"}`}>
                        {item.acceleration > 0 ? "+" : ""}{item.acceleration}pp
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Margin expansion */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
                Margin Expansion (pp)
              </h3>
              <div className="space-y-2">
                {crossCompanyMetrics.marginExpansion.map((item: any, i: number) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded bg-gray-50">
                    <div>
                      <div className="text-sm font-bold">{item.ticker}</div>
                      <div className="text-xs text-muted-foreground">{item.metric}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold metric-number" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                        {item.current}%
                      </div>
                      <div className="text-xs text-green-600 font-bold">{item.expansion}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Management conviction + upgrade probability */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Management conviction */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
                Management Conviction Score
              </h3>
              <div className="space-y-3">
                {crossCompanyMetrics.managementConviction.map((item: any, i: number) => (
                  <div key={i} className="p-3 rounded bg-gray-50">
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-sm font-bold">{item.ticker}</div>
                      <div className="text-sm font-bold" style={{ color: item.conviction > 8 ? "#10B981" : "#F59E0B" }}>
                        {item.conviction}/10
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">{item.signal}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upgrade/downgrade probability */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
                Analyst Revision Probability
              </h3>
              <div className="space-y-3">
                {crossCompanyMetrics.analystRevisionProbability.map((item: any, i: number) => (
                  <div key={i} className="p-3 rounded bg-gray-50">
                    <div className="text-sm font-bold mb-1">{item.ticker}</div>
                    <div className="flex gap-2 mb-1">
                      <div
                        className="text-xs px-2 py-0.5 rounded font-bold"
                        style={{ background: "#10B98120", color: "#059669" }}
                      >
                        ↑ {item.upgrade}
                      </div>
                      <div
                        className="text-xs px-2 py-0.5 rounded font-bold"
                        style={{ background: "#EF444420", color: "#DC2626" }}
                      >
                        ↓ {item.downgrade}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">{item.rationale}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Company deep dives ── */}
      <div className="container py-10">
        <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>
          Company Deep Dives
        </h2>
        <p className="text-muted-foreground text-sm mb-8">
          Investment-grade analysis: growth drivers, guidance trends, management tone, competitive positioning, and downside risks
        </p>
        {investmentAnalysis.map((company) => (
          <CompanyDeepDive key={company.ticker} company={company} />
        ))}
      </div>

      {/* ── Footer ── */}
      <footer className="border-t border-border py-8" style={{ background: "#0A1628" }}>
        <div className="container">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="font-bold text-white mb-1" style={{ fontFamily: "'Sora', sans-serif" }}>
                Hedge Fund Investment Intelligence Dashboard
              </div>
              <div className="text-white/50 text-xs">
                Q1 2026 earnings analysis. Raw intelligence for investment decision-making.
              </div>
            </div>
            <div className="text-white/30 text-xs">
              Not investment advice. For informational purposes only.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
