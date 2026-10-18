import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SkillIcon } from "@/components/skill-icon";

/** The outer section used by every page — matches the original spacing. */
export function PageShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn("px-4 pb-20 pt-24 sm:px-6 lg:px-12 lg:pt-32", className)}
    >
      <div className="container mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

/** Big page title + optional lead paragraph (Experience / Projects / Skills). */
export function PageHeading({
  title,
  lead,
}: {
  title: string;
  lead?: React.ReactNode;
}) {
  return (
    <header className="mb-10 space-y-3 sm:mb-14">
      <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-7xl">
        {title}
      </h1>
      {lead && (
        <p className="max-w-xl text-muted-foreground">{lead}</p>
      )}
    </header>
  );
}

/** A plain tag chip. */
export function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded border border-border bg-surface/50 px-2 py-0.5 text-xs text-muted-foreground">
      {children}
    </span>
  );
}

/** A tech chip with its brand icon (same icon set as the Skills page). */
export function TechChip({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded border border-border bg-surface/50 px-2 py-0.5 text-xs text-muted-foreground">
      <SkillIcon name={name} className="h-3.5 w-3.5 shrink-0" />
      {name}
    </span>
  );
}

/** Small inline link with an external arrow, used across pages. */
export function ArrowLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const external = /^https?:\/\//.test(href);
  const Comp: any = external ? "a" : Link;
  const props = external
    ? { href, target: "_blank", rel: "noreferrer" }
    : { href };
  return (
    <Comp
      {...props}
      className={cn(
        "group inline-flex items-center gap-1 text-sm text-foreground transition-colors hover:text-brand",
        className
      )}
    >
      {children}
      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Comp>
  );
}

/** Terminal-style code block used on project cards. */
export function Terminal({
  title,
  lines,
}: {
  title: string;
  lines: string[];
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-surface">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-brand/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-term-ok/70" />
        <span className="ml-2 text-xs text-muted-foreground">{title}</span>
      </div>
      <pre className="scrollbar-thin overflow-x-auto p-4 text-xs leading-relaxed text-muted-foreground">
        <code>
          {lines.map((line, i) => (
            <div
              key={i}
              className={cn(
                line.startsWith("$") && "text-foreground",
                line.startsWith("#") && "text-term-dim"
              )}
            >
              {line || " "}
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}
