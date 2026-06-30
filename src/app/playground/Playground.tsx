"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { greeting, ageNow, daysToBday } from "@/lib/playground-date";
import { type ThemeKey, THEME_ORDER, THEMES, themeToCssVars } from "@/lib/playground-theme";
import Hub from "./screens/Hub";
import Pop from "./screens/Pop";
import Bubbles from "./screens/Bubbles";
import Stickers from "./screens/Stickers";
import Paint from "./screens/Paint";
import DressUp from "./screens/DressUp";
import Coloring from "./screens/Coloring";
import Match from "./screens/Match";
import Abc from "./screens/Abc";

// ─── Types ───────────────────────────────────────────────────────────────────
export type Screen =
  | "hub"
  | "pop"
  | "bubbles"
  | "stickers"
  | "paint"
  | "dress"
  | "color"
  | "memory"
  | "abc";
export type Particle = {
  id: number;
  x: number;
  y: number;
  tx: number;
  ty: number;
  size: number;
  rot: string;
  e: string;
};
export type Bubble = {
  id: number;
  x: number;
  size: number;
  face: number;
  dur: string;
  sway: number;
  color: string;
  e: string;
};
export type Sticker = { id: number; e: string; x: number; y: number };
export type MemCard = {
  id: number;
  e: string;
  flipped: boolean;
  matched: boolean;
};

