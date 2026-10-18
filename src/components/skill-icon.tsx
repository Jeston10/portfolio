import type { IconType } from "react-icons";
import {
  SiTypescript,
  SiJavascript,
  SiPython,
  SiSolidity,
  SiHtml5,
  SiCss3,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiShadcnui,
  SiFramer,
  SiVite,
  SiThreedotjs,
  SiNodedotjs,
  SiSpringboot,
  SiExpress,
  SiApachemaven,
  SiMongodb,
  SiPostgresql,
  SiSupabase,
  SiAppwrite,
  SiOpenai,
  SiHuggingface,
  SiEthereum,
  SiWeb3Dotjs,
  SiGit,
  SiGithub,
  SiGitlab,
  SiVercel,
  SiNpm,
  SiRuby,
  SiGo,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import {
  Database,
  Workflow,
  Webhook,
  Cpu,
  Sparkles,
  Route,
  FileCode2,
  BarChart3,
  Layers,
  PieChart,
  Briefcase,
  Bug,
  ShieldAlert,
  ShieldCheck,
  Cloud,
  Braces,
  Brain,
  Boxes,
  Globe,
  AudioLines,
  Landmark,
  KeyRound,
  GalleryHorizontalEnd,
  type LucideIcon,
} from "lucide-react";

type Entry = { Icon: IconType | LucideIcon; color?: string };

// A brand colour is set only where it reads well on both themes. Logos that are
// essentially black/grey are left uncoloured so they inherit the text colour
// (dark in light mode, light in dark mode).
const map: Record<string, Entry> = {
  // Languages
  TypeScript: { Icon: SiTypescript, color: "#3178C6" },
  JavaScript: { Icon: SiJavascript, color: "#F7DF1E" },
  Python: { Icon: SiPython, color: "#3776AB" },
  Java: { Icon: FaJava, color: "#E76F00" },
  Solidity: { Icon: SiSolidity },
  SQL: { Icon: Database },
  HTML: { Icon: SiHtml5, color: "#E34F26" },
  CSS: { Icon: SiCss3, color: "#1572B6" },

  // Frontend
  React: { Icon: SiReact, color: "#61DAFB" },
  "Next.js": { Icon: SiNextdotjs },
  "Tailwind CSS": { Icon: SiTailwindcss, color: "#06B6D4" },
  "shadcn/ui": { Icon: SiShadcnui },
  "Framer Motion": { Icon: SiFramer, color: "#0055FF" },
  Vite: { Icon: SiVite, color: "#646CFF" },
  "Three.js": { Icon: SiThreedotjs },

  // Backend
  "Node.js": { Icon: SiNodedotjs, color: "#5FA04E" },
  "Spring Boot": { Icon: SiSpringboot, color: "#6DB33F" },
  "Express.js": { Icon: SiExpress },
  Maven: { Icon: SiApachemaven, color: "#C71A36" },
  Inngest: { Icon: Workflow },
  "REST APIs": { Icon: Webhook },

  // Databases
  MongoDB: { Icon: SiMongodb, color: "#47A248" },
  PostgreSQL: { Icon: SiPostgresql, color: "#4169E1" },
  Supabase: { Icon: SiSupabase, color: "#3FCF8E" },
  Appwrite: { Icon: SiAppwrite, color: "#FD366E" },

  // AI & ML
  OpenAI: { Icon: SiOpenai },
  Groq: { Icon: Cpu },
  "Hugging Face": { Icon: SiHuggingface, color: "#FFD21E" },
  "Generative AI": { Icon: Sparkles },
  "LLM routing": { Icon: Route },

  // Blockchain
  Ethereum: { Icon: SiEthereum },
  Web3: { Icon: SiWeb3Dotjs, color: "#F16822" },
  "Smart Contracts": { Icon: FileCode2 },

  // Data & Analytics
  "Data Analytics": { Icon: BarChart3 },
  "Big Data Analytics": { Icon: Layers },
  "Data Visualisation": { Icon: PieChart },
  "Business Data Management": { Icon: Briefcase },

  // Security & Cloud
  "Ethical Hacking": { Icon: Bug },
  "Risk Management": { Icon: ShieldAlert },
  Cybersecurity: { Icon: ShieldCheck },
  "Cloud Computing": { Icon: Cloud },

  // Tools & Deploy
  Git: { Icon: SiGit, color: "#F05032" },
  GitHub: { Icon: SiGithub },
  GitLab: { Icon: SiGitlab, color: "#FC6D26" },
  Vercel: { Icon: SiVercel },
  npm: { Icon: SiNpm, color: "#CB3837" },

  // Extra tech used in Projects & Experience tags
  Ruby: { Icon: SiRuby, color: "#CC342D" },
  Go: { Icon: SiGo, color: "#00ADD8" },
  "Voice AI": { Icon: AudioLines },
  "Machine Learning": { Icon: Brain },
  Blockchain: { Icon: Boxes },
  "Web Development": { Icon: Globe },
  "Embla Carousel": { Icon: GalleryHorizontalEnd },
  Plaid: { Icon: Landmark },
  Dwolla: { Icon: Landmark },
  "Better Auth": { Icon: KeyRound },
};

// Resolve a tag name to a map entry, tolerating version suffixes and
// parenthetical qualifiers, e.g. "Next.js 15" and "PostgreSQL (Supabase)".
function lookup(name: string): Entry {
  if (map[name]) return map[name];
  const noParen = name.replace(/\s*\(.*\)\s*$/, "").trim();
  if (map[noParen]) return map[noParen];
  const noVersion = noParen.replace(/\s+v?\d+(\.\d+)*$/i, "").trim();
  if (map[noVersion]) return map[noVersion];
  return { Icon: Braces };
}

export function SkillIcon({
  name,
  className = "h-[18px] w-[18px]",
}: {
  name: string;
  className?: string;
}) {
  const { Icon, color } = lookup(name);
  return (
    <Icon
      className={className}
      // Brand colour where defined; otherwise inherit the current text colour.
      style={color ? { color } : undefined}
      aria-hidden
    />
  );
}
