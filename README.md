# Cadence Studio

**A browser-based YouTube upload-queue manager that AI-generates titles, descriptions, and tags.**

[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19.2-61dafb.svg)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646cff.svg)](https://vite.dev)

Cadence Studio is a client-only app for preparing and organizing a YouTube publishing queue. Drop in your videos, let an LLM draft optimized metadata tuned to your channel, then schedule and track them. There is no backend — AI calls go directly to the provider you configure (Anthropic Claude or a local Ollama instance). It pairs with **Cadence Editor**, which can hand finished projects off to Studio.

> **Note:** the *upload* step is currently a **simulation** — it animates publishing progress to demonstrate the workflow. It does not yet integrate with the YouTube Data API.

---

## Features

- **Drag-and-drop upload queue** — drop video files to build a publishing queue, with at-a-glance stats (draft / ready / scheduled / published)
- **AI metadata generation** — generate 3 title options, an optimized description with hashtags, and tags per video, steered by a free-text channel-context prompt (Claude or Ollama)
- **Scheduling & publish modes** — schedule a slot or publish, then track simulated upload progress
- **Receives handoffs** from Cadence Editor via a cross-origin URL bridge (clip metadata arrives in the URL hash)

---

## Tech stack

- **Language:** JavaScript (JSX)
- **Framework:** React 19 + Vite
- **Styling:** inline styles + injected global CSS (Hanken Grotesk)
- **Icons:** `lucide-react`
- **AI providers:** Anthropic Claude API and Ollama (local)
- **Linting:** ESLint

---

## Prerequisites

- **Node.js 20.19+ (22+ recommended)** and **npm** — required by Vite 8
- A modern browser
- *(Optional, for AI)* an **Anthropic API key** and/or a running **[Ollama](https://ollama.com)** instance

---

## Installation

```bash
cd cadence-studio
npm install
```

---

## Usage

```bash
npm run dev          # serves http://localhost:5173
```

1. Open `http://localhost:5173`.
2. In the config panel, choose your AI provider and set a **channel context** (e.g. `weekly home-espresso reviews for beginners`).
3. Drag video files into the drop zone to add them to the queue.
4. Click **Generate** on a card (or generate for all) to draft titles, a description, and tags.
5. Pick a title option, set a publish mode / schedule, and start the queue.

### Receiving from Cadence Editor

When Cadence Editor (port `5175`) uses **Send to Studio**, it opens this app with the project's clip metadata in the URL hash, which Studio displays for queueing. Only metadata is transferred — drop the original video file in to complete the entry.

### Production build & preview

```bash
npm run build        # runs `vite build`
npm run preview      # serve the production build locally
```

---

## Configuration

There are **no `.env` files** — all runtime configuration is done in the UI and stored in `localStorage`.

| Setting | Notes |
| --- | --- |
| Provider | `Anthropic` (Claude) or `Ollama` (local) |
| API key | Entered in the UI. Note: the current Claude call is made **without** the key, so that path expects an environment that proxies/injects auth — use **Ollama** for fully local AI. |
| Ollama endpoint | e.g. `http://localhost:11434` |
| Ollama model | e.g. `llama3.1` |
| Channel context | Free-text prompt that steers generated titles/descriptions/tags |

Using Ollama locally typically requires allowing browser origins:

```bash
OLLAMA_ORIGINS=* ollama serve
```

---

## Project structure

```
cadence-studio/
└── src/
    ├── components/       # ConfigPanel, DropZone, VideoCard, ActionBar, StatsStrip, Toast…
    ├── App.jsx           # Queue state, AI metadata generation, scheduling, (simulated) uploads
    └── constants.js      # Theme tokens & status definitions
```

---

## Running tests

There is no test framework in this app. Static checks:

```bash
npm run lint         # ESLint
npm run build        # production build (catches build errors)
```

---

## Contributing

1. Fork and create a feature branch off `main`.
2. Before opening a PR, make sure `npm run lint` and `npm run build` pass.
3. Match the existing code style and keep PRs focused and well-described.

---

## License

Licensed under the **Apache License 2.0**. See [`LICENSE`](LICENSE) for the full text.
