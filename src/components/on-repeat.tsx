"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { favorites } from "@/data/music";
import { MusicPlayer } from "@/components/music-player";

export function OnRepeat() {
  const [i, setI] = React.useState(0);
  const track = favorites[i];

  const prev = () =>
    setI((v) => (v - 1 + favorites.length) % favorites.length);
  const next = () => setI((v) => (v + 1) % favorites.length);

  return (
    <div className="mt-24 sm:mt-32">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          On repeat
        </h2>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous track"
            className="flex h-7 w-7 items-center justify-center rounded-md border border-border transition-colors hover:bg-accent hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="tabular-nums">
            {i + 1}/{favorites.length}
          </span>
          <button
            type="button"
            onClick={next}
            aria-label="Next track"
            className="flex h-7 w-7 items-center justify-center rounded-md border border-border transition-colors hover:bg-accent hover:text-foreground"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-xl">
        <MusicPlayer key={track.src} track={track} />
      </div>

      <p className="mx-auto mt-3 max-w-xl text-center text-xs text-muted-foreground">
        ▶ press play to listen here · or run{" "}
        <code className="text-brand">play</code> in the terminal
      </p>
    </div>
  );
}
