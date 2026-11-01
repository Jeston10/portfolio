import type { Metadata } from "next";
import { profile } from "@/data/profile";
import { PageShell, PageHeading } from "@/components/ui";
import { ProjectsList } from "@/components/projects-list";

export const metadata: Metadata = {
  title: `Projects | ${profile.firstName} ${profile.lastName}`,
};

export default function ProjectsPage() {
  return (
    <PageShell>
      <PageHeading
        title="Projects"
        lead="Things I have built, most of them from the ground up: AI tools, full-stack web apps, fintech and healthcare products, and a few blockchain experiments, most with a live deployment you can try."
      />
      <ProjectsList />
    </PageShell>
  );
}