// ─── Static data ─────────────────────────────────────────────────────────────
const EMOJIS = [
  "🐶","🐾","⭐","🌈","🚒","🚓","🦴","🎈","💛","🐕","🚁","🐩","💙","✨","🐾",
];
export const BUBBLE_FACES = ["🐶","🐾","⭐","🐕","🦴","🌈","🚒"];
export const CARDS_DATA = [
  { id: "pop",     icon: "🎉", label: "Pop!",     tilt: "-2deg", delay: "0s" },
  { id: "bubbles", icon: "🫧", label: "Bubbles",  tilt: "2deg",  delay: ".15s" },
  { id: "stickers",icon: "🐶", label: "Stickers", tilt: "-2deg", delay: ".3s" },
  { id: "paint",   icon: "🎨", label: "Paint",    tilt: "2deg",  delay: ".45s" },
  { id: "dress",   icon: "🎩", label: "Dress Up", tilt: "2deg",  delay: ".6s" },
  { id: "color",   icon: "🖍️", label: "Coloring", tilt: "-2deg", delay: ".75s" },
  { id: "memory",  icon: "🃏", label: "Match",    tilt: "2deg",  delay: ".9s" },
  { id: "abc",     icon: "🔤", label: "ABCs",     tilt: "-2deg", delay: "1.05s" },
] as const;
export const CARD_BG = [
  "var(--pg-card1)",
  "var(--pg-card2)",
  "var(--pg-card3)",
  "var(--pg-card4)",
];
export const CARD_SHADOW = [
  "var(--pg-shadow1)",
  "var(--pg-shadow2)",
  "var(--pg-shadow3)",
  "var(--pg-shadow4)",
];
export const STICKER_PALETTE = [
  "🐶","🐾","🚒","🚓","⭐","🌈","🦴","🚁","🐩","🎈","🏠","🌳",
];
export const PAINT_COLORS = [
  "#ff5bb0","#ff7a3d","#ffd23f","#37d67a","#2bb3ff","#7b6bff","#ff4d4d","#1a1a1a",
];
export const DRESS_ACCESSORIES = [
  { k: "crown",   e: "👑", top: "2%",   left: "50%", size: 72 },
  { k: "hat",     e: "🎩", top: "-6%",  left: "50%", size: 80 },
  { k: "bow",     e: "🎀", top: "6%",   left: "26%", size: 54 },
  { k: "glasses", e: "🕶️", top: "34%",  left: "50%", size: 66 },
  { k: "flower",  e: "🌸", top: "28%",  left: "76%", size: 50 },
  { k: "scarf",   e: "🧣", top: "64%",  left: "50%", size: 74 },
];
export const STAGE_BACKGROUNDS = [
  "#ffe3ef","#dff3ff","#e7ffe0","#f0e8ff","#fff3d6",
];
export const MEMORY_EMOJI = ["🐶","🐾","🚒","🦄","⭐","🌈"];
export const ABC_DATA = [
  { l: "A", w: "Apple",     e: "🍎" }, { l: "B", w: "Ball",      e: "⚽" },
  { l: "C", w: "Cat",       e: "🐱" }, { l: "D", w: "Dog",       e: "🐶" },
  { l: "E", w: "Egg",       e: "🥚" }, { l: "F", w: "Fish",      e: "🐟" },
  { l: "G", w: "Grapes",    e: "🍇" }, { l: "H", w: "Hat",       e: "🎩" },
  { l: "I", w: "Ice cream", e: "🍦" }, { l: "J", w: "Juice",     e: "🧃" },
  { l: "K", w: "Kite",      e: "🪁" }, { l: "L", w: "Lion",      e: "🦁" },
  { l: "M", w: "Moon",      e: "🌙" }, { l: "N", w: "Nest",      e: "🪺" },
  { l: "O", w: "Orange",    e: "🍊" }, { l: "P", w: "Puppy",     e: "🐶" },
  { l: "Q", w: "Queen",     e: "👑" }, { l: "R", w: "Rainbow",   e: "🌈" },
  { l: "S", w: "Sun",       e: "☀️" }, { l: "T", w: "Truck",     e: "🚒" },
  { l: "U", w: "Unicorn",   e: "🦄" }, { l: "V", w: "Van",       e: "🚐" },
  { l: "W", w: "Whale",     e: "🐳" }, { l: "X", w: "Xylophone", e: "🎵" },
  { l: "Y", w: "Yo-yo",     e: "🪀" }, { l: "Z", w: "Zebra",     e: "🦓" },
];
export const COLORING_PAGES = [
  {
    name: "Flower",
    viewBox: "0 0 300 280",
    regions: [
      { id: "stem",  el: "rect",    a: { x: 145, y: 150, width: 12, height: 120, rx: 6 } },
      { id: "leafL", el: "ellipse", a: { cx: 118, cy: 214, rx: 30, ry: 15 } },
      { id: "leafR", el: "ellipse", a: { cx: 184, cy: 192, rx: 30, ry: 15 } },
      { id: "p0",    el: "circle",  a: { cx: 198, cy: 110, r: 31 } },
      { id: "p1",    el: "circle",  a: { cx: 174, cy: 152, r: 31 } },
      { id: "p2",    el: "circle",  a: { cx: 126, cy: 152, r: 31 } },
      { id: "p3",    el: "circle",  a: { cx: 102, cy: 110, r: 31 } },
      { id: "p4",    el: "circle",  a: { cx: 126, cy: 68,  r: 31 } },
      { id: "p5",    el: "circle",  a: { cx: 174, cy: 68,  r: 31 } },
      { id: "core",  el: "circle",  a: { cx: 150, cy: 110, r: 33 } },
    ],
  },
  {
    name: "Butterfly",
    viewBox: "0 0 300 280",
    regions: [
      { id: "wUL",  el: "ellipse", a: { cx: 108, cy: 118, rx: 48, ry: 40 } },
      { id: "wUR",  el: "ellipse", a: { cx: 192, cy: 118, rx: 48, ry: 40 } },
      { id: "wLL",  el: "ellipse", a: { cx: 116, cy: 192, rx: 40, ry: 32 } },
      { id: "wLR",  el: "ellipse", a: { cx: 184, cy: 192, rx: 40, ry: 32 } },
      { id: "body", el: "ellipse", a: { cx: 150, cy: 152, rx: 11, ry: 62 } },
    ],
  },
  {
    name: "Fish",
    viewBox: "0 0 300 280",
    regions: [
      { id: "tail", el: "polygon", a: { points: "208,150 272,108 272,192" } },
      { id: "body", el: "ellipse", a: { cx: 148, cy: 150, rx: 82, ry: 56 } },
      { id: "fin",  el: "polygon", a: { points: "140,98 172,58 192,104" } },
      { id: "eye",  el: "circle",  a: { cx: 104, cy: 134, r: 11 } },
    ],
  },
];

