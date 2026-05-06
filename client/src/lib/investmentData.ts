// Hedge Fund Investment Intelligence Dashboard
// Focus: Growth drivers, guidance trends, management tone, competitive positioning

export interface InvestmentMetric {
  label: string;
  current: number | string;
  prior: number | string;
  trend: "up" | "down" | "flat";
  signal: "bullish" | "bearish" | "neutral";
  explanation: string;
}

export interface CompanyInvestmentAnalysis {
  ticker: string;
  name: string;
  color: string;
  reportDate: string;
  
  // Valuation & Returns
  stockReaction: number;
  peRatio: number;
  priorPeRatio: number;
  targetPriceImplication: string;
  
  // Growth Drivers (what's actually driving revenue)
  growthDrivers: {
    driver: string;
    contribution: string;
    sustainability: "high" | "medium" | "low";
    risk: string;
  }[];
  
  // Guidance Analysis
  guidance: {
    nextQuarterRevenue: string;
    priorGuidance: string;
    raise: boolean;
    magnitude: string;
    conservatism: "conservative" | "neutral" | "aggressive";
    tone: string;
  };
  
  // Margin Trends (profitability sustainability)
  margins: {
    metric: string;
    current: number;
    prior: number;
    trend: "expanding" | "compressing" | "stable";
    driver: string;
  }[];
  
  // Management Tone & Capital Allocation
  managementTone: {
    overallSentiment: "bullish" | "cautious" | "neutral";
    score: number; // 1-10
    signals: string[];
    capitalAllocation: string;
    conviction: string;
  };
  
  // Competitive Positioning
  competitive: {
    vs: string;
    metric: string;
    ourPerformance: string;
    theirPerformance: string;
    implication: string;
  }[];
  
  // Key Inflection Points (what changed that matters)
  inflectionPoints: {
    change: string;
    prior: string;
    current: string;
    implication: string;
    investmentSignal: "upgrade_trigger" | "downgrade_risk" | "neutral";
  }[];
  
  // Downside Risks
  risks: {
    risk: string;
    probability: "high" | "medium" | "low";
    impact: "severe" | "moderate" | "minor";
    mitigation: string;
  }[];
  
  // Upgrade/Downgrade Triggers
  analystImplications: {
    likely: string;
    rationale: string;
    targetPrice: string;
    timeframe: string;
  };
}

