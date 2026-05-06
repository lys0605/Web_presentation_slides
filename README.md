# Web Presentation Slides

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![KaTeX](https://img.shields.io/badge/KaTeX-0.16-008080?logo=latex&logoColor=white)](https://katex.org)

A browser-based slide presentation system with a live in-browser editor — no build step, no framework CLI, no install. Double-click to launch.

---

## Features

- **Live editor** — edit slide source (JSX) directly in the browser; press ⌘↵ to recompile via Babel and see changes instantly
- **Tweaks panel** — switch colour palettes, toggle equations, flip figure variants without touching code
- **Animate panel** — pick entrance animations, tune duration / delay / easing, preview in real time, and copy the generated CSS
- **Slide thumbnails** — scrollable panel showing all 24 slides at a glance; click any to jump
- **Self-contained** — all JSX is inlined; no XHR fetches; works on `file://` and over a local HTTP server
- **KaTeX equations** — full LaTeX math rendering via KaTeX, toggleable live
- **Presentation mode** — opens the original full-screen deck in a new tab

---

## Quick Start

### Option A — double-click launcher (Mac)

```
double-click  start.command
```

This kills anything on port 8080, starts a Python HTTP server, and opens the editor at `http://localhost:8080/editor.html`.

### Option B — manual

```bash
cd "Presentation slides"
python3 -m http.server 8080
# open http://localhost:8080/editor.html
```

### Option C — open directly (file://)

Because all JSX is inlined (no external `src=` fetches), you can also just open `editor.html` directly from Finder — no server needed.

---

## Project Structure

```
slides_web/
├── start.command                        # Double-click launcher (Mac)
├── README.md
└── Presentation slides/
    ├── editor.html                      # Main entry point: editor + all inlined JSX
    ├── Quantum Geometry of Magnon Bands.html   # Original standalone deck
    ├── deck-stage.js                    # <deck-stage> web component (auto-scaling canvas)
    ├── tokens.jsx                       # Design tokens: type scale, spacing, palettes, fonts
    ├── primitives.jsx                   # Base React components: Frame, Title, Eq, Footer, …
    ├── figures.jsx                      # SVG figure components: MagnonBands, BerryHeatmap, …
    ├── slides.jsx                       # All 24 slide definitions
    └── tweaks-panel.jsx                 # Tweaks UI (legacy; logic now inlined in editor.html)
```

---

## Architecture

```
editor.html
 ├─ <style>          CSS layout & component styles (no external stylesheet)
 ├─ <script>         deck-stage.js (inlined web component)
 ├─ CDN scripts      React 18, ReactDOM, Babel standalone, KaTeX
 ├─ <script type="text/babel" id="jsx-tokens">      design tokens → window.*
 ├─ <script type="text/babel" id="jsx-primitives">  base components → window.*
 ├─ <script type="text/babel" id="jsx-figures">     SVG figures → window.*
 ├─ <script type="text/babel" id="jsx-slides">      S.cover, S.motivation, … → window.S
 └─ <script type="text/babel">                      EditorApp (React, mounts into #app)
```

**Why inline?** Babel standalone fetches `src=` JSX files via XHR, which is blocked on `file://`. Inlining them as `textContent` lets Babel read from the DOM — no network request needed.

**Live recompile:** `Babel.transform(code, {presets:['env','react']}).code` followed by `(0,eval)(compiled)` (indirect eval runs in global scope, updating `window.S` in place without a page reload).

**Canvas scaling:** A `ResizeObserver` on the canvas container recalculates `scale = min(W/1920, H/1080) × 0.94` and applies it as `transform: scale(…)` on the 1920×1080 slide div.

---

## Slide Authoring

Each slide is a function on the `S` object in `slides.jsx`:

```jsx
S.mySlide = ({ palette, num, total, eqOn, titleStyle, figVariant }) => (
  <Frame palette={palette} label="01 My Slide">
    <Title palette={palette}>Hello world</Title>
    {eqOn && <Eq display tex={String.raw`E = mc^2`} palette={palette} />}
    <Footer palette={palette} num={num} total={total} label="My Slide" />
  </Frame>
);
```

Edit in the **Code** tab, press ⌘↵ — the slide updates live. Add the key to the `SLIDES` array at the top of the Editor App script to show it in the sidebar.

### Available primitives

| Component | Purpose |
|---|---|
| `<Frame>` | Full-bleed slide container (sets bg, padding, font) |
| `<Title>` | Large serif heading |
| `<Subtitle>` | Italic serif subheading |
| `<Eyebrow>` | Small mono label above title |
| `<Body>` | Body text paragraph |
| `<Small>` | Dimmed small text |
| `<Mono>` | Monospace inline span |
| `<Eq>` | KaTeX equation (inline or display) |
| `<Footer>` | Slide footer with number and label |
| `<NumItem>` | Numbered list item with accent number |
| `<Caption>` | Figure caption with optional figure number |
| `<Rule>` | Horizontal or vertical divider |
| `<Placeholder>` | Hatched placeholder box |

### Colour palettes

| Key | Accent | Counter-accent |
|---|---|---|
| `cyan` | `#7dd3fc` sky blue | `#f472b6` pink |
| `amber` | `#f5b454` amber | `#5eead4` teal |
| `violet` | `#a78bfa` violet | `#bef264` lime |

Switch palette from the **Tweaks** panel; all slides re-render instantly.

---

## License

[MIT](https://opensource.org/licenses/MIT) — free to use, adapt, and build upon.
