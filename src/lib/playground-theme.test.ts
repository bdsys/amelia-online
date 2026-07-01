import {
  THEME_ORDER,
  THEMES,
  themeToCssVars,
  type ThemeKey,
} from "./playground-theme";

describe("THEME_ORDER", () => {
  it("has exactly 3 entries", () => {
    expect(THEME_ORDER).toHaveLength(3);
  });

  it("contains bright, pastel, dreamy in that order", () => {
    expect(THEME_ORDER).toEqual(["bright", "pastel", "dreamy"]);
  });
});

describe("THEMES", () => {
  it("has a key for every entry in THEME_ORDER", () => {
    for (const key of THEME_ORDER) {
      expect(THEMES).toHaveProperty(key);
    }
  });

  it.each(THEME_ORDER)('%s palette has cards array of length 4', (key) => {
    expect(THEMES[key as ThemeKey].cards).toHaveLength(4);
  });

  it.each(THEME_ORDER)('%s palette has shadows array of length 4', (key) => {
    expect(THEMES[key as ThemeKey].shadows).toHaveLength(4);
  });
});

describe("themeToCssVars", () => {
  it("maps bright cards to --pg-card1 through --pg-card4", () => {
    const vars = themeToCssVars(THEMES.bright);
    const { cards } = THEMES.bright;
    expect(vars["--pg-card1"]).toBe(cards[0]);
    expect(vars["--pg-card2"]).toBe(cards[1]);
    expect(vars["--pg-card3"]).toBe(cards[2]);
    expect(vars["--pg-card4"]).toBe(cards[3]);
  });

  it("maps bright shadows to --pg-shadow1 through --pg-shadow4", () => {
    const vars = themeToCssVars(THEMES.bright);
    const { shadows } = THEMES.bright;
    expect(vars["--pg-shadow1"]).toBe(shadows[0]);
    expect(vars["--pg-shadow2"]).toBe(shadows[1]);
    expect(vars["--pg-shadow3"]).toBe(shadows[2]);
    expect(vars["--pg-shadow4"]).toBe(shadows[3]);
  });

  it("maps pastel cards correctly", () => {
    const vars = themeToCssVars(THEMES.pastel);
    const { cards } = THEMES.pastel;
    expect(vars["--pg-card1"]).toBe(cards[0]);
    expect(vars["--pg-card4"]).toBe(cards[3]);
  });

  it("maps dreamy shadows correctly", () => {
    const vars = themeToCssVars(THEMES.dreamy);
    const { shadows } = THEMES.dreamy;
    expect(vars["--pg-shadow1"]).toBe(shadows[0]);
    expect(vars["--pg-shadow4"]).toBe(shadows[3]);
  });

  it("sets --pg-bg from palette bg", () => {
    const vars = themeToCssVars(THEMES.pastel);
    expect(vars["--pg-bg"]).toBe(THEMES.pastel.bg);
  });

  it("sets --pg-ink from palette ink", () => {
    const vars = themeToCssVars(THEMES.dreamy);
    expect(vars["--pg-ink"]).toBe(THEMES.dreamy.ink);
  });

  it("sets --pg-play from palette play for each theme", () => {
    for (const key of THEME_ORDER) {
      const vars = themeToCssVars(THEMES[key as ThemeKey]);
      expect(vars["--pg-play"]).toBe(THEMES[key as ThemeKey].play);
    }
  });
});

describe("cycle order", () => {
  it("wrap-around: after dreamy comes bright", () => {
    const idx = THEME_ORDER.indexOf("dreamy");
    const next = THEME_ORDER[(idx + 1) % THEME_ORDER.length];
    expect(next).toBe("bright");
  });

  it("bright → pastel", () => {
    const idx = THEME_ORDER.indexOf("bright");
    expect(THEME_ORDER[(idx + 1) % THEME_ORDER.length]).toBe("pastel");
  });

  it("pastel → dreamy", () => {
    const idx = THEME_ORDER.indexOf("pastel");
    expect(THEME_ORDER[(idx + 1) % THEME_ORDER.length]).toBe("dreamy");
  });
});
