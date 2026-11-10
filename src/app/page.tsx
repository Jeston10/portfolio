import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "@/data/profile";
import { TerminalBoot } from "@/components/terminal-boot";

const fullName = `${profile.firstName} ${profile.lastName}`;

export const metadata: Metadata = {
  // Absolute, name-first title so searches for "Jeston" resolve to this page.
  title: { absolute: `${fullName} | ${profile.title}` },
  description: `Portfolio of ${fullName}, ${profile.title}. ${profile.about[0]}`,
  alternates: { canonical: "/" },
};

export default function LandingPage() {
  return (
    <>
      {/*
        The visible landing experience is the interactive terminal below.
        This block gives search engines real, crawlable content about Jeston
        and links to every section, without changing the visual UI.
      */}
      <section className="sr-only">
        <h1>{fullName}</h1>
        <p>
          {fullName} ({profile.firstName}) is a {profile.title} based in{" "}
          {profile.location}.
        </p>
        {profile.about.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
        <nav aria-label="Portfolio sections">
          <ul>
            <li>
              <Link href="/home">About {fullName}</Link>
            </li>
            <li>
              <Link href="/projects">Projects by {fullName}</Link>
            </li>
            <li>
              <Link href="/experience">Experience</Link>
            </li>
            <li>
              <Link href="/skills">Skills</Link>
            </li>
            <li>
              <Link href="/opensource">Open source contributions</Link>
            </li>
            <li>
              <Link href="/blogs">Blogs</Link>
            </li>
          </ul>
        </nav>
      </section>

      <TerminalBoot />
    </>
  );
}
