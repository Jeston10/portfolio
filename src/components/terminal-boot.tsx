"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { favorites, type Track } from "@/data/music";
import { MusicPlayer, type MusicPlayerHandle } from "@/components/music-player";
import { playKeyClick } from "@/lib/sounds";

type Tone = "out" | "cmd" | "err" | "accent" | "dim";
type Line = { text: string; tone?: Tone };

const PAGES = [
  { name: "home", href: "/home", desc: "intro, about & selected work" },
  { name: "experience", href: "/experience", desc: "roles & work history" },
  { name: "projects", href: "/projects", desc: "things I have built" },
  { name: "skills", href: "/skills", desc: "skills & credentials" },
  { name: "blogs", href: "/blogs", desc: "writing & notes" },
  { name: "opensource", href: "/opensource", desc: "contributions & projects" },
];

const PROMPT = "jeston@portfolio ~ %";

const HELP: Line[] = [
  { text: "Available commands:", tone: "accent" },
  { text: "  cd <page>      open a page              e.g. cd home" },
  { text: "  ls             list all pages" },
  { text: "  ls --help      show this command list" },
  { text: "  play [n]       list / play favourite tracks" },
  { text: "  pause / resume pause or resume the track" },
  { text: "  next / prev    skip to next / previous track" },
  { text: "  clear          clear the terminal" },
  { text: "  exit           close the terminal session" },
  { text: "  help           alias for ls --help" },
  { text: "" },
];

const toneClass: Record<Tone, string> = {
  out: "text-zinc-400",
  cmd: "text-zinc-200",
  err: "text-red-400",
  accent: "text-emerald-400",
  dim: "text-zinc-500",
};

