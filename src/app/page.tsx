import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Mail, MapPin, ArrowRight } from "lucide-react";
import { SiGitlab, SiLeetcode } from "react-icons/si";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { QuoteCard } from "@/components/quote-card";
import { ArrowLink } from "@/components/ui";

const featured = projects.filter((p) => p.featured).slice(0, 5);

export default function HomePage() {
  return (
    <section className="px-4 pb-20 pt-24 sm:px-6 lg:px-12 lg:pt-32">
      <div className="container mx-auto max-w-7xl">
        {/* Hero */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — identity */}
          <div>
            <div className="relative mb-8 h-44 w-44 overflow-hidden rounded-full border border-border bg-surface">
              <Image
                src={profile.avatar}
                alt={`${profile.firstName} ${profile.lastName}`}
                fill
                sizes="176px"
                className="object-cover"
                priority
              />
            </div>

            <h1 className="text-6xl font-bold leading-[0.95] tracking-tight text-foreground sm:text-7xl">
              {profile.firstName}
              <br />
              {profile.lastName}
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">{profile.title}</p>

            <div className="mt-8 space-y-2 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {profile.location}
              </p>
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-2 transition-colors hover:text-foreground"
              >
                <Mail className="h-4 w-4" />
                {profile.email}
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <SocialButton
                href={profile.socials.github}
                icon={<Github className="h-4 w-4" />}
                label="GitHub"
              />
              <SocialButton
                href={profile.socials.linkedin}
                icon={<Linkedin className="h-4 w-4" />}
                label="LinkedIn"
              />
              <SocialButton
                href={profile.socials.gitlab}
                icon={<SiGitlab className="h-4 w-4" />}
                label="GitLab"
              />
              <SocialButton
                href={profile.socials.leetcode}
                icon={<SiLeetcode className="h-4 w-4" />}
                label="LeetCode"
              />
              <SocialButton
                href={`mailto:${profile.email}`}
                icon={<Mail className="h-4 w-4" />}
                label="Email"
              />
            </div>
          </div>

          {/* Right — about */}
          <div className="space-y-6">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              About
            </p>
            {profile.about.map((para, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "text-lg leading-relaxed text-foreground"
                    : "leading-relaxed text-muted-foreground"
                }
              >
                {para}
              </p>
            ))}

            {profile.quote && (
              <QuoteCard
                text={profile.quote.text}
                attribution={profile.quote.attribution}
              />
            )}

            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between rounded-lg border border-border bg-surface px-5 py-4 text-sm transition-colors hover:border-ring"
            >
              <span className="font-medium text-foreground">View resume</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Selected work */}
        <div className="mt-24 sm:mt-32">
          <div className="mb-8 flex items-end justify-between border-b border-border pb-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Selected work
            </h2>
            <ArrowLink href="/projects">
              All {projects.length} project{projects.length === 1 ? "" : "s"}
            </ArrowLink>
          </div>

          <ul className="divide-y divide-border">
            {featured.map((project, i) => (
              <li key={project.slug}>
                <Link
                  href={`/projects#${project.slug}`}
                  className="group grid grid-cols-[auto_1fr] items-start gap-4 py-6 sm:grid-cols-[2.5rem_14rem_1fr_auto] sm:gap-6"
                >
                  <span className="font-mono text-sm text-brand">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg font-bold text-foreground transition-colors group-hover:text-brand">
                    {project.name}
                  </h3>
                  <p className="col-span-2 text-sm leading-relaxed text-muted-foreground sm:col-span-1">
                    {project.tagline}
                  </p>
                  <span className="hidden text-xs text-muted-foreground sm:block">
                    {project.category}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function SocialButton({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="flex items-center gap-2 rounded-md border border-border bg-surface/50 px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-ring hover:text-foreground"
    >
      {icon}
      {label}
    </a>
  );
}
