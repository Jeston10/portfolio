// ─────────────────────────────────────────────────────────────────────────
//  PROJECTS  ·  drafted from github.com/Jeston10, edit / reorder freely
// ─────────────────────────────────────────────────────────────────────────
//  - `featured: true` shows a project in "Selected work" on the home page.
//  - `category` drives the /projects filter tabs.
//  - `terminal` is optional: a small code block beside the project.

export type ProjectLink = { label: string; href: string };

export type Project = {
  slug: string;
  name: string;
  category: string;
  year: string;
  tagline: string;
  description: string;
  highlights: string[];
  tech: string[];
  links: ProjectLink[];
  featured?: boolean;
  // A screenshot shown on the right of the project card. Put the file in
  // /public/projects and reference it here (e.g. "/projects/name.png").
  // If both `image` and `terminal` are set, the image wins.
  image?: string;
  terminal?: {
    title: string;
    lines: string[];
  };
};

export const projects: Project[] = [
  {
    slug: "justprep",
    name: "JustPrep",
    category: "ai",
    year: "2026",
    tagline: "AI mock-interview practice that actually changes how you perform.",
    description:
      "Create an interview for a specific role, level, stack and company, take it in text or voice, and get per-question feedback with evidence pulled from your own transcript, plus model answers and a concrete next drill. Every attempt is kept, so progress stays visible, built to a world-class standard on a free-only infrastructure budget.",
    highlights: [
      "Text or voice interviews with per-question, evidence-based feedback",
      "Role / level / stack / company-specific question generation",
      "Every attempt saved, so progress is tracked over time",
    ],
    tech: ["Next.js", "TypeScript", "shadcn/ui", "LLM routing", "Voice AI"],
    links: [
      { label: "Live demo", href: "https://just-prep-ai-interview-z3cv.vercel.app" },
      { label: "Code", href: "https://github.com/Jeston10/JustPrep" },
    ],
    featured: true,
    terminal: {
      title: "justprep / session",
      lines: [
        '$ justprep start --role "Backend SDE" --level mid',
        "→ company: Stripe · stack: Node + Postgres",
        "Q1  Design an idempotent payment webhook",
        "  ● transcribing voice answer…",
        "  feedback   structure 8/10 · depth 6/10",
        '  evidence    "no retry window" @ 02:14',
        "→ next drill: idempotency keys + dedup",
        "# attempt #7 saved · progress tracked",
      ],
    },
  },
  {
    slug: "justtrade",
    name: "JustTrade",
    category: "full stack",
    year: "2025",
    tagline: "A professional-grade real-time stock trading and analysis platform.",
    description:
      "Live market data, interactive TradingView charts, personalised watchlists and AI-powered market summaries, wrapped in a responsive trading UI. Built on Next.js 15 with App Router and Server Components, event workflows on Inngest, and MongoDB for persistence.",
    highlights: [
      "Real-time prices, market indices and sector performance",
      "AI-generated market summaries and trading insights",
      "Watchlists, alerts and scheduled jobs via Inngest",
    ],
    tech: [
      "Next.js 15",
      "TypeScript",
      "MongoDB",
      "Better Auth",
      "Inngest",
      "Tailwind CSS",
      "Framer Motion",
    ],
    links: [
      { label: "Live demo", href: "https://just-trade.vercel.app" },
      { label: "Code", href: "https://github.com/Jeston10/JustTrade" },
    ],
    featured: true,
    terminal: {
      title: "justtrade / live quotes",
      lines: [
        "$ justtrade watch AAPL NVDA TSLA",
        "AAPL   228.50   ▲ +1.24%",
        "NVDA   138.07   ▲ +3.01%",
        "TSLA   251.44   ▼ -0.86%",
        "$ justtrade alert NVDA > 140",
        "✓ alert armed · Inngest job scheduled",
        "# AI summary: tech leads, energy lags",
      ],
    },
  },
  {
    slug: "ai-finance-tracker",
    name: "AI Finance Tracker",
    category: "ai",
    year: "2025",
    tagline: "AI budget forecasting and personal finance tracking.",
    description:
      "Tracks and categorises transactions automatically with ML, monitors budgets from daily to yearly, and forecasts spending and savings. Sends email alerts when you cross a limit and pulls in live financial news. Next.js 15 and PostgreSQL on Supabase, with categorisation routed across Hugging Face, OpenAI or Groq.",
    highlights: [
      "AI transaction categorisation across Hugging Face / OpenAI / Groq",
      "Budget limits with automated email alerts",
      "AI spending analysis and savings projections",
    ],
    tech: [
      "Next.js 15",
      "TypeScript",
      "PostgreSQL (Supabase)",
      "Hugging Face",
      "OpenAI",
      "Groq",
    ],
    links: [
      { label: "Live demo", href: "https://ai-finance-tracker-backend.vercel.app" },
      { label: "Code", href: "https://github.com/Jeston10/AI-Finance-Tracker" },
    ],
    featured: true,
    terminal: {
      title: "finance-tracker / categorizer",
      lines: [
        '$ tracker add "Uber ride   420"',
        "→ routed to Groq · category: Transport",
        "budget   Transport   3,000/mo   14% used",
        "budget   Dining      2,000/mo   limit hit",
        "  alert → email sent to you",
        "$ tracker forecast --month",
        "projected spend 18,400 · savings 6,600",
        "# live news: markets steady, INR flat",
      ],
    },
  },
  {
    slug: "ghostapi",
    name: "GhostAPI",
    category: "full stack",
    year: "2026",
    tagline: "A workbench for mock HTTP APIs and public-API discovery.",
    description:
      "Define request/response JSON formats in a playground, provision a live mock endpoint backed by MongoDB, then test it from the same origin. An API Hub browses a catalogue of public APIs with an offline fallback and a server-side proxy to try third-party URLs safely.",
    highlights: [
      "Provision persistent mock endpoints from a JSON schema",
      "API Hub with live sources and an offline fallback",
      "Server-side proxy to test third-party URLs",
    ],
    tech: ["Next.js", "TypeScript", "MongoDB", "Node.js"],
    links: [
      { label: "Live demo", href: "https://ghost-api-eta.vercel.app" },
      { label: "Code", href: "https://github.com/Jeston10/GhostAPI" },
    ],
    featured: true,
    terminal: {
      title: "ghostapi / mock endpoint",
      lines: [
        "$ curl -X POST /api/mock/provision -d @schema.json",
        '{ "id": "usr_01", "url": "/api/mock/usr_01" }',
        "$ curl /api/mock/usr_01",
        '{ "name": "Ada", "role": "admin" }',
        "$ ghost hub search weather",
        "→ 6 public APIs · offline fallback ready",
        "# schema persisted in MongoDB",
      ],
    },
  },
  {
    slug: "justbank",
    name: "JustBank",
    category: "full stack",
    year: "2025",
    tagline: "A full-stack banking app with real account connectivity.",
    description:
      "Securely connect multiple bank accounts with Plaid and Dwolla, view balances and full transaction history, transfer funds between accounts, and analyse spending by category. Authentication and data on Appwrite, with a responsive UI and robust error boundaries.",
    highlights: [
      "Bank-account linking via Plaid and Dwolla",
      "Real transfers between connected accounts",
      "Spending analytics broken down by category",
    ],
    tech: ["Next.js", "TypeScript", "Appwrite", "Plaid", "Dwolla"],
    links: [
      { label: "Live demo", href: "https://just-bank.vercel.app" },
      { label: "Code", href: "https://github.com/Jeston10/JustBank" },
    ],
    featured: true,
    terminal: {
      title: "justbank / transfer",
      lines: [
        "$ justbank link --provider plaid",
        "✓ linked   Chase ••4821   Wells ••7193",
        "$ justbank transfer 250.00 ••4821 → ••7193",
        "  processing via Dwolla…   status: settled",
        "balance    Chase    4,120.55",
        "balance    Wells    1,890.00",
        "# spending  Dining 32% · Transport 18%",
      ],
    },
  },
  {
    slug: "justcare",
    name: "JustCare",
    category: "full stack",
    year: "2025",
    tagline: "A healthcare management system for patients and admins.",
    description:
      "Patient registration with health information, appointment booking and scheduling, and an admin dashboard with real-time statistics and status tracking. Built on Next.js and Appwrite with Tailwind and shadcn/ui.",
    highlights: [
      "Patient onboarding and appointment scheduling",
      "Admin dashboard with live statistics",
      "Appointment status tracking (pending / scheduled / cancelled)",
    ],
    tech: ["Next.js 14", "TypeScript", "Appwrite", "Tailwind CSS", "shadcn/ui"],
    links: [
      { label: "Live demo", href: "https://jeston-s-healthcare-site.vercel.app" },
      { label: "Code", href: "https://github.com/Jeston10/JustCare" },
    ],
    terminal: {
      title: "justcare / admin",
      lines: [
        "$ justcare appointments --today",
        "09:30   Patel, R.   scheduled   Dr. Rao",
        "11:00   Khan, S.    pending     triage",
        "14:15   Mehta, A.   cancelled   reslot",
        "$ justcare stats",
        "patients 1,284 · booked 23 · no-show 2",
        "# realtime dashboard · status synced",
      ],
    },
  },
  {
    slug: "avenor",
    name: "Avenor",
    category: "web",
    year: "2026",
    tagline: "A conversion-focused marketing site with rich motion.",
    description:
      "A web-development services site built to showcase services, pricing and portfolio and to generate leads. React 19 and Vite with Tailwind v4, scroll-reveal and staggered animations in Framer Motion, and an Embla testimonials carousel.",
    highlights: [
      "Scroll-progress bar and one-time scroll-reveal sections",
      "Staggered card and list animations",
      "Auto-advancing testimonials carousel",
    ],
    tech: [
      "React 19",
      "TypeScript",
      "Vite",
      "Tailwind CSS v4",
      "Framer Motion",
      "Embla Carousel",
    ],
    links: [
      { label: "Live demo", href: "https://avenor-smoky.vercel.app" },
      { label: "Code", href: "https://github.com/Jeston10/AVENOR" },
    ],
    terminal: {
      title: "avenor / build",
      lines: [
        "$ pnpm build",
        "vite v5  building for production…",
        "✓ 142 modules transformed in 3.21s",
        "  scroll-reveal · stagger · carousel",
        "$ avenor leads --today",
        "captured 18 · qualified 7 · demos 3",
        "# Lighthouse  perf 98 · a11y 100",
      ],
    },
  },
  {
    slug: "ayurchakra",
    name: "AyurChakra",
    category: "blockchain",
    year: "2025",
    tagline: "A blockchain-backed agriculture supply-chain platform.",
    description:
      "An enterprise supply-chain platform connecting farmers, facility managers, labs, regulators and consumers for end-to-end traceability from farm to consumer. Built for Smart India Hackathon 2025 with Next.js 15, MongoDB and Three.js for 3D visualisation.",
    highlights: [
      "Farm-to-consumer traceability across every actor",
      "3D supply-chain visualisation with Three.js",
      "Built for Smart India Hackathon 2025",
    ],
    tech: ["Next.js 15", "React", "MongoDB", "Three.js", "Node.js"],
    links: [{ label: "Code", href: "https://github.com/Jeston10/SIH-Project-2025" }],
    terminal: {
      title: "ayurchakra / trace",
      lines: [
        "$ trace batch BATCH-7XQ2",
        "farm      harvested   Nalgonda    ✓",
        "lab       tested      QA pass     ✓",
        "facility  packaged    Hyderabad   ✓",
        "retail    shelved     Bengaluru   ✓",
        "on-chain  hash 0x9af3…e21  verified",
        "# 3D supply map rendered · Three.js",
      ],
    },
  },
  {
    slug: "vcompass",
    name: "VCompass",
    category: "web",
    year: "2025",
    tagline: "A tour and campus guide for VIT-AP University.",
    description:
      "A web app for navigating and exploring the VIT-AP University campus: places, facilities and wayfinding brought together in one place for the university community.",
    highlights: [
      "Campus wayfinding and facility directory",
      "Built for the VIT-AP community",
    ],
    tech: ["JavaScript", "HTML", "CSS"],
    links: [{ label: "Code", href: "https://github.com/Jeston10/VCompass" }],
    terminal: {
      title: "vcompass / navigate",
      lines: [
        '$ vcompass find "library"',
        "→ Central Library · Block 4 · 120m",
        "$ vcompass route AB1 → Hostel-C",
        "4 min walk · past the Food Court",
        "$ vcompass nearby --food",
        "Food Court · Juice Bar · Night Canteen",
        "# 38 campus locations mapped",
      ],
    },
  },
  {
    slug: "blockchain-entity",
    name: "Blockchain Multi-Functional Entity",
    category: "blockchain",
    year: "2025",
    tagline: "A multi-function blockchain utility built during the specialisation.",
    description:
      "Hands-on smart-contract and on-chain work as part of the Blockchain specialisation: a multi-functional blockchain entity. TODO: expand this with the specific functions it implements, or rename it.",
    highlights: ["Smart-contract and on-chain development practice"],
    tech: ["JavaScript", "Solidity", "Web3"],
    links: [{ label: "Code", href: "https://github.com/Jeston10/JestoGP9Te" }],
    terminal: {
      title: "chain / contract",
      lines: [
        "$ forge build",
        "Compiling Entity.sol … ok",
        "$ forge test",
        "✓ 12 passing · gas avg 48,210",
        '$ cast send Entity "mint(uint256)" 1',
        "tx 0x4c1a…9b   status 1 (success)",
        "# multi-function entity deployed",
      ],
    },
  },
];
