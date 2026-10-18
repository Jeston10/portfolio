// ─────────────────────────────────────────────────────────────────────────
//  SKILLS & CREDENTIALS  ·  from your GitHub repos + LinkedIn profile
// ─────────────────────────────────────────────────────────────────────────

export const skillGroups: { title: string; items: string[] }[] = [
  {
    title: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "Java", "Solidity", "SQL", "HTML", "CSS"],
  },
  {
    title: "Frontend",
    items: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "shadcn/ui",
      "Framer Motion",
      "Vite",
      "Three.js",
    ],
  },
  {
    title: "Backend",
    items: ["Node.js", "Spring Boot", "Express.js", "Maven", "Inngest", "REST APIs"],
  },
  {
    title: "Databases",
    items: ["MongoDB", "PostgreSQL", "Supabase", "Appwrite"],
  },
  {
    title: "AI & ML",
    items: ["OpenAI", "Groq", "Hugging Face", "Generative AI", "LLM routing"],
  },
  {
    title: "Blockchain",
    items: ["Solidity", "Ethereum", "Web3", "Smart Contracts"],
  },
  {
    title: "Data & Analytics",
    items: ["Data Analytics", "Big Data Analytics", "Data Visualisation", "Business Data Management"],
  },
  {
    title: "Security & Cloud",
    items: ["Ethical Hacking", "Risk Management", "Cybersecurity", "Cloud Computing"],
  },
  {
    title: "Tools & Deploy",
    items: ["Git", "GitHub", "GitLab", "Vercel", "npm"],
  },
];

export type Achievement = {
  stat: string;
  title: string;
  description: string;
  tag: string;
};

export const achievements: Achievement[] = [
  {
    stat: "L4",
    title: "GitLab Contributor Developer",
    description:
      "Reached Contributor Developer Level 4 through sustained open-source merge requests across GitLab.",
    tag: "open source",
  },
  {
    stat: "SIH '25",
    title: "Smart India Hackathon 2025",
    description:
      "Built AyurChakra, a blockchain-backed agriculture supply-chain traceability platform.",
    tag: "hackathon",
  },
  {
    stat: "5",
    title: "Languages spoken",
    description: "Fluent across five languages, including English, German and Hindi.",
    tag: "communication",
  },
];

export type CodingProfile = {
  platform: string;
  handle: string;
  stats: { label: string; value: string }[];
  href: string;
};

export const codingProfiles: CodingProfile[] = [
  {
    platform: "GitHub",
    handle: "@Jeston10",
    stats: [
      { label: "public repos", value: "27" },
      { label: "followers", value: "3" },
    ],
    href: "https://github.com/Jeston10",
  },
  {
    platform: "GitLab",
    handle: "@sjestonsingh",
    stats: [
      { label: "contributor level", value: "4" },
      { label: "focus", value: "bug fixes" },
    ],
    href: "https://gitlab.com/sjestonsingh",
  },
  {
    // Stats captured from leetcode.com on 2026-10-18; update as you solve more.
    platform: "LeetCode",
    handle: "@Justin_zzz_go",
    stats: [
      { label: "problems solved", value: "651" },
      { label: "global ranking", value: "119,371" },
    ],
    href: "https://leetcode.com/u/Justin_zzz_go/",
  },
];

export type Certification = {
  tag: string;
  title: string;
  description: string;
  action: string;
  href: string;
};

export const certifications: Certification[] = [
  {
    tag: "education",
    title: "B.Tech CSE (Blockchain) — VIT-AP University",
    description:
      "Computer Science & Engineering with a Blockchain specialisation, August 2022 to September 2026.",
    action: "View",
    href: "https://vitap.ac.in",
  },
  {
    tag: "job simulation",
    title: "Quantium — Data Analytics Job Simulation",
    description:
      "Forage virtual experience program in data analytics and business insight.",
    action: "View",
    href: "https://www.theforage.com",
  },
  {
    tag: "job simulation",
    title: "Electronic Arts — Software Engineering Job Simulation",
    description: "Forage virtual experience program in software engineering.",
    action: "View",
    href: "https://www.theforage.com",
  },
  {
    tag: "job simulation",
    title: "Tata Group — Data Visualisation Job Simulation",
    description:
      "Forage program: empowering business with effective data-visualisation insights.",
    action: "View",
    href: "https://www.theforage.com",
  },
];
