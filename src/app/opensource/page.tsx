import type { Metadata } from "next";
import { GitMerge, GitPullRequest, Code2 } from "lucide-react";
import { SiGitlab } from "react-icons/si";
import { Github } from "lucide-react";
import { profile } from "@/data/profile";
import { PageShell, PageHeading, ArrowLink } from "@/components/ui";

export const metadata: Metadata = {
  title: `Open Source | ${profile.firstName} ${profile.lastName}`,
};

const profiles = [
  {
    platform: "GitLab",
    handle: "Community Developer · Level 4",
    href: "https://sjestonsingh.gitlab.io",
    icon: <SiGitlab className="h-5 w-5" />,
    blurb:
      "Bug-fix merge requests across GitLab projects: the Rails monolith, the glab CLI, the Language Server and sibling repositories.",
  },
  {
    platform: "GitHub",
    handle: "@Jeston10",
    href: profile.socials.github,
    icon: <Github className="h-5 w-5" />,
    blurb:
      "Full-stack web apps, AI tooling and blockchain experiments, most shipped end to end and open to contributions.",
  },
];

const ways = [
  {
    icon: <GitPullRequest className="h-5 w-5" />,
    title: "Merge requests",
    desc: "Fixing bugs and sharpening developer tooling in active projects.",
  },
  {
    icon: <GitMerge className="h-5 w-5" />,
    title: "Reviews & triage",
    desc: "Reproducing issues, reviewing changes and helping move work forward.",
  },
  {
    icon: <Code2 className="h-5 w-5" />,
    title: "My own projects",
    desc: "Building tools in the open so others can learn from and build on them.",
  },
];

export default function OpenSourcePage() {
  return (
    <PageShell>
      <PageHeading
        title="Open Source"
        lead="Where I contribute, review and build in the open."
      />

      {/* Profiles */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {profiles.map((p) => (
          <div
            key={p.platform}
            className="flex flex-col rounded-lg border border-border bg-surface p-6"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-surface/60 text-foreground">
                {p.icon}
              </span>
              <div>
                <h2 className="font-bold text-foreground">{p.platform}</h2>
                <p className="text-xs text-muted-foreground">{p.handle}</p>
              </div>
            </div>
            <p className="mt-4 flex-grow text-sm leading-relaxed text-muted-foreground">
              {p.blurb}
            </p>
            <div className="mt-5">
              <ArrowLink href={p.href}>View profile</ArrowLink>
            </div>
          </div>
        ))}
      </div>

      {/* Ways I contribute */}
      <h2 className="mb-8 mt-24 border-b border-border pb-2 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
        How I contribute
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {ways.map((w) => (
          <div
            key={w.title}
            className="rounded-lg border border-border bg-surface p-6"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-surface/60 text-brand">
              {w.icon}
            </span>
            <h3 className="mt-4 font-bold text-foreground">{w.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {w.desc}
            </p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
