import type { Metadata } from "next";
import {
  skillGroups,
  achievements,
  codingProfiles,
  certifications,
} from "@/data/skills";
import { profile } from "@/data/profile";
import { PageShell, PageHeading, ArrowLink } from "@/components/ui";
import { SkillIcon } from "@/components/skill-icon";

export const metadata: Metadata = {
  title: `Skills & Credentials | ${profile.firstName} ${profile.lastName}`,
};

export default function SkillsPage() {
  return (
    <PageShell>
      <PageHeading
        title="Skills"
        lead="What I reach for, grouped by where it sits in the stack."
      />

      {/* Skill groups */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
        {skillGroups.map((group) => (
          <div key={group.title}>
            <h2 className="mb-4 text-lg font-bold text-foreground">
              {group.title}
            </h2>
            <ul className="space-y-2.5">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2.5 text-sm text-muted-foreground"
                >
                  <SkillIcon name={item} className="h-[18px] w-[18px] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <h2 className="mb-8 mt-24 border-b border-border pb-2 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
        Achievements
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {achievements.map((a, i) => (
          <div
            key={i}
            className="rounded-lg border border-border bg-surface p-6"
          >
            <p className="text-4xl font-bold tracking-tight text-brand">
              {a.stat}
            </p>
            <h3 className="mt-3 font-bold text-foreground">{a.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {a.description}
            </p>
            <p className="mt-4 text-xs uppercase tracking-wider text-muted-foreground">
              {a.tag}
            </p>
          </div>
        ))}
      </div>

      {/* Coding profiles */}
      <h2 className="mb-2 mt-24 border-b border-border pb-2 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
        Coding profiles
      </h2>
      <p className="mb-8 text-sm text-muted-foreground">
        Where my code and contributions live.
      </p>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {codingProfiles.map((p) => (
          <div
            key={p.platform}
            className="rounded-lg border border-border bg-surface p-6"
          >
            <div className="flex items-baseline justify-between">
              <h3 className="font-bold text-foreground">{p.platform}</h3>
              <span className="text-xs text-muted-foreground">{p.handle}</span>
            </div>
            <dl className="mt-5 space-y-2">
              {p.stats.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center justify-between text-sm"
                >
                  <dt className="text-muted-foreground">{s.label}</dt>
                  <dd className="font-bold text-foreground">{s.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-5">
              <ArrowLink href={p.href}>View profile</ArrowLink>
            </div>
          </div>
        ))}
      </div>

      {/* Certifications */}
      <h2 className="mb-8 mt-24 border-b border-border pb-2 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
        Certifications
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {certifications.map((c, i) => (
          <div
            key={i}
            className="flex flex-col rounded-lg border border-border bg-surface p-6"
          >
            <p className="text-xs uppercase tracking-wider text-brand">
              {c.tag}
            </p>
            <h3 className="mt-2 font-bold text-foreground">{c.title}</h3>
            <p className="mt-2 flex-grow text-sm leading-relaxed text-muted-foreground">
              {c.description}
            </p>
            <div className="mt-4">
              <ArrowLink href={c.href}>{c.action}</ArrowLink>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