// ─── Memory helper ────────────────────────────────────────────────────────────
function makeMemCards(): MemCard[] {
  const pairs = [...MEMORY_EMOJI, ...MEMORY_EMOJI];
  // Fisher-Yates shuffle
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
  }
  return pairs.map((e, i) => ({ id: i, e, flipped: false, matched: false }));
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function Playground() {
  // Screen navigation
  const [screen, setScreen] = useState<Screen>("hub");

  // Particles (Pop! + win effects)
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleIdRef = useRef(0);

  // Bubbles
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const bubbleIdRef = useRef(0);
  const bubbleTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Stickers
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const stickerIdRef = useRef(0);

  // Paint
  const [paintColor, setPaintColor] = useState(PAINT_COLORS[0]);

  // Dress Up
  const [wearing, setWearing] = useState<Record<string, boolean>>({});
  const [stageBg, setStageBg] = useState(STAGE_BACKGROUNDS[0]);

  // Coloring
  const [colorPage, setColorPage] = useState(0);
  const [colorFills, setColorFills] = useState<Record<string, string>>({});
  const [colorBrush, setColorBrush] = useState(PAINT_COLORS[0]);

  // Memory match
  const [memCards, setMemCards] = useState<MemCard[]>(() => makeMemCards());
  const memLockedRef = useRef(false);

  // ABC
  const [abcActive, setAbcActive] = useState<number | null>(null);

  // Theme
  const [theme, setTheme] = useState<ThemeKey>("bright"); // default for SSR

  // Read persisted theme after mount — avoids hydration mismatch.
  useEffect(() => {
    try {
      const s = localStorage.getItem("amelia-theme");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (s === "bright" || s === "pastel" || s === "dreamy") setTheme(s as ThemeKey);
    } catch {}
  }, []);

  const cycleTheme = useCallback(() => {
    setTheme((t) => {
      const next = THEME_ORDER[(THEME_ORDER.indexOf(t) + 1) % THEME_ORDER.length];
      try { localStorage.setItem("amelia-theme", next); } catch {}
      return next;
    });
  }, []);

  // Greeting / age / countdown — cheap to compute, just do it in render
  const greetingData = useMemo(() => greeting(), []);
  const age = useMemo(() => ageNow(), []);
  const daysLeft = useMemo(() => daysToBday(), []);

  // ── Particle spawn ─────────────────────────────────────────────────────────
  const spawn = useCallback((x: number, y: number, n = 14) => {
    const newParticles: Particle[] = Array.from({ length: n }, (_, i) => {
      const angle = (i / n) * Math.PI * 2 + Math.random() * 0.5;
      const dist = 70 + Math.random() * 150;
      return {
        id: ++particleIdRef.current,
        x,
        y,
        tx: Math.cos(angle) * dist,
        ty: Math.sin(angle) * dist,
        size: 30 + Math.random() * 36,
        rot: `${Math.random() * 120 - 60}deg`,
        e: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      };
    });
    setParticles((p) => [...p, ...newParticles]);
    const ids = new Set(newParticles.map((p) => p.id));
    setTimeout(() => {
      setParticles((p) => p.filter((pt) => !ids.has(pt.id)));
    }, 1000);
  }, []);

  // ── Bubbles tick ───────────────────────────────────────────────────────────
  const spawnBubble = useCallback(() => {
    setBubbles((prev) => {
      if (prev.length >= 9) return prev;
      const size = 78 + Math.round(Math.random() * 70);
      const dur = 6 + Math.random() * 4;
      const sway = Math.round(Math.random() * 80 - 40);
      const x = 6 + Math.round(Math.random() * 82);
      const faceIdx = Math.floor(Math.random() * BUBBLE_FACES.length);
      const colorIdx = Math.floor(Math.random() * 4);
      const id = ++bubbleIdRef.current;
      const bubble: Bubble = {
        id,
        x,
        size,
        face: faceIdx,
        dur: `${dur.toFixed(2)}s`,
        sway,
        color: CARD_BG[colorIdx],
        e: BUBBLE_FACES[faceIdx],
      };
      const removeDelay = dur * 1000 + 200;
      setTimeout(() => {
        setBubbles((b) => b.filter((bb) => bb.id !== id));
      }, removeDelay);
      return [...prev, bubble];
    });
  }, []);

  // ── Screen navigation ─────────────────────────────────────────────────────
  const goTo = useCallback(
    (s: Screen) => {
      setScreen(s);
      if (s === "bubbles") {
        spawnBubble();
        bubbleTimerRef.current = setInterval(spawnBubble, 650);
      } else {
        if (bubbleTimerRef.current) {
          clearInterval(bubbleTimerRef.current);
          bubbleTimerRef.current = null;
        }
        setBubbles([]);
      }
      if (s === "memory") {
        setMemCards(makeMemCards());
        memLockedRef.current = false;
      }
      setAbcActive(null);
    },
    [spawnBubble]
  );

  const goHome = useCallback(() => {
    if (bubbleTimerRef.current) {
      clearInterval(bubbleTimerRef.current);
      bubbleTimerRef.current = null;
    }
    setBubbles([]);
    setScreen("hub");
  }, []);

  // Clean up bubble timer on unmount
  useEffect(() => {
    return () => {
      if (bubbleTimerRef.current) clearInterval(bubbleTimerRef.current);
    };
  }, []);

  // ── Pop handlers ───────────────────────────────────────────────────────────
  const handlePopTap = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      spawn(e.clientX, e.clientY);
    },
    [spawn]
  );

  // ── Sticker handlers ───────────────────────────────────────────────────────
  const handleStickerAdd = useCallback((emoji: string) => {
    const id = ++stickerIdRef.current;
    setStickers((s) => [
      ...s,
      { id, e: emoji, x: 40 + Math.random() * 20, y: 40 + Math.random() * 20 },
    ]);
  }, []);

  const handleStickerMove = useCallback(
    (id: number, x: number, y: number) => {
      setStickers((s) =>
        s.map((st) => (st.id === id ? { ...st, x, y } : st))
      );
    },
    []
  );

  const handleStickerClear = useCallback(() => setStickers([]), []);

  // ── Dress Up handlers ──────────────────────────────────────────────────────
  const handleDressToggle = useCallback((k: string) => {
    setWearing((w) => ({ ...w, [k]: !w[k] }));
  }, []);

  const handleDressReset = useCallback(() => {
    setWearing({});
    setStageBg(STAGE_BACKGROUNDS[0]);
  }, []);

  // ── Coloring handlers ──────────────────────────────────────────────────────
  const handleColorTap = useCallback(
    (regionId: string) => {
      const key = `pg${colorPage}-${regionId}`;
      setColorFills((f) => ({ ...f, [key]: colorBrush }));
    },
    [colorPage, colorBrush]
  );

  const handleColorReset = useCallback(() => {
    setColorFills((f) => {
      const next = { ...f };
      const prefix = `pg${colorPage}-`;
      for (const k of Object.keys(next)) {
        if (k.startsWith(prefix)) delete next[k];
      }
      return next;
    });
  }, [colorPage]);

  // ── Memory handlers ────────────────────────────────────────────────────────
  const handleMemFlip = useCallback(
    (idx: number) => {
      if (memLockedRef.current) return;
      setMemCards((cards) => {
        const card = cards[idx];
        if (!card || card.flipped || card.matched) return cards;
        const updated = cards.map((c, i) =>
          i === idx ? { ...c, flipped: true } : c
        );
        const nowFlipped = updated
          .map((c, i) => (c.flipped && !c.matched ? i : -1))
          .filter((i) => i !== -1);

        if (nowFlipped.length === 2) {
          memLockedRef.current = true;
          const [a, b] = nowFlipped;
          if (updated[a].e === updated[b].e) {
            // Match
            setTimeout(() => {
              let didWin = false;
              setMemCards((c) => {
                const next = c.map((card, i) =>
                  i === a || i === b
                    ? { ...card, matched: true, flipped: false }
                    : card
                );
                didWin = next.every((c) => c.matched);
                memLockedRef.current = false;
                return next;
              });
              if (didWin) {
                spawn(window.innerWidth / 2, window.innerHeight / 2, 26);
              }
            }, 380);
          } else {
            // No match — flip back
            setTimeout(() => {
              setMemCards((c) =>
                c.map((card, i) =>
                  i === a || i === b ? { ...card, flipped: false } : card
                )
              );
              memLockedRef.current = false;
            }, 850);
          }
        }
        return updated;
      });
    },
    [spawn]
  );

  const handleMemReset = useCallback(() => {
    setMemCards(makeMemCards());
    memLockedRef.current = false;
  }, []);

  // ── ABC handlers ───────────────────────────────────────────────────────────
  const handleAbcTap = useCallback((i: number) => {
    setAbcActive((prev) => (prev === i ? null : i));
  }, []);

  // ─── Render ────────────────────────────────────────────────────────────────
  const commonProps = {
    onHome: goHome,
  };

  return (
    <div
      style={{
        minHeight: "100dvh",
        background: "var(--pg-bg)",
        fontFamily: "var(--font-display)",
        position: "relative",
        overflow: "hidden",
        ...themeToCssVars(THEMES[theme]),
      }}
    >
      {screen === "hub" && (
        <Hub
          greeting={greetingData}
          age={age}
          daysLeft={daysLeft}
          cards={CARDS_DATA}
          cardBg={CARD_BG}
          cardShadow={CARD_SHADOW}
          onGoTo={goTo}
          theme={theme}
          onCycleTheme={cycleTheme}
        />
      )}
      {screen === "pop" && (
        <Pop
          {...commonProps}
          onTap={handlePopTap}
        />
      )}
      {screen === "bubbles" && (
        <Bubbles
          {...commonProps}
          bubbles={bubbles}
        />
      )}
      {screen === "stickers" && (
        <Stickers
          {...commonProps}
          stickers={stickers}
          palette={STICKER_PALETTE}
          onAdd={handleStickerAdd}
          onMove={handleStickerMove}
          onClear={handleStickerClear}
        />
      )}
      {screen === "paint" && (
        <Paint
          {...commonProps}
          color={paintColor}
          colors={PAINT_COLORS}
          onColorChange={setPaintColor}
        />
      )}
      {screen === "dress" && (
        <DressUp
          {...commonProps}
          wearing={wearing}
          stageBg={stageBg}
          accessories={DRESS_ACCESSORIES}
          stages={STAGE_BACKGROUNDS}
          onToggle={handleDressToggle}
          onStage={setStageBg}
          onReset={handleDressReset}
        />
      )}
      {screen === "color" && (
        <Coloring
          {...commonProps}
          pages={COLORING_PAGES}
          page={colorPage}
          fills={colorFills}
          brush={colorBrush}
          colors={PAINT_COLORS}
          onPageChange={setColorPage}
          onTap={handleColorTap}
          onBrush={setColorBrush}
          onReset={handleColorReset}
        />
      )}
      {screen === "memory" && (
        <Match
          {...commonProps}
          cards={memCards}
          onFlip={handleMemFlip}
          onReset={handleMemReset}
        />
      )}
      {screen === "abc" && (
        <Abc
          {...commonProps}
          data={ABC_DATA}
          active={abcActive}
          onTap={handleAbcTap}
        />
      )}

      {/* Global particle layer */}
      {particles.map((p) => (
        <div
          key={p.id}
          aria-hidden="true"
          style={{
            position: "fixed",
            left: p.x,
            top: p.y,
            fontSize: p.size,
            pointerEvents: "none",
            zIndex: 9999,
            animation: "pg-burst 1s ease-out forwards",
            ["--tx" as string]: `${p.tx}px`,
            ["--ty" as string]: `${p.ty}px`,
            ["--rot" as string]: p.rot,
          }}
        >
          {p.e}
        </div>
      ))}
    </div>
  );
}
