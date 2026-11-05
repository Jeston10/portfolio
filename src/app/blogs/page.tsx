import type { Metadata } from "next";
import { profile } from "@/data/profile";
import { PageShell, PageHeading } from "@/components/ui";
import { BlogsList } from "@/components/blogs-list";

export const metadata: Metadata = {
  title: "Blogs",
  description: `Notes by ${profile.firstName} ${profile.lastName} on full-stack engineering, AI tooling, cloud and blockchain.`,
};

export default function BlogsPage() {
  return (
    <PageShell>
      <PageHeading
        title="Blogs"
        leadClassName="max-w-3xl"
        lead="Writing about the real technicalities of how large systems actually work."
      />

      <BlogsList />
    </PageShell>
  );
}
