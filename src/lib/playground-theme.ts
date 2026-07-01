export type ThemeKey = "bright" | "pastel" | "dreamy";

export const THEME_ORDER: ThemeKey[] = ["bright", "pastel", "dreamy"];

export interface ThemePalette {
  bg: string;
  ink: string;
  play: string;
  cards: [string, string, string, string];
  shadows: [string, string, string, string];
}

export const THEMES: Record<ThemeKey, ThemePalette> = {
  bright: {
    bg: "radial-gradient(120% 120% at 50% 0%,#bfeaff 0%,#7fd0ff 60%,#5cc0f5 100%)",
    ink: "#22323d",
    play: "rgba(255,255,255,.16)",
    cards:   ["#ff6b6b","#ffb02e","#19c3b2","#7b6bff"],
    shadows: ["#d94f4f","#d98a1f","#0f9d8f","#5a4cd6"],
  },
  pastel: {
    bg: "radial-gradient(120% 120% at 50% 0%,#fff7ef 0%,#ffe9d6 60%,#ffd9c2 100%)",
    ink: "#6a5560",
    play: "rgba(255,255,255,.35)",
    cards:   ["#ff9eb5","#ffc97a","#7ed4b6","#b7a4ee"],
    shadows: ["#e87e97","#e0a953","#5cb898","#9685cf"],
  },
  dreamy: {
    bg: "linear-gradient(165deg,#c9b3ff 0%,#a9c6ff 55%,#9fd6ff 100%)",
    ink: "#3a3160",
    play: "rgba(255,255,255,.18)",
    cards:   ["#ff8fc7","#ffcf86","#79e3d4","#9d8bff"],
    shadows: ["#e06aa6","#e0ab5b","#4fc0ae","#7a66e0"],
  },
};

/** Build the inline-style CSS var overrides for the Playground root div */
export function themeToCssVars(t: ThemePalette): Record<string, string> {
  return {
    "--pg-bg":      t.bg,
    "--pg-ink":     t.ink,
    "--pg-play":    t.play,
    "--pg-card1":   t.cards[0],
    "--pg-card2":   t.cards[1],
    "--pg-card3":   t.cards[2],
    "--pg-card4":   t.cards[3],
    "--pg-shadow1": t.shadows[0],
    "--pg-shadow2": t.shadows[1],
    "--pg-shadow3": t.shadows[2],
    "--pg-shadow4": t.shadows[3],
  };
}
