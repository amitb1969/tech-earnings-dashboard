// Design: Executive Briefing — Clean Signal
// Data source: Q1 2026 earnings calls and press releases (week of Apr 28 – May 2, 2026)

export interface CompanyData {
  id: string;
  name: string;
  ticker: string;
  reportDate: string;
  color: string;
  lightColor: string;
  quarter: string;
  
  // Core financials
  revenue: number;          // in billions
  revenueGrowth: number;    // YoY %
  operatingIncome: number;  // in billions
  operatingMargin: number;  // %
  netIncome: number;        // in billions
  eps: number;
  epsGrowth: number;        // YoY %
  epsVsConsensus: number;   // beat by $
  
  // Key segment
  keySegmentName: string;
  keySegmentRevenue: number;
  keySegmentGrowth: number;
  
  // CapEx
  capexQ: number;           // quarterly CapEx in billions
  capexFull2026: string;    // full year guidance
  
  // Guidance
  nextQuarterRevGuidance: string;
  
  // CEO quote
  ceoName: string;
  ceoQuote: string;
  
  // Key metrics for CIO
  keyMetrics: { label: string; value: string; growth?: string; highlight?: boolean }[];
  
  // Key messages
  keyMessages: string[];
  
  // CIO implications
  cioImplications: { title: string; detail: string }[];
  
  // Stock reaction
  stockReaction: string;
  stockReactionPct: number;
  
  // AI-specific
  aiHighlight: string;
}

