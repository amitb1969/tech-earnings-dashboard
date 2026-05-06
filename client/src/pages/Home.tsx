// Design: Executive Briefing — Clean Signal
// Swiss International Style meets modern SaaS
// Warm white background, strong typographic hierarchy, company-color accents

import { useState, useEffect, useRef } from "react";
import {
  companies,
  cloudGrowthData,
  revenueData,
  capexData,
  epsGrowthData,
  crossCompanyThemes,
  type CompanyData,
} from "@/lib/earningsData";
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
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import { TrendingUp, TrendingDown, Minus, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

// ─── Animated counter hook ───────────────────────────────────────────────────
function useCountUp(target: number, duration = 1200, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

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

// ─── Metric card ─────────────────────────────────────────────────────────────
function MetricCard({
  label,
  value,
  growth,
  highlight,
  color,
}: {
  label: string;
  value: string;
  growth?: string;
  highlight?: boolean;
  color: string;
}) {
  return (
    <div
      className={`rounded-lg p-4 card-hover ${highlight ? "border border-opacity-30" : "border border-border"}`}
      style={{
        background: highlight ? `${color}10` : "white",
        borderColor: highlight ? color : undefined,
      }}
    >
      <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">
        {label}
      </div>
      <div
        className="text-xl font-bold metric-number"
        style={{ fontFamily: "'IBM Plex Mono', monospace", color: highlight ? color : "inherit" }}
      >
        {value}
      </div>
      {growth && (
        <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
          {growth.startsWith("+") ? (
            <TrendingUp className="w-3 h-3 text-green-600" />
          ) : growth.startsWith("-") ? (
            <TrendingDown className="w-3 h-3 text-red-500" />
          ) : (
            <Minus className="w-3 h-3 text-gray-400" />
          )}
          {growth}
        </div>
      )}
    </div>
  );
}

// ─── CIO Implication card ─────────────────────────────────────────────────────
function CIOImplication({
  title,
  detail,
  color,
}: {
  title: string;
  detail: string;
  color: string;
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      className="rounded-r-lg p-4 mb-3 cursor-pointer transition-all duration-200"
      style={{
        background: `${color}08`,
        borderLeft: `4px solid ${color}`,
      }}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="font-semibold text-sm" style={{ color }}>
          {title}
        </div>
        <div className="flex-shrink-0 mt-0.5">
          {expanded ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </div>
      </div>
      {expanded && (
        <p className="text-sm text-foreground/80 mt-2 leading-relaxed" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
          {detail}
        </p>
      )}
    </div>
  );
}

// ─── Company section ──────────────────────────────────────────────────────────
function CompanySection({ company }: { company: CompanyData }) {
  const { ref, inView } = useInView(0.1);
  const stockUp = company.stockReactionPct > 0;
  const stockNeutral = Math.abs(company.stockReactionPct) < 1;

  return (
    <section
      ref={ref}
      id={company.id}
      className="mb-16 scroll-mt-24"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
    >
      {/* Company header */}
      <div
        className="rounded-xl p-6 mb-6"
        style={{ background: `${company.color}08`, borderLeft: `5px solid ${company.color}` }}
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span
                className="text-xs font-bold px-2 py-0.5 rounded"
                style={{ background: company.color, color: "white" }}
              >
                {company.ticker}
              </span>
              <span className="text-xs text-muted-foreground">{company.reportDate}</span>
              <span className="text-xs text-muted-foreground">{company.quarter}</span>
            </div>
            <h2
              className="text-3xl font-bold"
              style={{ fontFamily: "'Sora', sans-serif", color: company.color }}
            >
              {company.name}
            </h2>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground mb-1">Stock Reaction</div>
            <div
              className={`text-lg font-bold metric-number ${stockNeutral ? "text-gray-500" : stockUp ? "text-green-600" : "text-red-500"}`}
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              {stockUp ? "+" : ""}{company.stockReactionPct}%
            </div>
            <div className="text-xs text-muted-foreground">{company.stockReaction}</div>
          </div>
        </div>

        {/* CEO Quote */}
        <blockquote
          className="mt-4 text-sm italic leading-relaxed border-l-2 pl-4 text-foreground/70"
          style={{ borderColor: company.color, fontFamily: "'IBM Plex Sans', sans-serif" }}
        >
          "{company.ceoQuote}"
          <footer className="mt-1 not-italic text-xs font-semibold text-muted-foreground">
            — {company.ceoName}, {company.quarter} Earnings Call
          </footer>
        </blockquote>
      </div>

      {/* Core financials row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="rounded-lg border border-border p-4 bg-white">
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Revenue</div>
          <div className="text-2xl font-bold metric-number" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            ${company.revenue}B
          </div>
          <div className="text-sm text-green-600 font-medium">+{company.revenueGrowth}% YoY</div>
        </div>
        <div className="rounded-lg border border-border p-4 bg-white">
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">EPS</div>
          <div className="text-2xl font-bold metric-number" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            ${company.eps}
          </div>
          <div className="text-sm text-green-600 font-medium">+{company.epsGrowth}% YoY</div>
        </div>
        <div className="rounded-lg border border-border p-4 bg-white">
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Op. Margin</div>
          <div className="text-2xl font-bold metric-number" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            {company.operatingMargin}%
          </div>
          <div className="text-xs text-muted-foreground mt-1">${company.operatingIncome}B op. income</div>
        </div>
        <div className="rounded-lg border border-border p-4 bg-white">
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{company.keySegmentName}</div>
          <div className="text-2xl font-bold metric-number" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            ${company.keySegmentRevenue}B
          </div>
          <div className="text-sm text-green-600 font-medium">+{company.keySegmentGrowth}% YoY</div>
        </div>
      </div>

      {/* Two-column: metrics + messages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Key metrics grid */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">
            Key Metrics
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {company.keyMetrics.map((m) => (
              <MetricCard key={m.label} {...m} color={company.color} />
            ))}
          </div>
        </div>

        {/* Key messages */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">
            Key Messages from Earnings Call
          </h3>
          <ul className="space-y-3">
            {company.keyMessages.map((msg, i) => (
              <li
                key={i}
                className="flex gap-3 text-sm leading-relaxed"
                style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
              >
                <span
                  className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white mt-0.5"
                  style={{ background: company.color }}
                >
                  {i + 1}
                </span>
                <span className="text-foreground/80">{msg}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* AI Highlight */}
      <div
        className="rounded-lg p-4 mb-6 text-sm"
        style={{ background: `${company.color}06`, border: `1px solid ${company.color}30` }}
      >
        <div
          className="text-xs font-bold uppercase tracking-wider mb-1"
          style={{ color: company.color }}
        >
          AI Highlights
        </div>
        <div className="text-foreground/80" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
          {company.aiHighlight}
        </div>
      </div>

      {/* CIO Implications */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">
          CIO Implications
        </h3>
        {company.cioImplications.map((imp, i) => (
          <CIOImplication key={i} {...imp} color={company.color} />
        ))}
      </div>
    </section>
  );
}

// ─── Custom tooltip ───────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-border rounded-lg p-3 shadow-lg text-sm">
        <p className="font-semibold mb-1">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ color: p.color }}>
            {p.name}: {p.value}{p.unit || ""}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

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

  const scrollToCompany = (id: string) => {
    setActiveCompany(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "#FAFAF8", fontFamily: "'IBM Plex Sans', sans-serif" }}
    >
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
                CIO INTEL
              </div>
              <span
                className="font-bold text-sm hidden sm:block"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                Big Tech Q1 2026 Earnings
              </span>
            </div>
            <nav className="flex items-center gap-1 overflow-x-auto">
              {companies.map((c) => (
                <button
                  key={c.id}
                  onClick={() => scrollToCompany(c.id)}
                  className="flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-200"
                  style={{
                    background: activeCompany === c.id ? c.color : "transparent",
                    color: activeCompany === c.id ? "white" : c.color,
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

      {/* ── Hero / Executive Summary ── */}
      <div
        className="border-b border-border"
        style={{ background: "linear-gradient(135deg, #0A1628 0%, #1A2E4A 50%, #0D1F3C 100%)" }}
      >
        <div className="container py-12">
          <div className="max-w-3xl mb-8">
            <div
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: "#4A90D9" }}
            >
              CIO Intelligence Briefing · Week of April 28 – May 2, 2026
            </div>
            <h1
              className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Big Tech Q1 2026
              <br />
              <span style={{ color: "#4A90D9" }}>Earnings Analysis</span>
            </h1>
            <p className="text-white/70 text-base leading-relaxed max-w-2xl">
              Five Magnificent Seven companies reported earnings this week. Combined, they represent
              over $540B in quarterly revenue and are committing more than $700B in annual AI
              infrastructure investment. Here is what every CIO needs to know.
            </p>
          </div>

          {/* Summary stat strip */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {companies.map((c) => (
              <button
                key={c.id}
                onClick={() => scrollToCompany(c.id)}
                className="rounded-xl p-4 text-left transition-all duration-200 hover:scale-105"
                style={{
                  background: `${c.color}20`,
                  border: `1px solid ${c.color}40`,
                }}
              >
                <div
                  className="text-xs font-bold mb-1"
                  style={{ color: c.color, fontFamily: "'Sora', sans-serif" }}
                >
                  {c.ticker}
                </div>
                <div
                  className="text-lg font-bold text-white metric-number"
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  ${c.revenue}B
                </div>
                <div className="text-xs text-white/60">Revenue</div>
                <div
                  className="text-sm font-semibold mt-1"
                  style={{
                    color: c.stockReactionPct > 1 ? "#3FB950" : c.stockReactionPct < -1 ? "#F85149" : "#D29922",
                    fontFamily: "'IBM Plex Mono', monospace",
                  }}
                >
                  {c.stockReactionPct > 0 ? "+" : ""}{c.stockReactionPct}%
                </div>
                <div className="text-xs text-white/50">Stock reaction</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Cross-company charts ── */}
      <div className="border-b border-border bg-white">
        <div className="container py-10">
          <h2
            className="text-2xl font-bold mb-2"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            Cross-Company Comparison
          </h2>
          <p className="text-muted-foreground text-sm mb-8">
            Key metrics across all five companies — week of April 28–May 2, 2026
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Cloud growth */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
                Cloud Revenue Growth (YoY %)
              </h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={cloudGrowthData} layout="vertical" margin={{ left: 20, right: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                  <XAxis type="number" tickFormatter={(v) => `${v}%`} tick={{ fontSize: 11 }} />
                  <YAxis type="category" dataKey="company" tick={{ fontSize: 11 }} width={100} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="growth" name="Growth %" radius={[0, 4, 4, 0]}>
                    {cloudGrowthData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Revenue */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
                Q1 Revenue ($B)
              </h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={revenueData} layout="vertical" margin={{ left: 20, right: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                  <XAxis type="number" tickFormatter={(v) => `$${v}B`} tick={{ fontSize: 11 }} />
                  <YAxis type="category" dataKey="company" tick={{ fontSize: 11 }} width={80} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="revenue" name="Revenue ($B)" radius={[0, 4, 4, 0]}>
                    {revenueData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* 2026 CapEx */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
                2026 CapEx Guidance ($B)
              </h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={capexData} layout="vertical" margin={{ left: 20, right: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                  <XAxis type="number" tickFormatter={(v) => `$${v}B`} tick={{ fontSize: 11 }} />
                  <YAxis type="category" dataKey="company" tick={{ fontSize: 11 }} width={80} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="capex" name="CapEx ($B)" radius={[0, 4, 4, 0]}>
                    {capexData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* EPS Growth chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
                EPS Growth YoY (%)
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={epsGrowthData} margin={{ left: 10, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis dataKey="company" tick={{ fontSize: 11 }} />
                  <YAxis tickFormatter={(v) => `${v}%`} tick={{ fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="growth" name="EPS Growth %" radius={[4, 4, 0, 0]}>
                    {epsGrowthData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Comparison table */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
                At-a-Glance Scorecard
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 text-xs text-muted-foreground font-medium">Company</th>
                      <th className="text-right py-2 text-xs text-muted-foreground font-medium">Revenue</th>
                      <th className="text-right py-2 text-xs text-muted-foreground font-medium">Rev Growth</th>
                      <th className="text-right py-2 text-xs text-muted-foreground font-medium">EPS Growth</th>
                      <th className="text-right py-2 text-xs text-muted-foreground font-medium">Stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {companies.map((c) => (
                      <tr key={c.id} className="border-b border-border/50 hover:bg-gray-50 transition-colors">
                        <td className="py-2.5">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{ background: c.color }} />
                            <span className="font-semibold" style={{ color: c.color }}>{c.ticker}</span>
                          </div>
                        </td>
                        <td
                          className="text-right py-2.5 font-medium"
                          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                        >
                          ${c.revenue}B
                        </td>
                        <td className="text-right py-2.5 text-green-600 font-medium">
                          +{c.revenueGrowth}%
                        </td>
                        <td className="text-right py-2.5 text-green-600 font-medium">
                          +{c.epsGrowth}%
                        </td>
                        <td
                          className={`text-right py-2.5 font-medium ${c.stockReactionPct > 1 ? "text-green-600" : c.stockReactionPct < -1 ? "text-red-500" : "text-gray-500"}`}
                          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                        >
                          {c.stockReactionPct > 0 ? "+" : ""}{c.stockReactionPct}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Cross-company themes ── */}
      <div className="border-b border-border" style={{ background: "#F8F9FC" }}>
        <div className="container py-10">
          <h2
            className="text-2xl font-bold mb-2"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            Strategic Themes for CIOs
          </h2>
          <p className="text-muted-foreground text-sm mb-6">
            Cross-cutting signals from this week's earnings calls
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {crossCompanyThemes.map((theme, i) => (
              <div
                key={i}
                className="rounded-xl p-5 bg-white border border-border card-hover"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{theme.icon}</span>
                  <div>
                    <h3
                      className="font-bold text-base mb-2"
                      style={{ fontFamily: "'Sora', sans-serif" }}
                    >
                      {theme.title}
                    </h3>
                    <p className="text-sm text-foreground/70 leading-relaxed mb-3">
                      {theme.description}
                    </p>
                    <div
                      className="text-sm rounded-r-lg p-3"
                      style={{
                        background: "#1A56DB10",
                        borderLeft: "3px solid #1A56DB",
                      }}
                    >
                      <span className="font-semibold text-xs uppercase tracking-wider text-blue-700">
                        CIO Action:{" "}
                      </span>
                      <span className="text-foreground/80">{theme.implication}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Company deep dives ── */}
      <div className="container py-10">
        <h2
          className="text-2xl font-bold mb-2"
          style={{ fontFamily: "'Sora', sans-serif" }}
        >
          Company Deep Dives
        </h2>
        <p className="text-muted-foreground text-sm mb-8">
          Detailed analysis of each company's earnings call — click CIO Implications to expand
        </p>
        {companies.map((company) => (
          <CompanySection key={company.id} company={company} />
        ))}
      </div>

      {/* ── Footer ── */}
      <footer
        className="border-t border-border py-8"
        style={{ background: "#0A1628" }}
      >
        <div className="container">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div
                className="font-bold text-white mb-1"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                Big Tech Q1 2026 Earnings — CIO Intelligence Dashboard
              </div>
              <div className="text-white/50 text-xs">
                Research compiled from earnings calls, press releases, and analyst reports.
                Week of April 28 – May 2, 2026. Data as reported.
              </div>
            </div>
            <div className="text-white/30 text-xs">
              For informational purposes only. Not investment advice.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
