import { MapPin, ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import { experience, type ExperienceItem } from "@/data/experience";
import { profile } from "@/data/profile";
import { PageShell, PageHeading, TechChip, ArrowLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Experience",
  description: `Work experience and roles of ${profile.firstName} ${profile.lastName} — ${profile.title}.`,
};

export default function ExperiencePage() {
  // Preserve array order while grouping by section label.
  const groups: { section: string; items: ExperienceItem[] }[] = [];
  for (const item of experience) {
    const section = item.section ?? "";
    const last = groups[groups.length - 1];
    if (last && last.section === section) last.items.push(item);
    else groups.push({ section, items: [item] });
  }

  return (
    <PageShell>
      <PageHeading title="Experience" />

      <div className="space-y-16">
        {groups.map((group, gi) => (
          <div key={gi}>
            {group.section && (
              <h2 className="mb-8 border-b border-border pb-2 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                {group.section}
              </h2>
            )}
            <div className="space-y-12">
              {group.items.map((item, i) => (
                <ExperienceRow key={i} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}

function ExperienceRow({ item }: { item: ExperienceItem }) {
  return (
    <article className="grid grid-cols-1 gap-4 border-t border-border pt-8 sm:grid-cols-[14rem_1fr] sm:gap-8">
      {/* Left: meta */}
      <div className="space-y-2 text-sm text-muted-foreground">
        <p className="text-foreground">{item.period}</p>
        <p className="flex items-start gap-2">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
          {item.location}
        </p>
      </div>

      {/* Right: detail */}
      <div>
        <h3 className="text-2xl font-bold tracking-tight text-foreground">
          {item.org}
        </h3>
        <p className="mt-1 text-brand">{item.role}</p>
        {item.subtitle && (
          <p className="mt-0.5 text-sm text-muted-foreground">
            {item.subtitle}
          </p>
        )}

        <ul className="mt-5 space-y-3">
          {item.points.map((point, i) => (
            <li
              key={i}
              className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
            >
              <ChevronRight className="mt-1 h-3.5 w-3.5 shrink-0 text-brand" />
              <span>{point}</span>
            </li>
          ))}
        </ul>

        {item.tech.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {item.tech.map((t) => (
              <TechChip key={t} name={t} />
            ))}
          </div>
        )}

        {item.links.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-6">
            {item.links.map((link) => (
              <ArrowLink key={link.label} href={link.href}>
                {link.label}
              </ArrowLink>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
