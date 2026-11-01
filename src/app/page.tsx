import type { Metadata } from "next";
import { profile } from "@/data/profile";
import { TerminalBoot } from "@/components/terminal-boot";

export const metadata: Metadata = {
  title: `Welcome | ${profile.firstName} ${profile.lastName}`,
};

export default function LandingPage() {
  return <TerminalBoot />;
}