export const companies: CompanyData[] = [
  {
    id: "meta",
    name: "Meta Platforms",
    ticker: "META",
    reportDate: "April 29, 2026",
    color: "#1877F2",
    lightColor: "#EBF3FF",
    quarter: "Q1 2026",
    
    revenue: 56.31,
    revenueGrowth: 33,
    operatingIncome: 22.87,
    operatingMargin: 41,
    netIncome: 26.77,
    eps: 10.44,
    epsGrowth: 62,
    epsVsConsensus: 3.81,
    
    keySegmentName: "Family of Apps",
    keySegmentRevenue: 56.31,
    keySegmentGrowth: 33,
    
    capexQ: 19.84,
    capexFull2026: "$125–145B (raised from $115–135B)",
    
    nextQuarterRevGuidance: "$58–61B",
    
    ceoName: "Mark Zuckerberg",
    ceoQuote: "We had a milestone quarter with strong momentum across our apps and the release of our first model from Meta Superintelligence Labs. We're on track to deliver personal superintelligence to billions of people.",
    
    keyMetrics: [
      { label: "Revenue", value: "$56.3B", growth: "+33% YoY", highlight: true },
      { label: "Operating Margin", value: "41%", growth: "Stable YoY" },
      { label: "EPS", value: "$10.44", growth: "+62% YoY", highlight: true },
      { label: "Daily Active People", value: "3.56B", growth: "+4% YoY" },
      { label: "Ad Impressions", value: "+19% YoY", highlight: true },
      { label: "Avg. Price Per Ad", value: "+12% YoY" },
      { label: "Meta AI MAU", value: "~1 Billion", highlight: true },
      { label: "Q1 CapEx", value: "$19.84B", growth: "AI infrastructure" },
      { label: "Free Cash Flow", value: "$12.4B" },
      { label: "Cash & Securities", value: "$81.2B" },
    ],
    
    keyMessages: [
      "AI-powered ad targeting is compounding growth: 19% more impressions combined with 12% higher prices creates a powerful revenue flywheel",
      "Meta Superintelligence Labs launched its first model (Muse Spark) — Meta is moving up the AI value chain toward foundation model development",
      "Meta AI reached ~1 billion monthly active users, giving Meta unmatched distribution for AI services",
      "Capital reallocation underway: ~8,000 layoffs (10% of workforce) while raising CapEx — shifting from headcount to compute",
      "CapEx raised to $125–145B for 2026, signaling Meta is building its own AI infrastructure stack to reduce third-party dependency",
    ],
    
    cioImplications: [
      {
        title: "AI-Driven Ad Monetization Is Proven at Scale",
        detail: "Meta's 33% revenue growth driven by AI ad optimization demonstrates that AI investment can directly and measurably improve core business metrics. Enterprise technology leaders should note that AI-driven personalization at scale is now a proven revenue model, not a hypothesis.",
      },
      {
        title: "Vertical AI Integration Is the New Competitive Moat",
        detail: "Meta's move to build its own AI models (Superintelligence Labs) while owning the distribution (3.56B DAP) mirrors the strategic logic of vertical integration. CIOs evaluating AI vendor dependencies should watch how Meta's self-sufficiency strategy plays out.",
      },
      {
        title: "Workforce Restructuring Funds AI CapEx",
        detail: "The simultaneous 10% workforce reduction and CapEx increase illustrates a structural shift in how technology companies allocate capital — from human labor to AI compute. This trend has direct implications for enterprise workforce planning.",
      },
    ],
    
    stockReaction: "Down ~6–8% after-hours",
    stockReactionPct: -7,
    aiHighlight: "Meta AI: ~1B MAU | Muse Spark (first Superintelligence Labs model) | AI-driven ad optimization driving 33% revenue growth",
  },
  
  {
    id: "msft",
    name: "Microsoft",
    ticker: "MSFT",
    reportDate: "April 29, 2026",
    color: "#00A4EF",
    lightColor: "#E6F6FF",
    quarter: "Q3 FY2026",
    
    revenue: 82.9,
    revenueGrowth: 18,
    operatingIncome: 38.4,
    operatingMargin: 46,
    netIncome: 31.8,
    eps: 4.27,
    epsGrowth: 23,
    epsVsConsensus: 0.21,
    
    keySegmentName: "Intelligent Cloud",
    keySegmentRevenue: 34.7,
    keySegmentGrowth: 30,
    
    capexQ: 31.9,
    capexFull2026: "~$190B (calendar 2026, incl. $25B higher component pricing)",
    
    nextQuarterRevGuidance: "Intelligent Cloud: $37.95–38.25B (+27–28%)",
    
    ceoName: "Satya Nadella",
    ceoQuote: "Our AI business surpassed an annual revenue run rate of $37 billion, up 123% year-over-year. We are focused on delivering cloud and AI infrastructure and solutions that empower every business to eval-max their outcomes in the agentic computing era.",
    
    keyMetrics: [
      { label: "Revenue", value: "$82.9B", growth: "+18% YoY", highlight: true },
      { label: "Azure Growth", value: "+40% YoY", growth: "+39% constant currency", highlight: true },
      { label: "AI Business ARR", value: "$37B", growth: "+123% YoY", highlight: true },
      { label: "Copilot Paid Seats", value: "20M+", growth: "+250% YoY", highlight: true },
      { label: "Commercial RPO", value: "$627B", growth: "+99% YoY" },
      { label: "GitHub Copilot Orgs", value: "140,000", growth: "3x YoY" },
      { label: "Microsoft Cloud Rev", value: "$54.5B", growth: "+29% YoY" },
      { label: "Cash Flow (Ops)", value: "$46.7B", growth: "+26% YoY" },
      { label: "Q3 CapEx", value: "$31.9B" },
      { label: "Dynamics 365", value: "+22% YoY" },
    ],
    
    keyMessages: [
      "Azure re-accelerated to 40% growth — the fastest in years — but supply remains constrained through 2026, meaning demand is being throttled by infrastructure capacity",
      "AI business reached $37B ARR (+123% YoY), the fastest-growing major technology business — Copilot is scaling from 20M paid seats with 250% YoY growth",
      "Copilot is evolving 'from synchronous assistants to async coworkers' — Nadella's 'agentic computing era' framing signals the next enterprise platform shift",
      "Commercial RPO of $627B (up 99% YoY including OpenAI) represents massive contracted future revenue — the pipeline is extraordinarily strong",
      "OpenAI deal restructured: Microsoft lost exclusivity on OpenAI tech but gained royalty-free IP access through 2032 — strategic pivot toward own AI stack",
    ],
    
    cioImplications: [
      {
        title: "Agentic AI Is the Next Enterprise Platform Shift",
        detail: "Nadella's explicit framing of 'agentic computing' as the successor to cloud computing is a strategic signal for enterprise technology planning. CIOs should begin evaluating agentic AI workflows now — Microsoft's 20M+ Copilot seats suggest enterprise adoption is accelerating faster than most expected.",
      },
      {
        title: "Azure Supply Constraints Create Procurement Urgency",
        detail: "Azure capacity is constrained through at least 2026 with demand outpacing supply. Enterprise CIOs with significant Azure dependencies should proactively engage Microsoft on capacity commitments. The $627B commercial RPO suggests the best capacity terms are being locked in now.",
      },
      {
        title: "GitHub Copilot Is Reshaping Software Development Economics",
        detail: "140,000 organizations now use GitHub Copilot Enterprise (tripled YoY). CIOs overseeing software development should quantify the productivity impact — Microsoft's data suggests meaningful developer velocity improvements that could reshape team sizing and delivery timelines.",
      },
    ],
    
    stockReaction: "Down ~5% pre-market",
    stockReactionPct: -5,
    aiHighlight: "AI ARR: $37B (+123%) | Copilot: 20M+ paid seats (+250% YoY) | GitHub Copilot: 140K orgs | Azure: +40% YoY",
  },
  
  {
    id: "googl",
    name: "Alphabet (Google)",
    ticker: "GOOGL",
    reportDate: "April 29, 2026",
    color: "#34A853",
    lightColor: "#E8F5E9",
    quarter: "Q1 2026",
    
    revenue: 109.9,
    revenueGrowth: 22,
    operatingIncome: 30.6,
    operatingMargin: 28,
    netIncome: 34.5,
    eps: 5.11,
    epsGrowth: 94,
    epsVsConsensus: 2.48,
    
    keySegmentName: "Google Cloud",
    keySegmentRevenue: 20.03,
    keySegmentGrowth: 63,
    
    capexQ: 35.7,
    capexFull2026: "$180–190B (raised from $175–185B)",
    
    nextQuarterRevGuidance: "Strong momentum expected across Search and Cloud",
    
    ceoName: "Sundar Pichai",
    ceoQuote: "It was a terrific quarter for Alphabet. Our AI investments and full-stack approach are driving performance across our business. Cloud accelerated again this quarter — revenue grew 63%, exceeding $20 billion for the first time, and our backlog nearly doubled quarter-on-quarter to over $460 billion.",
    
    keyMetrics: [
      { label: "Revenue", value: "$109.9B", growth: "+22% YoY", highlight: true },
      { label: "Google Cloud", value: "$20.03B", growth: "+63% YoY", highlight: true },
      { label: "Cloud Backlog", value: "$460B+", growth: "Nearly doubled QoQ", highlight: true },
      { label: "Google Search", value: "$60.4B", growth: "+19% YoY" },
      { label: "Cloud Op. Income", value: "$6.6B", growth: "vs $2.2B prior year" },
      { label: "Gemini Enterprise MAU", value: "+40% QoQ", highlight: true },
      { label: "API Token Processing", value: "16B tokens/min", growth: "+60% QoQ" },
      { label: "Paid Subscriptions", value: "350M" },
      { label: "Q1 CapEx", value: "$35.7B" },
      { label: "YouTube Ads", value: "+11% YoY" },
    ],
    
    keyMessages: [
      "Google Cloud at 63% growth is the fastest-growing major cloud, now exceeding $20B quarterly revenue for the first time — a significant competitive milestone",
      "Cloud backlog of $460B nearly doubled quarter-on-quarter, signaling massive enterprise AI demand that will take years to fulfill",
      "AI Mode in Search is driving users back to Google more — AI is not cannibalizing Search revenue, it is accelerating it (+19% YoY)",
      "Full-stack AI advantage: TPUs (8th generation), Gemini 3.1 models, Cloud infrastructure, Search, YouTube — integrated ecosystem creates compounding moat",
      "Gemma 4 (open model) downloaded 50M+ times in weeks; 500M total open model downloads — Google is winning the developer ecosystem battle",
    ],
    
    cioImplications: [
      {
        title: "Google Cloud Is Now a Credible AWS/Azure Alternative",
        detail: "At 63% growth and $20B+ quarterly revenue, Google Cloud has crossed a threshold where it must be considered a primary cloud option, not just a secondary one. CIOs with multi-cloud strategies should reassess Google Cloud's AI infrastructure capabilities, particularly for Gemini-native workloads.",
      },
      {
        title: "AI-Enhanced Search Remains Dominant — AI Overviews Are Additive",
        detail: "Google's 19% Search revenue growth while deploying AI Overviews at scale disproves the thesis that AI would cannibalize Search. CIOs managing digital marketing and SEO strategies should note that Google Search remains the dominant discovery channel, now enhanced rather than replaced by AI.",
      },
      {
        title: "Open Model Strategy Creates Enterprise Optionality",
        detail: "Gemma 4's 500M+ total downloads signal that Google's open model strategy is winning developer mindshare. Enterprises building AI applications have more flexibility with open models — CIOs should evaluate Gemma as a cost-effective alternative to proprietary APIs for certain use cases.",
      },
    ],
    
    stockReaction: "Up ~9.9% after-hours",
    stockReactionPct: 9.9,
    aiHighlight: "Google Cloud: +63% YoY, $460B backlog | Gemini Enterprise: +40% QoQ MAU | 16B tokens/min API processing | Gemma 4: 500M+ downloads",
  },
  
  {
    id: "amzn",
    name: "Amazon",
    ticker: "AMZN",
    reportDate: "April 29, 2026",
    color: "#FF9900",
    lightColor: "#FFF8E6",
    quarter: "Q1 2026",
    
    revenue: 181.5,
    revenueGrowth: 17,
    operatingIncome: 23.9,
    operatingMargin: 13.1,
    netIncome: 30.3,
    eps: 2.78,
    epsGrowth: 75,
    epsVsConsensus: 1.14,
    
    keySegmentName: "AWS",
    keySegmentRevenue: 37.6,
    keySegmentGrowth: 28,
    
    capexQ: 43.2,
    capexFull2026: "~$200B",
    
    nextQuarterRevGuidance: "$194–199B (Prime Day moving to Q2)",
    
    ceoName: "Andy Jassy",
    ceoQuote: "AWS growth is the fastest we've seen in 15 quarters. The business has a chance to be a very large many-billion-dollar revenue business — I'd draw an explicit parallel to early AWS: capital-intensive upfront, with free cash flow and ROIC characteristics improving materially once capacity monetizes.",
    
    keyMetrics: [
      { label: "Revenue", value: "$181.5B", growth: "+17% YoY", highlight: true },
      { label: "AWS Revenue", value: "$37.6B", growth: "+28% YoY (15-qtr high)", highlight: true },
      { label: "AWS Op. Margin", value: "37.7%", highlight: true },
      { label: "Operating Margin", value: "13.1%", growth: "Record high" },
      { label: "Advertising", value: "$17.2B", growth: "+24% YoY" },
      { label: "AWS Backlog", value: "$364B", growth: "Excl. Anthropic" },
      { label: "Trainium Commitments", value: ">$225B", highlight: true },
      { label: "Chip Business ARR", value: ">$20B" },
      { label: "Q1 CapEx", value: "$43.2B" },
      { label: "Operating Income", value: "$23.9B", growth: "+30% YoY" },
    ],
    
    keyMessages: [
      "AWS at 28% growth (15-quarter high) confirms AI workload migration is accelerating — enterprise AI is moving from pilot to production at scale",
      "Amazon's own chip strategy (Trainium/Graviton) has reached $225B+ in commitments — proprietary silicon is becoming a decisive competitive and cost advantage",
      "Amazon Leo satellite internet (commercial launch Q3 2026) is a potential third major revenue engine, with Delta, JetBlue, AT&T, Vodafone already signed",
      "Record 13.1% operating margin demonstrates that massive AI investment is already generating returns — the efficiency flywheel is turning",
      "Globalstar acquisition ($10.8B) + Apple partnership positions Amazon Leo to power satellite features on future iPhones — strategic ecosystem expansion",
    ],
    
    cioImplications: [
      {
        title: "AWS AI Acceleration Signals Enterprise Migration Inflection",
        detail: "AWS growth re-accelerating to 28% (15-quarter high) is a leading indicator that enterprise AI workloads are moving from experimentation to production deployment. CIOs should accelerate cloud migration planning — the capacity constraints at all three major clouds suggest early movers will secure better terms and availability.",
      },
      {
        title: "Amazon's Custom Silicon Strategy Has Competitive Implications",
        detail: "Trainium commitments exceeding $225B signal that Amazon's bet on proprietary AI chips is paying off. CIOs building on AWS should evaluate Trainium and Graviton for AI inference workloads — Amazon claims these chips will provide hundreds of basis points of cost advantage versus NVIDIA-based alternatives.",
      },
      {
        title: "Amazon Leo Could Reshape Enterprise Connectivity",
        detail: "With enterprise customers including Delta, AT&T, and Vodafone already signed before commercial launch, Amazon Leo satellite internet could become a significant enterprise connectivity option. CIOs in industries with remote operations or global connectivity requirements should monitor Leo's Q3 2026 launch closely.",
      },
    ],
    
    stockReaction: "Up ~0.8% (muted despite beat)",
    stockReactionPct: 0.8,
    aiHighlight: "AWS: +28% YoY (15-qtr high) | Trainium commitments: >$225B | Chip business ARR: >$20B | Amazon Leo launch Q3 2026",
  },
  
  {
    id: "aapl",
    name: "Apple",
    ticker: "AAPL",
    reportDate: "April 30, 2026",
    color: "#555555",
    lightColor: "#F5F5F5",
    quarter: "Q2 FY2026",
    
    revenue: 111.2,
    revenueGrowth: 17,
    operatingIncome: 33.5,
    operatingMargin: 30.1,
    netIncome: 29.58,
    eps: 2.01,
    epsGrowth: 22,
    epsVsConsensus: 0.07,
    
    keySegmentName: "Services",
    keySegmentRevenue: 30.98,
    keySegmentGrowth: 16.3,
    
    capexQ: 2.1,
    capexFull2026: "~$8–9B (est.) — minimal vs. peers",
    
    nextQuarterRevGuidance: "+14–17% YoY (well above ~10% consensus)",
    
    ceoName: "Tim Cook",
    ceoQuote: "Today Apple is proud to report our best March quarter ever, with revenue of $111.2 billion and double-digit growth across every geographic segment. iPhone achieved a March quarter revenue record, fueled by such extraordinary demand for the iPhone 17 lineup.",
    
    keyMetrics: [
      { label: "Revenue", value: "$111.2B", growth: "+17% YoY", highlight: true },
      { label: "Services Revenue", value: "$30.98B", growth: "+16.3% YoY (all-time high)", highlight: true },
      { label: "Services Gross Margin", value: "~77%", highlight: true },
      { label: "iPhone Revenue", value: "$57.0B", growth: "+22% YoY (March record)" },
      { label: "Gross Margin", value: "49.3%", growth: "Above guidance" },
      { label: "Greater China", value: "$20.5B", growth: "+28% YoY" },
      { label: "Active Devices", value: "2.5B+", growth: "All-time high" },
      { label: "EPS", value: "$2.01", growth: "+22% YoY" },
      { label: "Share Buyback", value: "$100B", growth: "New authorization" },
      { label: "Q2 CapEx", value: "~$2.1B", growth: "Minimal vs. peers" },
    ],
    
    keyMessages: [
      "Apple is the only Mag-7 member NOT in the AI CapEx arms race — $4.3B in H1 FY2026 vs $650B+ combined for peers — a capital-efficient AI strategy",
      "Services at 77% gross margin accelerating to 16.3% growth (all-time high of $30.98B) — high-quality recurring revenue compounding at scale",
      "iPhone 17 lineup driving 22% revenue growth — strongest March quarter ever — with 2.5B active devices providing unmatched AI distribution",
      "CEO transition: Tim Cook hands over to John Ternus on Sept 1 — Ternus signaled 'an incredible roadmap ahead' with reportedly 10 new product categories",
      "Apple's AI strategy is partner (Google for Siri foundation models) + integrate (Apple Intelligence) — avoiding the CapEx arms race while still delivering AI features",
    ],
    
    cioImplications: [
      {
        title: "Apple's Capital-Efficient AI Model Is a Strategic Outlier",
        detail: "Apple's ability to deliver competitive AI features (Apple Intelligence, Siri improvements) while spending a fraction of what peers invest in AI infrastructure is a significant strategic differentiator. CIOs evaluating AI investment strategies should study Apple's partnership-first approach as a potential model for capital-efficient AI adoption.",
      },
      {
        title: "2.5B Device Installed Base Is the Ultimate AI Distribution Network",
        detail: "Apple's 2.5B active devices represent the largest captive distribution network for AI services in consumer technology. As Apple Intelligence expands and Siri improves, this installed base becomes an increasingly powerful moat. Enterprise CIOs managing Apple device fleets should plan for accelerating AI feature deployment across managed devices.",
      },
      {
        title: "CEO Transition Introduces Both Risk and Opportunity",
        detail: "Tim Cook's handover to John Ternus on September 1 is the most significant Apple leadership change since 2011. Ternus's engineering background and reported 10 new product categories signal a potential acceleration in hardware innovation. CIOs managing Apple-heavy enterprise environments should monitor the transition for changes in enterprise product strategy.",
      },
    ],
    
    stockReaction: "Up ~2.7% post-earnings",
    stockReactionPct: 2.7,
    aiHighlight: "Services: $30.98B (+16.3%) at 77% margin | Apple Intelligence rollout | Siri x Google partnership | 2.5B active devices | Zero AI CapEx arms race",
  },
];

