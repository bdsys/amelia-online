import { type ThemePalette } from "./playground-theme";

export type TransitionKind =
  | "pop" | "bubbles" | "stickers" | "paint" | "dress"
  | "color" | "memory" | "abc" | "home";

interface PieceStyle {
  position: "absolute";
  fontSize: string;
  lineHeight: number;
  pointerEvents: "none";
  filter: string;
  left?: string;
  bottom?: string;
  top?: string;
  animation: string;
  "--sway"?: string;
  "--rot"?: string;
  "--tx"?: string;
  "--ty"?: string;
}

export interface TransitionPiece {
  e: string;
  st: PieceStyle & Record<string, string | number>;
}

export interface TransitionData {
  bg: string;
  ox: string;
  oy: string;
  emoji: string;
  centerAnim: string;
  pieces: TransitionPiece[];
}

type PieceType = "burst" | "up" | "down" | "twinkle";
type CenterType = "pop" | "spin" | "flip" | "zoom";

interface KindConf {
  piece: PieceType;
  center: CenterType;
  emoji: string;
  set: string[];
  tint: number;
  conic?: boolean;
  rainbow?: boolean;
  home?: boolean;
}

const CONF: Record<TransitionKind, KindConf> = {
  pop:     { piece:"burst",   center:"pop",  emoji:"🎉", set:["🎉","✨","🎊","⭐","🎈"], tint:0 },
  bubbles: { piece:"up",      center:"pop",  emoji:"🫧", set:["🫧","⭐","🐶","🐾"],       tint:2 },
  stickers:{ piece:"down",    center:"pop",  emoji:"🐶", set:["🐶","🐾","🚒","🚓","🦴"], tint:3 },
  paint:   { piece:"burst",   center:"spin", emoji:"🎨", set:["🎨","🖌️","🌈","💜","💙"], tint:1, conic:true },
  dress:   { piece:"twinkle", center:"pop",  emoji:"🎩", set:["🎩","👑","✨","🎀","🦄"], tint:3 },
  color:   { piece:"up",      center:"pop",  emoji:"🖍️", set:["🖍️","🌈","✨"],            tint:0, rainbow:true },
  memory:  { piece:"burst",   center:"flip", emoji:"🃏", set:["🃏","❓","🐾","⭐"],       tint:2 },
  abc:     { piece:"down",    center:"pop",  emoji:"🔤", set:["🔤","✨","⭐","💫"],       tint:0 },
  home:    { piece:"twinkle", center:"zoom", emoji:"🏠", set:["🏠","💫","✨","⭐","🐾"], tint:0, home:true },
};

const CENTER_ANIM: Record<CenterType, string> = {
  pop:  "pg-tr-cpop",
  spin: "pg-tr-cspin",
  flip: "pg-tr-cflip",
  zoom: "pg-tr-czoom",
};

export function buildTransition(palette: ThemePalette, kind: TransitionKind): TransitionData {
  const conf = CONF[kind] ?? CONF.pop;

  let bg = palette.cards[conf.tint] ?? palette.cards[0];
  if (conf.conic)   bg = "conic-gradient(from 0deg,#ff6b6b,#ffb02e,#19c3b2,#2bb3ff,#7b6bff,#ff6b6b)";
  if (conf.rainbow) bg = "linear-gradient(180deg,#ff6b6b,#ffb02e,#19c3b2,#2bb3ff,#7b6bff)";

  const ox = conf.home ? "58px" : "50%";
  const oy = conf.home ? "58px" : "50%";

  const N = conf.piece === "twinkle" ? 14 : 16;
  const pieces: TransitionPiece[] = [];

  for (let i = 0; i < N; i++) {
    const e = conf.set[i % conf.set.length];
    const size = 28 + Math.round(Math.random() * 36);
    const dur = (0.7 + Math.random() * 0.35).toFixed(2);
    const delay = (Math.random() * 0.16).toFixed(2);

    const st: PieceStyle & Record<string, string | number> = {
      position: "absolute",
      fontSize: `${size}px`,
      lineHeight: 1,
      pointerEvents: "none",
      filter: "drop-shadow(0 4px 5px rgba(0,0,0,.18))",
      animation: "", // filled below
    };

    if (conf.piece === "up") {
      st.left = `${4 + Math.random() * 92}%`;
      st.bottom = "-70px";
      st["--sway"] = `${Math.round(Math.random() * 80 - 40)}px`;
      st.animation = `pg-tr-up ${dur}s ease-in ${delay}s forwards`;
    } else if (conf.piece === "down") {
      st.left = `${4 + Math.random() * 92}%`;
      st.top = "-70px";
      st["--sway"] = `${Math.round(Math.random() * 80 - 40)}px`;
      st["--rot"] = `${Math.round(Math.random() * 240 - 120)}deg`;
      st.animation = `pg-tr-down ${dur}s ease-in ${delay}s forwards`;
    } else if (conf.piece === "twinkle") {
      const ang = (Math.PI * 2 * i) / N;
      st.left = `${50 + Math.cos(ang) * (20 + Math.random() * 9)}%`;
      st.top  = `${50 + Math.sin(ang) * (26 + Math.random() * 9)}%`;
      st.animation = `pg-tr-twinkle ${(0.7 + Math.random() * 0.3).toFixed(2)}s ease-in-out ${delay}s forwards`;
    } else {
      // burst
      const ang = (Math.PI * 2 * i) / N + Math.random() * 0.5;
      const dist = 120 + Math.random() * 220;
      st.left = ox;
      st.top  = oy;
      st["--tx"] = `${Math.round(Math.cos(ang) * dist)}px`;
      st["--ty"] = `${Math.round(Math.sin(ang) * dist)}px`;
      st["--rot"] = `${Math.round(Math.random() * 200 - 100)}deg`;
      st.animation = `pg-tr-burst ${dur}s ease-out ${delay}s forwards`;
    }
    pieces.push({ e, st });
  }

  return {
    bg,
    ox,
    oy,
    emoji: conf.emoji,
    centerAnim: `${CENTER_ANIM[conf.center]} .95s ease-in-out forwards`,
    pieces,
  };
}
