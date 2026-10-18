# Portfolio

A terminal-style developer portfolio built with **Next.js (App Router)**,
**Tailwind CSS**, **next-themes**, and **JetBrains Mono** — a faithful replica of
the [anish-k.vercel.app](https://anish-k.vercel.app) design, ready for your own content.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Make it yours

Everything you need to edit lives in **`src/data/`** — no component changes required:

| File | What it controls |
| --- | --- |
| `src/data/profile.ts` | Name, title, location, email, socials, about text, quote, resume link, footer |
| `src/data/projects.ts` | Your projects (home "Selected work" + the Projects page, with filter tabs) |
| `src/data/experience.ts` | Jobs, internships, open-source work (the Experience timeline) |
| `src/data/skills.ts` | Skill groups, achievements, coding profiles, certifications |

Then drop in your assets under **`public/`**:

- `avatar.svg` → replace with your photo (any name; update `profile.avatar`)
- `resume.pdf` → add your resume so the "View resume" button works

## Theme

Colors are defined as CSS variables in `src/app/globals.css` (`:root` = light,
`.dark` = dark) and wired to Tailwind in `tailwind.config.ts`. The site defaults
to dark; the header toggle switches themes. Press **⌘K / Ctrl-K** to search.

## Deploy

Push to GitHub and import the repo on [Vercel](https://vercel.com) — zero config.