// Cross-company comparison data
export const cloudGrowthData = [
  { company: "Google Cloud", growth: 63, revenue: 20.03, color: "#34A853" },
  { company: "Azure", growth: 40, revenue: 34.7, color: "#00A4EF" },
  { company: "AWS", growth: 28, revenue: 37.6, color: "#FF9900" },
];

export const revenueData = [
  { company: "Amazon", revenue: 181.5, growth: 17, color: "#FF9900" },
  { company: "Alphabet", revenue: 109.9, growth: 22, color: "#34A853" },
  { company: "Apple", revenue: 111.2, growth: 17, color: "#555555" },
  { company: "Microsoft", revenue: 82.9, growth: 18, color: "#00A4EF" },
  { company: "Meta", revenue: 56.31, growth: 33, color: "#1877F2" },
];

export const capexData = [
  { company: "Amazon", capex: 200, color: "#FF9900" },
  { company: "Microsoft", capex: 190, color: "#00A4EF" },
  { company: "Alphabet", capex: 185, color: "#34A853" },
  { company: "Meta", capex: 135, color: "#1877F2" },
  { company: "Apple", capex: 9, color: "#555555" },
];

export const epsGrowthData = [
  { company: "Meta", growth: 62, color: "#1877F2" },
  { company: "Amazon", growth: 75, color: "#FF9900" },
  { company: "Alphabet", growth: 94, color: "#34A853" },
  { company: "Apple", growth: 22, color: "#555555" },
  { company: "Microsoft", growth: 23, color: "#00A4EF" },
];

