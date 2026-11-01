import type { Metadata } from "next";
import { PenLine } from "lucide-react";
import { profile } from "@/data/profile";
import { PageShell, PageHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Blogs",
  description: `Notes by ${profile.firstName} ${profile.lastName} on full-stack engineering, AI tooling, cloud and blockchain.`,
};

export default function BlogsPage() {
  return (
    <PageShell>
      <PageHeading
        title="Blogs"
        lead="Notes on what I build: full-stack engineering, AI tooling, cloud and blockchain."
      />

      {/* Empty state until the first posts land. */}
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-surface/40 px-6 py-20 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface text-brand">
          <PenLine className="h-5 w-5" />
        </span>
        <h2 className="mt-6 text-lg font-bold text-foreground">
          Posts are on the way
        </h2>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          I&apos;m writing up what I learn while shipping. Check back soon, the
          first articles will appear here.
        </p>
      </div>
    </PageShell>
  );
}
