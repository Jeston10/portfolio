"use client";

import * as React from "react";
import { Play, Pause } from "lucide-react";
import type { Track } from "@/data/music";
import { cn } from "@/lib/utils";

function fmt(s: number) {
  if (!Number.isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const ss = Math.floor(s % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${ss}`;
}

export type MusicPlayerHandle = {
  pause: () => void;
  resume: () => void;
  toggle: () => void;
  isPlaying: () => boolean;
};

/**
 * Self-contained audio player for a single track. `variant="card"` matches
 * the site surface; `variant="terminal"` matches the dark terminal window.
 * Remount it (via a `key`) to switch tracks; pass `autoPlay` to start
 * playing as soon as it mounts (only works right after a user gesture).
 * Imperative controls (pause/resume/toggle) are exposed via a ref.
 */
export const MusicPlayer = React.forwardRef<
  MusicPlayerHandle,
  { track: Track; autoPlay?: boolean; variant?: "card" | "terminal" }
>(function MusicPlayer({ track, autoPlay = false, variant = "card" }, ref) {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = React.useState(false);
  const [current, setCurrent] = React.useState(0);
  const [duration, setDuration] = React.useState(0);

  const start = React.useCallback(() => {
    audioRef.current
      ?.play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, []);

  const pause = React.useCallback(() => {
    audioRef.current?.pause();
    setPlaying(false);
  }, []);

  const toggle = React.useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) start();
    else pause();
  }, [start, pause]);

  React.useImperativeHandle(ref, () => ({
    pause,
    resume: start,
    toggle,
    isPlaying: () => !!audioRef.current && !audioRef.current.paused,
  }));

  React.useEffect(() => {
    if (autoPlay) start();
  }, [autoPlay, start]);

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const a = audioRef.current;
    if (!a || !a.duration) return;
    a.currentTime = (Number(e.target.value) / 100) * a.duration;
  };

  const progress = duration ? (current / duration) * 100 : 0;
  const isTerminal = variant === "terminal";

  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-xl border p-3",
        isTerminal ? "border-white/10 bg-[#121212]" : "border-border bg-surface"
      )}
    >
      <audio
        ref={audioRef}
        src={track.src}
        preload="metadata"
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />

      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause" : "Play"}
        className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-lg text-white shadow-inner transition-transform hover:scale-[1.03]"
        style={{ backgroundImage: track.gradient }}
      >
        {playing ? (
          <Pause className="h-6 w-6 fill-current" />
        ) : (
          <Play className="h-6 w-6 translate-x-[1px] fill-current" />
        )}
      </button>

      <div className="min-w-0 flex-grow">
        <div className="flex items-baseline justify-between gap-2">
          <p
            className={cn(
              "truncate font-bold",
              isTerminal ? "text-zinc-100" : "text-foreground"
            )}
          >
            {track.title}
          </p>
          <span
            className={cn(
              "shrink-0 text-xs tabular-nums",
              isTerminal ? "text-zinc-500" : "text-muted-foreground"
            )}
          >
            {fmt(current)} / {fmt(duration)}
          </span>
        </div>
        <p
          className={cn(
            "truncate text-sm",
            isTerminal ? "text-zinc-400" : "text-muted-foreground"
          )}
        >
          {track.artist}
        </p>
        <input
          type="range"
          min={0}
          max={100}
          step={0.1}
          value={progress}
          onChange={seek}
          aria-label="Seek"
          className={cn(
            "mt-2 h-1 w-full cursor-pointer appearance-none rounded-full accent-brand",
            isTerminal ? "bg-white/15" : "bg-border"
          )}
        />
      </div>
    </div>
  );
});