export const aiMetricsData = [
  { company: "Microsoft", metric: "AI ARR", value: "$37B", growth: "+123% YoY" },
  { company: "Amazon", metric: "Chip Commitments", value: ">$225B", growth: "Trainium" },
  { company: "Alphabet", metric: "Cloud Backlog", value: "$460B+", growth: "~2x QoQ" },
  { company: "Meta", metric: "Meta AI MAU", value: "~1B", growth: "Users" },
  { company: "Apple", metric: "Active Devices", value: "2.5B+", growth: "AI Distribution" },
];

// Earnings-day closing prices (verified from each company's official earnings release / IR page).
// Used as the anchor for "since earnings" change calculation against live quotes.
export const earningsDayClose: Record<string, { price: number; date: string; ticker: string; name: string; color: string }> = {
  META:  { price: 669.12, date: "2026-04-29", ticker: "META",  name: "Meta",      color: "#1877F2" },
  MSFT:  { price: 424.58, date: "2026-04-29", ticker: "MSFT",  name: "Microsoft", color: "#00A4EF" },
  GOOGL: { price: 349.94, date: "2026-04-29", ticker: "GOOGL", name: "Alphabet",  color: "#34A853" },
  AMZN:  { price: 263.04, date: "2026-04-29", ticker: "AMZN",  name: "Amazon",    color: "#FF9900" },
  AAPL:  { price: 270.17, date: "2026-04-30", ticker: "AAPL",  name: "Apple",     color: "#555555" },
};

