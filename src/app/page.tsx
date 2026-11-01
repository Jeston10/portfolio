import type { Metadata } from "next";
import { profile } from "@/data/profile";
import { TerminalBoot } from "@/components/terminal-boot";

export const metadata: Metadata = {
  title: "Welcome",
  description: `Portfolio of ${profile.firstName} ${profile.lastName} — ${profile.title}. ${profile.about[0]}`,
};

export default function LandingPage() {
  return <TerminalBoot />;
}