export const investmentAnalysis: CompanyInvestmentAnalysis[] = [
  {
    ticker: "META",
    name: "Meta Platforms",
    color: "#1877F2",
    reportDate: "April 29, 2026",
    stockReaction: -7,
    peRatio: 24.5,
    priorPeRatio: 26.3,
    targetPriceImplication: "CapEx shock likely to pressure multiple despite strong earnings",
    
    growthDrivers: [
      {
        driver: "AI-Driven Ad Targeting",
        contribution: "19% impression growth + 12% price growth = 33% revenue growth",
        sustainability: "high",
        risk: "Regulatory scrutiny on AI ad personalization; Apple privacy changes could limit data",
      },
      {
        driver: "Meta AI Distribution",
        contribution: "~1B MAU provides monetization runway for AI services",
        sustainability: "high",
        risk: "Monetization timeline uncertain; still in user acquisition phase",
      },
      {
        driver: "Reels Monetization",
        contribution: "Embedded in Family of Apps revenue; growing but still below TikTok ARPU",
        sustainability: "medium",
        risk: "TikTok competition; regulatory uncertainty in US",
      },
    ],
    
    guidance: {
      nextQuarterRevenue: "$58–61B",
      priorGuidance: "$55–57B (Q1 guidance was $55–57B)",
      raise: true,
      magnitude: "+$1–4B midpoint",
      conservatism: "neutral",
      tone: "Management confident in AI monetization but cautious on macro",
    },
    
    margins: [
      {
        metric: "Operating Margin",
        current: 41,
        prior: 39,
        trend: "expanding",
        driver: "Operating leverage from AI ad optimization; layoffs reducing headcount costs",
      },
      {
        metric: "Free Cash Flow Margin",
        current: 22,
        prior: 18,
        trend: "expanding",
        driver: "Strong profitability growth outpacing CapEx increase",
      },
    ],
    
    managementTone: {
      overallSentiment: "bullish",
      score: 8,
      signals: [
        "Raising CapEx $10B to $125–145B range — highest conviction AI bet",
        "Laying off 10% of workforce while raising CapEx — ruthless capital reallocation",
        "Superintelligence Labs launch signals long-term moat building, not short-term monetization",
        "CEO language: 'personal superintelligence to billions' — aspirational but unproven",
      ],
      capitalAllocation: "Aggressive: $125–145B CapEx + $8B layoffs + buybacks = all-in on AI infrastructure",
      conviction: "Very High — Meta is betting the company on AI infrastructure ownership",
    },
    
    competitive: [
      {
        vs: "Google",
        metric: "AI Ad Monetization",
        ourPerformance: "19% impression growth + 12% price growth",
        theirPerformance: "Search +19% but AI Overviews not yet monetized",
        implication: "Meta is ahead on AI ad monetization; Google still in experimentation phase",
      },
      {
        vs: "Amazon",
        metric: "Advertising Revenue Growth",
        ourPerformance: "+33% YoY",
        theirPerformance: "+24% YoY",
        implication: "Meta's ad platform is growing faster; better AI targeting advantage",
      },
    ],
    
    inflectionPoints: [
      {
        change: "CapEx Raise",
        prior: "$115–135B",
        current: "$125–145B",
        implication: "Meta sees AI infrastructure as critical competitive advantage; willing to sacrifice near-term margins",
        investmentSignal: "upgrade_trigger",
      },
      {
        change: "Superintelligence Labs Launch",
        prior: "No in-house foundation models",
        current: "Muse Spark (first model from Meta Superintelligence Labs)",
        implication: "Meta moving from API consumer to foundation model builder — long-term moat play",
        investmentSignal: "upgrade_trigger",
      },
      {
        change: "Workforce Restructuring",
        prior: "86,000 headcount (Q4 2025)",
        current: "77,986 headcount + 8,000 layoffs coming in May",
        implication: "Capital reallocation from labor to compute; signals confidence in AI automation",
        investmentSignal: "neutral",
      },
    ],
    
    risks: [
      {
        risk: "CapEx Efficiency Risk",
        probability: "high",
        impact: "severe",
        mitigation: "Meta has proven ability to monetize infrastructure (Reels, AI ads); but AI ROI timeline uncertain",
      },
      {
        risk: "Regulatory Headwind",
        probability: "high",
        impact: "moderate",
        mitigation: "EU DMA/DSA already impacting ad targeting; US regulation still pending",
      },
      {
        risk: "Macro Advertising Slowdown",
        probability: "medium",
        impact: "moderate",
        mitigation: "Meta's AI ad optimization is recession-resistant (helps advertisers spend efficiently)",
      },
    ],
    
    analystImplications: {
      likely: "UPGRADES likely from AI infrastructure conviction, but tempered by CapEx shock",
      rationale: "Meta's willingness to sacrifice near-term margins for AI dominance is a bullish signal. However, $125–145B CapEx is massive and ROI is unproven.",
      targetPrice: "Likely $600–650 range (vs. $550 current) if AI monetization proves out; downside to $450 if CapEx doesn't generate returns",
      timeframe: "Clarity on AI ROI expected by Q4 2026; analyst revisions likely after Q2/Q3 earnings",
    },
  },
  
  {
    ticker: "MSFT",
    name: "Microsoft",
    color: "#00A4EF",
    reportDate: "April 29, 2026",
    stockReaction: -5,
    peRatio: 32.1,
    priorPeRatio: 31.5,
    targetPriceImplication: "Supply constraints are the story — demand is not the problem",
    
    growthDrivers: [
      {
        driver: "Azure AI Workload Migration",
        contribution: "Azure +40% YoY; AI business $37B ARR (+123%)",
        sustainability: "high",
        risk: "Supply constrained through 2026; customers may shift to AWS or Google Cloud if capacity unavailable",
      },
      {
        driver: "Copilot Enterprise Adoption",
        contribution: "20M+ paid seats (+250% YoY); $37B AI ARR includes Copilot",
        sustainability: "high",
        risk: "Copilot pricing power uncertain; enterprises may negotiate lower per-seat costs at scale",
      },
      {
        driver: "Commercial RPO Growth",
        contribution: "$627B RPO (+99% YoY) = massive contracted future revenue",
        sustainability: "high",
        risk: "RPO includes OpenAI deal; if OpenAI loses competitive advantage, RPO value at risk",
      },
    ],
    
    guidance: {
      nextQuarterRevenue: "Intelligent Cloud: $37.95–38.25B (+27–28%)",
      priorGuidance: "Q2 Intelligent Cloud: $35.5–35.8B (+24–25%)",
      raise: true,
      magnitude: "+$2.4–2.5B midpoint",
      conservatism: "neutral",
      tone: "Management confident in AI adoption but transparent about supply constraints",
    },
    
    margins: [
      {
        metric: "Intelligent Cloud Operating Margin",
        current: 35,
        prior: 32,
        trend: "expanding",
        driver: "Operating leverage from AI workload scaling; infrastructure utilization improving",
      },
      {
        metric: "Overall Operating Margin",
        current: 46,
        prior: 44,
        trend: "expanding",
        driver: "AI business growing faster than legacy business; higher-margin mix shift",
      },
    ],
    
    managementTone: {
      overallSentiment: "bullish",
      score: 8.5,
      signals: [
        "Nadella explicitly framing 'agentic computing era' — positioning Microsoft as platform leader for next wave",
        "Copilot evolving from 'synchronous assistants to async coworkers' — ambitious vision for AI autonomy",
        "Commercial RPO +99% YoY — enterprise customers are locking in multi-year commitments",
        "OpenAI deal restructured but Microsoft retains royalty-free IP through 2032 — long-term optionality",
      ],
      capitalAllocation: "Aggressive: ~$190B CapEx in 2026; $10.2B shareholder returns; all-in on AI infrastructure",
      conviction: "Very High — Microsoft is the enterprise AI platform play",
    },
    
    competitive: [
      {
        vs: "AWS",
        metric: "Cloud Growth Rate",
        ourPerformance: "Azure +40% YoY",
        theirPerformance: "AWS +28% YoY",
        implication: "Microsoft is re-accelerating faster than AWS; AI workload migration favoring Azure",
      },
      {
        vs: "Google Cloud",
        metric: "Cloud Growth Rate",
        ourPerformance: "Azure +40% YoY",
        theirPerformance: "Google Cloud +63% YoY",
        implication: "Google Cloud growing faster, but from smaller base; Microsoft has scale advantage",
      },
    ],
    
    inflectionPoints: [
      {
        change: "Copilot Paid Seats",
        prior: "8M seats (Q2 FY2026 estimate)",
        current: "20M+ seats (+250% YoY)",
        implication: "Enterprise AI adoption is accelerating faster than expected; Copilot is becoming standard",
        investmentSignal: "upgrade_trigger",
      },
      {
        change: "Commercial RPO",
        prior: "$315B (Q2 FY2026 estimate)",
        current: "$627B (+99% YoY)",
        implication: "Customers are locking in multi-year AI commitments; revenue visibility is exceptional",
        investmentSignal: "upgrade_trigger",
      },
      {
        change: "Supply Constraint Transparency",
        prior: "Not explicitly mentioned",
        current: "Management explicitly states 'supply constrained through 2026'",
        implication: "Demand is not the problem; capacity is the constraint. This is a positive signal for pricing power.",
        investmentSignal: "upgrade_trigger",
      },
    ],
    
    risks: [
      {
        risk: "Azure Supply Constraints",
        probability: "high",
        impact: "moderate",
        mitigation: "Constraints are temporary (through 2026); customers are willing to wait or pay premium for capacity",
      },
      {
        risk: "OpenAI Competitive Threat",
        probability: "medium",
        impact: "severe",
        mitigation: "Microsoft has royalty-free IP through 2032; building own AI stack reduces dependency",
      },
      {
        risk: "Copilot Pricing Pressure",
        probability: "medium",
        impact: "moderate",
        mitigation: "Enterprise customers are paying $20–30/seat; pricing power appears strong",
      },
    ],
    
    analystImplications: {
      likely: "UPGRADES likely; Azure re-acceleration + Copilot adoption + RPO growth = strong momentum",
      rationale: "Microsoft is winning the enterprise AI race. Supply constraints are a feature, not a bug — they signal strong demand and pricing power.",
      targetPrice: "Likely $450–480 range (vs. $420 current) if Azure growth sustains; downside to $350 if OpenAI loses competitive advantage",
      timeframe: "Analyst revisions likely after Q4 FY2026 (July 2026); full-year guidance will be key",
    },
  },
  
  {
    ticker: "GOOGL",
    name: "Alphabet (Google)",
    color: "#34A853",
    reportDate: "April 29, 2026",
    stockReaction: 9.9,
    peRatio: 22.3,
    priorPeRatio: 24.1,
    targetPriceImplication: "Google Cloud inflection point; Search resilience is underappreciated",
    
    growthDrivers: [
      {
        driver: "Google Cloud Re-acceleration",
        contribution: "Cloud +63% YoY; $20B quarterly revenue (first time); $460B backlog",
        sustainability: "high",
        risk: "Backlog is contracted revenue; execution risk on delivery timelines",
      },
      {
        driver: "Search AI Monetization",
        contribution: "Search +19% YoY despite AI Overviews; AI is additive, not cannibalistic",
        sustainability: "high",
        risk: "Regulatory pressure on AI Overviews; EU/UK may restrict implementation",
      },
      {
        driver: "API Token Processing",
        contribution: "16B tokens/min (+60% QoQ); Gemini API adoption accelerating",
        sustainability: "high",
        risk: "Token pricing may compress as competition intensifies",
      },
    ],
    
    guidance: {
      nextQuarterRevenue: "Strong momentum expected; no specific guidance given",
      priorGuidance: "Q1 guidance was $107–109B; actual $109.9B (beat)",
      raise: true,
      magnitude: "Implied raise via strong commentary",
      conservatism: "neutral",
      tone: "Management confident but measured; Waymo revaluation inflated this quarter's earnings",
    },
    
    margins: [
      {
        metric: "Google Cloud Operating Margin",
        current: 33,
        prior: 22,
        trend: "expanding",
        driver: "Operating leverage from scale; Cloud business reaching profitability inflection",
      },
      {
        metric: "Google Services Operating Margin",
        current: 32,
        prior: 31,
        trend: "expanding",
        driver: "AI ad optimization improving ad efficiency",
      },
    ],
    
    managementTone: {
      overallSentiment: "bullish",
      score: 8,
      signals: [
        "Pichai explicitly highlighting 'full-stack approach to AI' — TPUs + Gemini + Cloud + Search integrated",
        "Cloud backlog nearly doubled QoQ to $460B — enterprise customers are committing at scale",
        "Gemini Enterprise +40% QoQ MAU — adoption accelerating faster than expected",
        "Open model strategy (Gemma 4: 500M+ downloads) — winning developer mindshare",
      ],
      capitalAllocation: "Aggressive: $180–190B CapEx in 2026; raising from $175–185B; all-in on AI infrastructure",
      conviction: "High — Google is playing catch-up to Microsoft/Amazon but with full-stack advantage",
    },
    
    competitive: [
      {
        vs: "AWS",
        metric: "Cloud Growth Rate",
        ourPerformance: "Google Cloud +63% YoY",
        theirPerformance: "AWS +28% YoY",
        implication: "Google Cloud is growing 2.3x faster; gaining share in AI workloads",
      },
      {
        vs: "Microsoft",
        metric: "Cloud Growth Rate",
        ourPerformance: "Google Cloud +63% YoY",
        theirPerformance: "Azure +40% YoY",
        implication: "Google Cloud is growing faster; but from smaller base ($20B vs. $34.7B)",
      },
    ],
    
    inflectionPoints: [
      {
        change: "Cloud Backlog",
        prior: "$250B (est. Q4 2025)",
        current: "$460B+ (nearly doubled QoQ)",
        implication: "Enterprise AI demand is massive; Google Cloud is winning significant deals",
        investmentSignal: "upgrade_trigger",
      },
      {
        change: "Cloud Operating Margin",
        prior: "22%",
        current: "33%",
        implication: "Google Cloud is reaching profitability inflection; margin expansion will accelerate",
        investmentSignal: "upgrade_trigger",
      },
      {
        change: "Search Revenue Growth",
        prior: "+16% YoY (Q4 2025 est.)",
        current: "+19% YoY",
        implication: "AI Overviews are not cannibalizing Search; AI is additive to monetization",
        investmentSignal: "upgrade_trigger",
      },
    ],
    
    risks: [
      {
        risk: "Regulatory Headwind on AI Overviews",
        probability: "high",
        impact: "moderate",
        mitigation: "EU/UK may restrict AI Overviews; but US market is large enough to sustain growth",
      },
      {
        risk: "Cloud Backlog Execution Risk",
        probability: "medium",
        impact: "moderate",
        mitigation: "Google has proven ability to deliver infrastructure; but delivery delays could impact revenue recognition",
      },
      {
        risk: "Waymo Revaluation Volatility",
        probability: "high",
        impact: "minor",
        mitigation: "This quarter's $36.9B gain is non-recurring; core business growth is solid",
      },
    ],
    
    analystImplications: {
      likely: "UPGRADES likely; Google Cloud inflection + Search resilience + API adoption",
      rationale: "Google Cloud's 63% growth and $460B backlog signal a major inflection point. Search resilience (not cannibalized by AI) is underappreciated.",
      targetPrice: "Likely $180–200 range (vs. $165 current) if Cloud margin expansion continues; downside to $140 if regulatory headwinds intensify",
      timeframe: "Analyst revisions likely after Q2 2026 (July); Cloud margin expansion will be key metric to watch",
    },
  },
  
  {
    ticker: "AMZN",
    name: "Amazon",
    color: "#FF9900",
    reportDate: "April 29, 2026",
    stockReaction: 0.8,
    peRatio: 45.2,
    priorPeRatio: 48.1,
    targetPriceImplication: "AWS re-acceleration is the story; Leo satellite internet is optionality",
    
    growthDrivers: [
      {
        driver: "AWS AI Workload Migration",
        contribution: "AWS +28% YoY (15-quarter high); fastest growth in years",
        sustainability: "high",
        risk: "Capacity constraints; customers may shift to Azure/Google Cloud if capacity unavailable",
      },
      {
        driver: "Amazon's Custom Silicon",
        contribution: "Trainium/Graviton commitments >$225B; Chip business >$20B ARR",
        sustainability: "high",
        risk: "Custom silicon adoption slower than expected; NVIDIA dependency remains high",
      },
      {
        driver: "Advertising Revenue",
        contribution: "Advertising +24% YoY; $17.2B quarterly revenue",
        sustainability: "medium",
        risk: "Advertising market is competitive; growth may moderate",
      },
    ],
    
    guidance: {
      nextQuarterRevenue: "$194–199B",
      priorGuidance: "Q1 guidance was $180–188B",
      raise: true,
      magnitude: "+$6–11B midpoint",
      conservatism: "neutral",
      tone: "Management confident in AWS momentum; Leo satellite internet is optionality play",
    },
    
    margins: [
      {
        metric: "Operating Margin",
        current: 13.1,
        prior: 10.2,
        trend: "expanding",
        driver: "AWS margin expansion (37.7% op margin); operating leverage from scale",
      },
      {
        metric: "AWS Operating Margin",
        current: 37.7,
        prior: 35.1,
        trend: "expanding",
        driver: "Custom silicon reducing NVIDIA dependency; margin expansion accelerating",
      },
    ],
    
    managementTone: {
      overallSentiment: "bullish",
      score: 8.5,
      signals: [
        "AWS growth at 15-quarter high — re-acceleration after years of deceleration",
        "Jassy explicitly comparing Leo satellite internet to 'early AWS' — long-term optionality play",
        "Trainium commitments >$225B — custom silicon strategy is working; customers are locking in",
        "Record 13.1% operating margin despite $200B CapEx — profitability inflection is real",
      ],
      capitalAllocation: "Aggressive: $200B CapEx in 2026; all-in on AI infrastructure + satellite internet",
      conviction: "Very High — Amazon is betting on AWS dominance + custom silicon moat + Leo optionality",
    },
    
    competitive: [
      {
        vs: "Microsoft",
        metric: "Cloud Growth Rate",
        ourPerformance: "AWS +28% YoY",
        theirPerformance: "Azure +40% YoY",
        implication: "Microsoft is growing faster; but AWS is re-accelerating after years of deceleration",
      },
      {
        vs: "Google Cloud",
        metric: "Cloud Growth Rate",
        ourPerformance: "AWS +28% YoY",
        theirPerformance: "Google Cloud +63% YoY",
        implication: "Google Cloud is growing fastest; but AWS has scale advantage ($37.6B revenue vs. $20B)",
      },
    ],
    
    inflectionPoints: [
      {
        change: "AWS Growth Rate",
        prior: "+20% YoY (Q4 2025 est.)",
        current: "+28% YoY (15-quarter high)",
        implication: "AWS re-acceleration is real; AI workload migration is accelerating",
        investmentSignal: "upgrade_trigger",
      },
      {
        change: "Custom Silicon Commitments",
        prior: "~$150B (est. Q4 2025)",
        current: ">$225B",
        implication: "Trainium/Graviton adoption is accelerating; custom silicon moat is strengthening",
        investmentSignal: "upgrade_trigger",
      },
      {
        change: "Operating Margin",
        prior: "10.2%",
        current: "13.1% (record high)",
        implication: "Profitability inflection is real; AWS margin expansion is accelerating",
        investmentSignal: "upgrade_trigger",
      },
    ],
    
    risks: [
      {
        risk: "AWS Capacity Constraints",
        probability: "high",
        impact: "moderate",
        mitigation: "Amazon is investing heavily in capacity; but constraints may persist through 2026",
      },
      {
        risk: "Custom Silicon Execution Risk",
        probability: "medium",
        impact: "moderate",
        mitigation: "Trainium/Graviton are proven; but adoption slower than expected could impact margins",
      },
      {
        risk: "Leo Satellite Internet Execution Risk",
        probability: "high",
        impact: "minor",
        mitigation: "Leo is optionality; core AWS business is strong enough to offset any Leo delays",
      },
    ],
    
    analystImplications: {
      likely: "UPGRADES likely; AWS re-acceleration + custom silicon + margin expansion",
      rationale: "AWS is re-accelerating after years of deceleration. Custom silicon strategy is working. Margin expansion is real.",
      targetPrice: "Likely $200–220 range (vs. $185 current) if AWS growth sustains; downside to $150 if custom silicon adoption slows",
      timeframe: "Analyst revisions likely after Q2 2026 (July); AWS growth trajectory will be key metric",
    },
  },
  
  {
    ticker: "AAPL",
    name: "Apple",
    color: "#555555",
    reportDate: "April 30, 2026",
    stockReaction: 2.7,
    peRatio: 28.5,
    priorPeRatio: 29.8,
    targetPriceImplication: "Services growth is the real story; iPhone growth is cyclical",
    
    growthDrivers: [
      {
        driver: "Services Revenue Growth",
        contribution: "Services +16.3% YoY; $30.98B quarterly revenue (all-time high); 77% gross margin",
        sustainability: "high",
        risk: "Services growth is decelerating from prior years (was +20%+ growth); saturation risk",
      },
      {
        driver: "iPhone Revenue Growth",
        contribution: "iPhone +22% YoY; $57B quarterly revenue (March record)",
        sustainability: "medium",
        risk: "iPhone growth is cyclical; driven by iPhone 17 launch; growth will moderate",
      },
      {
        driver: "Greater China Recovery",
        contribution: "Greater China +28% YoY; $20.5B quarterly revenue",
        sustainability: "medium",
        risk: "China recovery is temporary; geopolitical risks remain high",
      },
    ],
    
    guidance: {
      nextQuarterRevenue: "+14–17% YoY (well above ~10% consensus)",
      priorGuidance: "Q1 guidance was +7–9% YoY",
      raise: true,
      magnitude: "+$5–8B midpoint",
      conservatism: "neutral",
      tone: "Management confident in iPhone 17 cycle; Apple Intelligence rollout on track",
    },
    
    margins: [
      {
        metric: "Services Gross Margin",
        current: 77,
        prior: 76,
        trend: "stable",
        driver: "Services mix is high-margin; but growth is decelerating",
      },
      {
        metric: "Overall Gross Margin",
        current: 49.3,
        prior: 48.1,
        trend: "expanding",
        driver: "Services mix shift; iPhone margins stable",
      },
    ],
    
    managementTone: {
      overallSentiment: "neutral",
      score: 6.5,
      signals: [
        "Tim Cook's penultimate earnings call (Ternus takes over Sept 1) — transition risk",
        "Apple Intelligence rollout on track; but no aggressive monetization strategy yet",
        "Capital allocation: $100B new buyback authorization; but minimal CapEx vs. peers",
        "iPhone 17 cycle is strong; but this is cyclical, not structural growth",
      ],
      capitalAllocation: "Conservative: ~$8–9B CapEx in 2026; $100B+ buyback authorization; returning cash to shareholders",
      conviction: "Medium — Apple is in harvest mode; not investing aggressively in AI infrastructure",
    },
    
    competitive: [
      {
        vs: "Microsoft",
        metric: "AI Strategy",
        ourPerformance: "Partner (Google for Siri) + integrate (Apple Intelligence)",
        theirPerformance: "Build (Copilot) + partner (OpenAI)",
        implication: "Microsoft is building AI stack; Apple is integrating. Different strategies, both valid.",
      },
      {
        vs: "Google",
        metric: "AI Strategy",
        ourPerformance: "Partner (Google for Siri) + integrate (Apple Intelligence)",
        theirPerformance: "Build (Gemini) + integrate (Google AI)",
        implication: "Apple is outsourcing AI to Google; Google is building own stack. Google has more upside.",
      },
    ],
    
    inflectionPoints: [
      {
        change: "Services Growth",
        prior: "+20% YoY (Q4 2025 est.)",
        current: "+16.3% YoY",
        implication: "Services growth is decelerating; saturation risk is real",
        investmentSignal: "downgrade_risk",
      },
      {
        change: "CEO Transition",
        prior: "Tim Cook (since 2011)",
        current: "John Ternus takes over Sept 1, 2026",
        implication: "Leadership transition introduces execution risk; but Ternus is proven engineer",
        investmentSignal: "neutral",
      },
      {
        change: "iPhone Growth",
        prior: "+12% YoY (Q1 FY2026 est.)",
        current: "+22% YoY",
        implication: "iPhone 17 cycle is strong; but this is cyclical, not structural",
        investmentSignal: "neutral",
      },
    ],
    
    risks: [
      {
        risk: "Services Growth Deceleration",
        probability: "high",
        impact: "moderate",
        mitigation: "Services is still growing +16% YoY; but growth rate is slowing",
      },
      {
        risk: "CEO Transition Execution Risk",
        probability: "medium",
        impact: "moderate",
        mitigation: "Ternus is proven engineer; but first earnings call as CEO will be closely watched",
      },
      {
        risk: "iPhone Cycle Maturity",
        probability: "high",
        impact: "moderate",
        mitigation: "iPhone 17 cycle is strong; but next cycle (iPhone 18) growth may moderate",
      },
    ],
    
    analystImplications: {
      likely: "HOLDS likely; Services growth deceleration offsets iPhone strength",
      rationale: "Apple is in harvest mode. Services growth is decelerating. iPhone growth is cyclical. CEO transition introduces uncertainty.",
      targetPrice: "Likely $180–195 range (vs. $185 current) if Services growth stabilizes; downside to $160 if Services deceleration accelerates",
      timeframe: "Analyst revisions likely after Q3 FY2026 (August); Services growth trajectory will be key metric",
    },
  },
];