export const crossCompanyThemes = [
  {
    title: "AI CapEx Arms Race",
    description: "Four of five Mag-7 companies are committing hundreds of billions to AI infrastructure in 2026 alone. Combined CapEx exceeds $700B — the largest single-year technology infrastructure investment in history.",
    implication: "Cloud capacity is the binding constraint on AI adoption, not demand. Enterprises should secure cloud capacity commitments now.",
    icon: "💰",
  },
  {
    title: "Cloud Re-Acceleration",
    description: "All three major clouds (AWS +28%, Azure +40%, Google Cloud +63%) are simultaneously accelerating — a rare alignment that signals enterprise AI workloads are moving from pilot to production.",
    implication: "The AI adoption curve is steeper than most enterprise plans assume. CIOs should accelerate cloud migration timelines.",
    icon: "☁️",
  },
  {
    title: "Agentic AI as Next Platform",
    description: "Every CEO referenced 'agents' and 'agentic' computing as the next paradigm. Microsoft's Copilot evolving to 'async coworkers,' Google's autonomous task forces, Amazon's agentic commerce — this is the next enterprise platform shift.",
    implication: "Enterprise AI strategy must evolve from AI-assisted workflows to AI-autonomous workflows within 12–24 months.",
    icon: "🤖",
  },
  {
    title: "Supply Constraints Throttle Growth",
    description: "Azure, AWS, and Google Cloud all report demand exceeding capacity. Revenue growth is being limited by infrastructure availability, not customer demand — an unusual and significant market dynamic.",
    implication: "First-mover advantage in securing cloud capacity commitments will translate to competitive advantage in AI deployment speed.",
    icon: "⚡",
  },
];
