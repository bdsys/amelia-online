import { describe, it, expect } from "vitest";
import { buildTransition, type TransitionKind } from "./playground-transition";
import { THEMES } from "./playground-theme";

describe("buildTransition", () => {
  const palette = THEMES.bright;

  it.each([
    ["pop",      "🎉",  "pg-tr-cpop"],
    ["bubbles",  "🫧",  "pg-tr-cpop"],
    ["stickers", "🐶",  "pg-tr-cpop"],
    ["paint",    "🎨",  "pg-tr-cspin"],
    ["dress",    "🎩",  "pg-tr-cpop"],
    ["color",    "🖍️",  "pg-tr-cpop"],
    ["memory",   "🃏",  "pg-tr-cflip"],
    ["abc",      "🔤",  "pg-tr-cpop"],
    ["home",     "🏠",  "pg-tr-czoom"],
  ] as [TransitionKind, string, string][])(
    "%s → correct emoji and centerAnim prefix",
    (kind, emoji, animPrefix) => {
      const result = buildTransition(palette, kind);
      expect(result.emoji).toBe(emoji);
      expect(result.centerAnim).toContain(animPrefix);
    }
  );

  it("home kind sets ox and oy to 58px", () => {
    const result = buildTransition(palette, "home");
    expect(result.ox).toBe("58px");
    expect(result.oy).toBe("58px");
    expect(result.centerAnim).toContain("pg-tr-czoom");
  });

  it("all non-home kinds set ox and oy to 50%", () => {
    const kinds: TransitionKind[] = [
      "pop", "bubbles", "stickers", "paint", "dress", "color", "memory", "abc",
    ];
    for (const kind of kinds) {
      const result = buildTransition(palette, kind);
      expect(result.ox).toBe("50%");
      expect(result.oy).toBe("50%");
    }
  });

  it("paint returns a bg starting with conic-gradient", () => {
    const result = buildTransition(palette, "paint");
    expect(result.bg).toMatch(/^conic-gradient/);
  });

  it("color returns a bg starting with linear-gradient", () => {
    const result = buildTransition(palette, "color");
    expect(result.bg).toMatch(/^linear-gradient/);
  });

  it("dress (twinkle piece type) produces 14 pieces", () => {
    const result = buildTransition(palette, "dress");
    expect(result.pieces).toHaveLength(14);
  });

  it("pop (burst piece type) produces 16 pieces", () => {
    const result = buildTransition(palette, "pop");
    expect(result.pieces).toHaveLength(16);
  });

  it("every piece has animation set and pointerEvents === 'none'", () => {
    const kinds: TransitionKind[] = [
      "pop", "bubbles", "stickers", "paint", "dress", "color", "memory", "abc", "home",
    ];
    for (const kind of kinds) {
      const result = buildTransition(palette, kind);
      for (const piece of result.pieces) {
        expect(piece.st.animation).toBeTruthy();
        expect(piece.st.pointerEvents).toBe("none");
      }
    }
  });
});
