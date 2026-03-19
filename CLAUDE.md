# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Python OOP course slides for VILNIUS TECH / Visma. Static HTML presentations hosted on Vercel at oop.szturo.online.

## Development

```bash
python3 -m http.server 8788
```

Open http://localhost:8788.

## Deployment

- Auto-deploys to Vercel on push to `main`
- Production deploy via `prod` branch triggers GitHub Actions workflow
- Manual: `vercel --prod`

## Architecture

Each lecture is a standalone HTML file (`NN-topic.html`) that imports `shared.css` and `shared.js`. Lecture-specific animations are defined inline in each HTML file's `<style>` block.

- `shared.css` — theme variables (dark/light), slide layout, quiz styles, code block formatting
- `shared.js` — keyboard navigation, theme toggle (localStorage), quiz reveal mechanics, progress bar
- `index.html` — curriculum page with links to lectures (self-contained styles, does not use shared.css/js)
- `NN-live-coding-*.md` — exercise guides for in-class live coding sessions

Slides use `div.slide` elements. Navigation is arrow keys / space. Quizzes use a two-step reveal pattern (step-1 → step-2). Fonts: Outfit (headings), JetBrains Mono (code).