// Comparative metrics for hedge fund analysis
export const hedgeFundComparison = {
  growthAcceleration: [
    { ticker: "MSFT", metric: "Azure", prior: 35, current: 40, acceleration: "+5pp" },
    { ticker: "AMZN", metric: "AWS", prior: 20, current: 28, acceleration: "+8pp" },
    { ticker: "GOOGL", metric: "Cloud", prior: 50, current: 63, acceleration: "+13pp" },
    { ticker: "META", metric: "Revenue", prior: 25, current: 33, acceleration: "+8pp" },
    { ticker: "AAPL", metric: "Services", prior: 20, current: 16.3, acceleration: "-3.7pp (decel)" },
  ],
  
  marginExpansion: [
    { ticker: "GOOGL", metric: "Cloud Op. Margin", prior: 22, current: 33, expansion: "+11pp" },
    { ticker: "AMZN", metric: "Operating Margin", prior: 10.2, current: 13.1, expansion: "+2.9pp" },
    { ticker: "MSFT", metric: "Intelligent Cloud Op. Margin", prior: 32, current: 35, expansion: "+3pp" },
    { ticker: "META", metric: "Operating Margin", prior: 39, current: 41, expansion: "+2pp" },
    { ticker: "AAPL", metric: "Gross Margin", prior: 48.1, current: 49.3, expansion: "+1.2pp" },
  ],
  
  managementConviction: [
    { ticker: "META", signal: "CapEx raise + layoffs + Superintelligence Labs", conviction: 9 },
    { ticker: "AMZN", signal: "AWS re-acceleration + Trainium >$225B + Leo optionality", conviction: 8.5 },
    { ticker: "MSFT", signal: "Copilot 20M seats + RPO +99% + agentic computing", conviction: 8.5 },
    { ticker: "GOOGL", signal: "Cloud backlog $460B + Gemini Enterprise +40% QoQ", conviction: 8 },
    { ticker: "AAPL", signal: "Services deceleration + CEO transition", conviction: 6.5 },
  ],
  
  upgradeDowngradeProbability: [
    { ticker: "MSFT", upgrade: "High", downgrade: "Low", rationale: "Azure re-acceleration + Copilot adoption" },
    { ticker: "AMZN", upgrade: "High", downgrade: "Low", rationale: "AWS re-acceleration + custom silicon" },
    { ticker: "GOOGL", upgrade: "High", downgrade: "Low", rationale: "Cloud inflection + Search resilience" },
    { ticker: "META", upgrade: "Medium", downgrade: "Medium", rationale: "CapEx conviction vs. ROI uncertainty" },
    { ticker: "AAPL", upgrade: "Low", downgrade: "Medium", rationale: "Services deceleration + CEO transition" },
  ],
};
