"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";

export function QuoteCard({
  text,
  attribution,
}: {
  text: string;
  attribution: string;
}) {
  const [copied, setCopied] = React.useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`"${text}" ${attribution}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable — ignore */
    }
  };

  return (
    <figure className="relative rounded-lg border border-border bg-surface p-5">
      <button
        type="button"
        aria-label="Copy quote"
        onClick={copy}
        className="absolute right-3 top-3 text-muted-foreground transition-colors hover:text-foreground"
      >
        {copied ? (
          <Check className="h-4 w-4 text-term-ok" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </button>
      <blockquote className="pr-6 text-sm leading-relaxed text-foreground">
        &ldquo;{text}&rdquo;
      </blockquote>
      <figcaption className="mt-3 text-xs text-muted-foreground">
        {attribution}
      </figcaption>
    </figure>
  );
}
