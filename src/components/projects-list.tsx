"use client";

import * as React from "react";
import Image from "next/image";
import { projects } from "@/data/projects";
import { TechChip, ArrowLink, Terminal } from "@/components/ui";
import { cn } from "@/lib/utils";

export function ProjectsList() {
  // Build filter tabs from the categories present in the data.
  const categories = React.useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of projects) counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
    return [
      { key: "all", label: "all", count: projects.length },
      ...Array.from(counts.entries()).map(([key, count]) => ({
        key,
        label: key,
        count,
      })),
    ];
  }, []);

  const [filter, setFilter] = React.useState("all");

  const visible = projects.filter(
    (p) => filter === "all" || p.category === filter
  );

  return (
    <div>
      {/* Filter tabs */}
      <div className="mb-12 flex flex-wrap gap-x-5 gap-y-2 border-b border-border pb-4">
        {categories.map((c) => (
          <button
            key={c.key}
            type="button"
            onClick={() => setFilter(c.key)}
            className={cn(
              "relative pb-2 text-sm transition-colors",
              filter === c.key
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {c.label} <span className="text-xs text-muted-foreground">{c.count}</span>
            {filter === c.key && (
              <span className="absolute -bottom-[1px] left-0 h-0.5 w-full bg-brand" />
            )}
          </button>
        ))}
      </div>

      {/* Project cards */}
      <div className="space-y-20">
        {visible.map((project, i) => (
          <article
            key={project.slug}
            id={project.slug}
            className="scroll-mt-24 border-t border-border pt-8"
          >
            <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-muted-foreground">
              <span className="text-brand">{String(i + 1).padStart(2, "0")}</span>
              <span>{project.category}</span>
              <span>·</span>
              <span>{project.year}</span>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Left — narrative */}
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  {project.name}
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-foreground">
                  {project.tagline}
                </p>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  {project.description}
                </p>

                {project.highlights.length > 0 && (
                  <ul className="mt-6 space-y-2">
                    {project.highlights.map((h, hi) => (
                      <li
                        key={hi}
                        className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span className="text-brand">&rsaquo;</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <TechChip key={t} name={t} />
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-6">
                  {project.links.map((link) => (
                    <ArrowLink key={link.label} href={link.href}>
                      {link.label}
                    </ArrowLink>
                  ))}
                </div>
              </div>

              {/* Right — screenshot (preferred) or terminal */}
              {project.image ? (
                <div className="lg:pt-2">
                  <div className="overflow-hidden rounded-lg border border-border bg-surface">
                    <Image
                      src={project.image}
                      alt={`${project.name} screenshot`}
                      width={1280}
                      height={800}
                      className="h-auto w-full"
                    />
                  </div>
                </div>
              ) : (
                project.terminal && (
                  <div className="lg:pt-2">
                    <Terminal
                      title={project.terminal.title}
                      lines={project.terminal.lines}
                    />
                  </div>
                )
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
