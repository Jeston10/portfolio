// ─────────────────────────────────────────────────────────────────────────
//  EXPERIENCE  ·  from your LinkedIn profile
// ─────────────────────────────────────────────────────────────────────────

export type ExperienceItem = {
  section?: string;
  period: string;
  location: string;
  org: string;
  role: string;
  subtitle?: string;
  points: string[];
  tech: string[];
  links: { label: string; href: string }[];
};

export const experience: ExperienceItem[] = [
  {
    period: "September 2026 -Present",
    location: "India (Remote)",
    org: "GitLab",
    role: "Open Source Developer · Contributor Developer (Level 4)",
    points: [
      "Progressed from Contributor Developer Level 1 to Level 4 through sustained open-source contributions.",
      "Raise bug-fix merge requests across GitLab projects: the Rails monolith, the glab CLI, the Language Server and sibling repositories.",
    ],
    tech: ["Ruby", "Go", "TypeScript", "Git"],
    links: [{ label: "GitLab profile", href: "https://gitlab.com/sjestonsingh" }],
  },
  {
    period: "March 2026 -Present",
    location: "Bangalore, Karnataka, India",
    org: "Updot",
    role: "SDE 1",
    points: [
      "Build modern full-stack tech products, following best-in-class in-tech workflow architectures.",
    ],
    tech: ["TypeScript", "Next.js", "Node.js", "MongoDB"],
    links: [],
  },
  {
    period: "December 2025 -Present",
    location: "India",
    org: "WellVantage",
    role: "Full Stack Developer",
    subtitle: "IIT-K incubated",
    points: [
      "Full-stack development on an IIT-Kanpur-incubated product, from UI through to the backend and data layer.",
    ],
    tech: ["JavaScript", "React", "Node.js"],
    links: [
      { label: "View repository", href: "https://github.com/Jeston10/WellVantage" },
    ],
  },
  {
    period: "February 2026 -September 2026",
    location: "India",
    org: "Avenor",
    role: "Founder",
    points: [
      "Founded Avenor, a studio that turns business models into conversion-focused visual web experiences.",
      "Designed and built the marketing site with React 19, Vite, Tailwind CSS and Framer Motion.",
    ],
    tech: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion"],
    links: [{ label: "Live site", href: "https://avenor-smoky.vercel.app" }],
  },
  {
    period: "September 2025 -September 2026",
    location: "India",
    org: "StakeandExposed",
    role: "Founder",
    points: [
      "Building what blockchain can do where nothing else can: on-chain products and smart-contract tooling.",
    ],
    tech: ["Solidity", "Web3", "Blockchain"],
    links: [],
  },
  {
    section: "Internships & roles",
    period: "January 2026 -March 2026",
    location: "India (Remote)",
    org: "BrightCHAMPS",
    role: "Coding Educator",
    points: ["Taught coding to students as a remote coding educator."],
    tech: ["JavaScript", "Python"],
    links: [],
  },
  {
    section: "Internships & roles",
    period: "August 2025 -October 2025",
    location: "India (Remote)",
    org: "Infosys Springboard",
    role: "AI/ML Team Lead",
    points: [
      "Led an AI/ML team through the Springboard program, coordinating work on machine-learning tasks.",
    ],
    tech: ["Python", "Machine Learning"],
    links: [],
  },
  {
    section: "Internships & roles",
    period: "September 2025 -October 2025",
    location: "India",
    org: "Future Interns",
    role: "Blockchain & Crypto Intern",
    points: [
      "Worked through a blockchain and crypto development track, building hands-on tasks with smart contracts and Web3 tooling.",
    ],
    tech: ["Blockchain", "Solidity", "Web3"],
    links: [
      {
        label: "View repository",
        href: "https://github.com/Jeston10/FutureInterns-Blockchain-and-Crypto",
      },
    ],
  },
  {
    section: "Internships & roles",
    period: "September 2025 -October 2025",
    location: "India (Remote)",
    org: "Evoastra Ventures",
    role: "Analytics Manager · Data Analytics",
    points: [
      "Data analytics and analytics-management work, turning raw data into business-ready insights.",
    ],
    tech: ["Python", "Data Analytics"],
    links: [],
  },
  {
    section: "Internships & roles",
    period: "June 2024 -September 2024",
    location: "India",
    org: "RineX.Ai",
    role: "Cybersecurity & Ethical Hacking Intern",
    points: [
      "Hands-on ethical hacking and real-time risk evaluation, collaborating with the security team.",
    ],
    tech: ["Ethical Hacking", "Risk Management", "Cybersecurity"],
    links: [],
  },
  {
    section: "Internships & roles",
    period: "July 2023 -September 2023",
    location: "India",
    org: "HackingFlix",
    role: "Cyber Security Analyst",
    points: [
      "Cybersecurity analysis and responsive web development alongside the team.",
    ],
    tech: ["Cybersecurity", "Web Development"],
    links: [],
  },
  {
    section: "Education",
    period: "August 2022 -September 2026",
    location: "Amaravati, Andhra Pradesh, India",
    org: "VIT-AP University",
    role: "B.Tech, Computer Science & Engineering (Blockchain)",
    points: [
      "Bachelor's degree in Computer Science & Technology with a specialisation in Blockchain.",
    ],
    tech: [],
    links: [],
  },
];