export function TerminalBoot() {
  const router = useRouter();
  const [phase, setPhase] = React.useState<"welcome" | "shell" | "closed">(
    "welcome"
  );
  const [history, setHistory] = React.useState<Line[]>([]);
  const [input, setInput] = React.useState("");
  const [nowPlaying, setNowPlaying] = React.useState<Track | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const endRef = React.useRef<HTMLDivElement>(null);
  const playerRef = React.useRef<MusicPlayerHandle>(null);

  // Welcome / closed screens: Enter (or tap) opens a fresh shell.
  React.useEffect(() => {
    if (phase !== "welcome" && phase !== "closed") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") setPhase("shell");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase]);

  // Seed the shell with an intro the first time it opens.
  React.useEffect(() => {
    if (phase !== "shell") return;
    setHistory([
      { text: "Welcome to Jeston's Portfolio.", tone: "accent" },
      { text: "Type `ls --help` to list commands, or `ls` to see all pages.", tone: "out" },
      { text: "" },
    ]);
    const t = setTimeout(() => inputRef.current?.focus(), 0);
    return () => clearTimeout(t);
  }, [phase]);

  React.useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [history, phase]);

  const run = (raw: string) => {
    const echo: Line = { text: `${PROMPT} ${raw}`, tone: "cmd" };
    const cmd = raw.trim();
    const lower = cmd.toLowerCase();

    if (cmd === "") {
      setHistory((h) => [...h, echo]);
      return;
    }

    if (lower === "ls --help" || lower === "help" || lower === "--help") {
      setHistory((h) => [...h, echo, ...HELP]);
      return;
    }

    if (lower === "ls" || lower === "ls -a" || lower === "ls -la") {
      const out: Line[] = [
        { text: PAGES.map((p) => p.name + "/").join("   "), tone: "accent" },
        { text: "" },
        ...PAGES.map((p) => ({
          text: `  ${(p.name + "/").padEnd(14)}${p.desc}`,
          tone: "out" as Tone,
        })),
        { text: "" },
        { text: "Open one with `cd <page>`, e.g. cd projects.", tone: "dim" },
        { text: "" },
      ];
      setHistory((h) => [...h, echo, ...out]);
      return;
    }

    if (lower === "pause") {
      if (nowPlaying) {
        playerRef.current?.pause();
        setHistory((h) => [...h, echo, { text: "⏸ paused", tone: "accent" }, { text: "" }]);
      } else {
        setHistory((h) => [...h, echo, { text: "nothing is playing — run `play <n>`", tone: "dim" }, { text: "" }]);
      }
      return;
    }

    if (lower === "resume") {
      if (nowPlaying) {
        playerRef.current?.resume();
        setHistory((h) => [...h, echo, { text: `▶ resumed: ${nowPlaying.title}`, tone: "accent" }, { text: "" }]);
      } else {
        setHistory((h) => [...h, echo, { text: "nothing to resume — run `play <n>`", tone: "dim" }, { text: "" }]);
      }
      return;
    }

    if (lower === "next" || lower === "prev" || lower === "previous") {
      if (!nowPlaying) {
        setHistory((h) => [...h, echo, { text: "nothing is playing — run `play <n>`", tone: "dim" }, { text: "" }]);
        return;
      }
      const idx = favorites.findIndex((t) => t.src === nowPlaying.src);
      const delta = lower === "next" ? 1 : -1;
      const nextTrack =
        favorites[(idx + delta + favorites.length) % favorites.length];
      setNowPlaying(nextTrack);
      setHistory((h) => [
        ...h,
        echo,
        {
          text: `♪ now playing: ${nextTrack.title} — ${nextTrack.artist}`,
          tone: "accent",
        },
        { text: "" },
      ]);
      return;
    }

    if (lower === "play" || lower.startsWith("play ")) {
      const arg = cmd.slice(4).trim();
      if (arg === "") {
        const out: Line[] = [
          { text: "On repeat — my favourite tracks:", tone: "accent" },
          { text: "" },
          ...favorites.map((t, idx) => ({
            text: `  ${idx + 1}  ${t.title.padEnd(18)}${t.artist}`,
            tone: "out" as Tone,
          })),
          { text: "" },
          { text: "Use `play <n>` to open a track on Spotify.", tone: "dim" },
          { text: "" },
        ];
        setHistory((h) => [...h, echo, ...out]);
        return;
      }
      const n = parseInt(arg, 10);
      const found = Number.isFinite(n)
        ? favorites[n - 1]
        : favorites.find((t) => t.title.toLowerCase() === arg.toLowerCase());
      if (found) {
        setNowPlaying(found);
        setHistory((h) => [
          ...h,
          echo,
          {
            text: `♪ now playing: ${found.title} — ${found.artist}`,
            tone: "accent",
          },
          { text: "" },
        ]);
        return;
      }
      setHistory((h) => [
        ...h,
        echo,
        { text: `play: no such track: ${arg}`, tone: "err" },
        { text: "Run `play` to list tracks.", tone: "dim" },
        { text: "" },
      ]);
      return;
    }

    if (lower === "clear") {
      setHistory([]);
      return;
    }

    if (lower === "exit" || lower === "logout" || lower === "quit") {
      setHistory((h) => [...h, echo, { text: "logout", tone: "out" }]);
      // Best-effort tab close. Browsers only let a script close a tab that a
      // script opened (window.open / target="_blank" / the in-app preview),
      // so this fully closes the tab wherever that's allowed. For a tab the
      // user opened directly, the close is blocked and we show the classic
      // "[Process completed]" screen instead.
      setTimeout(() => {
        window.close();
        try {
          window.open("", "_self");
          window.close();
        } catch {
          /* close blocked by the browser */
        }
        setPhase("closed");
      }, 350);
      return;
    }

    if (lower === "cd" || lower.startsWith("cd ")) {
      const arg = cmd.slice(2).trim().replace(/\/+$/, "").toLowerCase();
      const name = arg === "" || arg === "~" ? "home" : arg;
      const page = PAGES.find((p) => p.name === name);
      if (page) {
        setHistory((h) => [
          ...h,
          echo,
          { text: `opening ${page.name}…`, tone: "accent" },
        ]);
        setTimeout(() => router.push(page.href), 250);
        return;
      }
      setHistory((h) => [
        ...h,
        echo,
        { text: `cd: no such page: ${arg}`, tone: "err" },
        { text: "Run `ls` to see available pages.", tone: "dim" },
        { text: "" },
      ]);
      return;
    }

    setHistory((h) => [
      ...h,
      echo,
      { text: `zsh: command not found: ${cmd}`, tone: "err" },
      { text: "Type `ls --help` for a list of commands.", tone: "dim" },
      { text: "" },
    ]);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    run(input);
    setInput("");
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-zinc-900 via-black to-zinc-900 px-4 py-10">
      <div className="w-full max-w-3xl overflow-hidden rounded-xl border border-white/10 bg-[#1b1b1d] shadow-2xl shadow-black/60 ring-1 ring-black/40">
        {/* macOS title bar */}
        <div className="relative flex h-9 items-center gap-2 border-b border-white/5 bg-[#2a2a2c] px-4">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="pointer-events-none absolute inset-x-0 text-center text-xs text-zinc-400">
            jeston@portfolio — zsh — 80×24
          </span>
        </div>

        {/* Terminal body */}
        {phase === "welcome" ? (
          <button
            type="button"
            onClick={() => setPhase("shell")}
            className="flex h-[22rem] w-full cursor-default flex-col items-center justify-center gap-6 px-6 text-center font-mono sm:h-[24rem]"
          >
            <pre className="select-none text-xs leading-tight text-emerald-400 sm:text-sm">
{`     _           _
    | | ___  ___| |_ ___  _ __
 _  | |/ _ \\/ __| __/ _ \\| '_ \\
| |_| |  __/\\__ \\ || (_) | | | |
 \\___/ \\___||___/\\__\\___/|_| |_|`}
            </pre>
            <div className="space-y-2">
              <p className="text-lg text-zinc-100 sm:text-xl">
                Welcome to Jeston&apos;s Portfolio
              </p>
              <p className="text-sm text-zinc-400">
                Press{" "}
                <kbd className="rounded border border-white/15 bg-white/5 px-1.5 py-0.5 text-xs text-zinc-200">
                  Enter
                </kbd>{" "}
                to open the terminal to access
                <span className="ml-1 inline-block w-2 animate-pulse text-emerald-400">
                  ▋
                </span>
              </p>
            </div>
          </button>
        ) : phase === "closed" ? (
          <button
            type="button"
            onClick={() => setPhase("shell")}
            className="flex h-[22rem] w-full cursor-default flex-col items-center justify-center gap-3 px-6 text-center font-mono sm:h-[26rem]"
          >
            <p className="text-sm text-zinc-500">[Process completed]</p>
            <p className="text-xs text-zinc-600">
              Press{" "}
              <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[11px] text-zinc-400">
                Enter
              </kbd>{" "}
              to start a new session
            </p>
          </button>
        ) : (
          <div
            onClick={() => inputRef.current?.focus()}
            className="scrollbar-thin h-[22rem] overflow-y-auto px-4 py-3 font-mono text-sm leading-relaxed sm:h-[26rem]"
          >
            {history.map((line, i) => (
              <div
                key={i}
                className={`whitespace-pre-wrap break-words ${
                  toneClass[line.tone ?? "out"]
                }`}
              >
                {line.text || "\u00A0"}
              </div>
            ))}

            {/* Active prompt */}
            <form onSubmit={onSubmit} className="flex items-center gap-2">
              <span className="shrink-0 text-emerald-400">{PROMPT}</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (!e.repeat) playKeyClick();
                }}
                spellCheck={false}
                autoCapitalize="off"
                autoCorrect="off"
                autoComplete="off"
                aria-label="Terminal command input"
                className="flex-1 bg-transparent text-zinc-100 caret-emerald-400 outline-none"
              />
            </form>
            <div ref={endRef} />
          </div>
        )}

        {/* In-terminal music player */}
        {phase === "shell" && nowPlaying && (
          <div className="border-t border-white/5 bg-[#161616] p-3">
            <MusicPlayer
              ref={playerRef}
              key={nowPlaying.src}
              track={nowPlaying}
              autoPlay
              variant="terminal"
            />
          </div>
        )}
      </div>
    </div>
  );
}
