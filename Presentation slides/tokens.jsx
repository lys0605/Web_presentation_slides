// Design tokens for the Magnon Raman deck.
// Aesthetic: academic / journal-style, dark mode physics.
// All px values are at 1920x1080.

const TYPE_SCALE = {
  hero: 96,
  title: 64,
  subtitle: 44,
  body: 34,
  small: 28,
  micro: 24,
  eqn: 36,
};

const SPACING = {
  paddingTop: 100,
  paddingBottom: 80,
  paddingX: 120,
  titleGap: 52,
  itemGap: 28,
  sectionGap: 72,
};

// Three accent palettes that the user can cycle via Tweaks.
// All keep the same structural roles.
const PALETTES = {
  cyan: {
    name: "Cyan / magenta",
    bg: "#0b0d12",
    bgAlt: "#11151c",
    panel: "#161b24",
    rule: "#2a3140",
    ink: "#ece7d8",      // warm paper
    inkDim: "#b4ad9b",
    inkFaint: "#6a6657",
    accent: "#7dd3fc",   // sky cyan
    accent2: "#f472b6",  // magenta (Berry sign flip)
    accent3: "#facc15",  // amber (highlight)
    pos: "#7dd3fc",
    neg: "#f472b6",
  },
  amber: {
    name: "Amber / teal",
    bg: "#0c0b09",
    bgAlt: "#13110d",
    panel: "#1a1813",
    rule: "#33302a",
    ink: "#f1ebda",
    inkDim: "#b8b09a",
    inkFaint: "#6e6a5a",
    accent: "#f5b454",
    accent2: "#5eead4",
    accent3: "#fda4af",
    pos: "#f5b454",
    neg: "#5eead4",
  },
  violet: {
    name: "Violet / lime",
    bg: "#0a0b14",
    bgAlt: "#10111c",
    panel: "#161826",
    rule: "#2a2c40",
    ink: "#ece8e0",
    inkDim: "#b1adb8",
    inkFaint: "#6a6878",
    accent: "#a78bfa",
    accent2: "#bef264",
    accent3: "#f9a8d4",
    pos: "#a78bfa",
    neg: "#bef264",
  },
};

const FONT_SERIF = `"EB Garamond", "Garamond", "Adobe Garamond Pro", Georgia, serif`;
const FONT_MONO = `"JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace`;
const FONT_SANS = `"Inter Tight", system-ui, -apple-system, sans-serif`;

Object.assign(window, { TYPE_SCALE, SPACING, PALETTES, FONT_SERIF, FONT_MONO, FONT_SANS });
