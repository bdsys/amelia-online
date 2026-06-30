import { ageNow, daysToBday, greeting } from "./playground-date";

describe("ageNow", () => {
  it("returns 0 on birthdate 2022-06-22", () => {
    expect(ageNow(new Date(2022, 5, 22))).toBe(0);
  });

  it("returns 0 on day before first birthday (2023-06-21)", () => {
    expect(ageNow(new Date(2023, 5, 21))).toBe(0);
  });

  it("returns 1 on first birthday (2023-06-22)", () => {
    expect(ageNow(new Date(2023, 5, 22))).toBe(1);
  });

  it("returns 4 on 4th birthday (2026-06-22)", () => {
    expect(ageNow(new Date(2026, 5, 22))).toBe(4);
  });

  it("returns 3 on day before 4th birthday (2026-06-21)", () => {
    expect(ageNow(new Date(2026, 5, 21))).toBe(3);
  });
});

describe("daysToBday", () => {
  it("returns 0 on birthday (2026-06-22)", () => {
    expect(daysToBday(new Date(2026, 5, 22))).toBe(0);
  });

  it("returns 1 on day before birthday (2026-06-21)", () => {
    expect(daysToBday(new Date(2026, 5, 21))).toBe(1);
  });

  it("returns 179 on 2025-12-25 (to 2026-06-22)", () => {
    // Dec 25 → Jun 22: Jan(31)+Feb(28)+Mar(31)+Apr(30)+May(31)+22 = 179
    expect(daysToBday(new Date(2025, 11, 25))).toBe(179);
  });

  it("returns 364 on day after birthday (2026-06-23)", () => {
    expect(daysToBday(new Date(2026, 5, 23))).toBe(364);
  });
});

describe("greeting", () => {
  it("hour 6 → Good morning 🌅", () => {
    expect(greeting(new Date(2026, 0, 1, 6))).toEqual({ text: "Good morning", emoji: "🌅" });
  });

  it("hour 11 → Good morning 🌅", () => {
    expect(greeting(new Date(2026, 0, 1, 11))).toEqual({ text: "Good morning", emoji: "🌅" });
  });

  it("hour 12 → Good afternoon ☀️", () => {
    expect(greeting(new Date(2026, 0, 1, 12))).toEqual({ text: "Good afternoon", emoji: "☀️" });
  });

  it("hour 16 → Good afternoon ☀️", () => {
    expect(greeting(new Date(2026, 0, 1, 16))).toEqual({ text: "Good afternoon", emoji: "☀️" });
  });

  it("hour 17 → Good evening 🌇", () => {
    expect(greeting(new Date(2026, 0, 1, 17))).toEqual({ text: "Good evening", emoji: "🌇" });
  });

  it("hour 19 → Good evening 🌇", () => {
    expect(greeting(new Date(2026, 0, 1, 19))).toEqual({ text: "Good evening", emoji: "🌇" });
  });

  it("hour 20 → Good night 🌙", () => {
    expect(greeting(new Date(2026, 0, 1, 20))).toEqual({ text: "Good night", emoji: "🌙" });
  });

  it("hour 23 → Good night 🌙", () => {
    expect(greeting(new Date(2026, 0, 1, 23))).toEqual({ text: "Good night", emoji: "🌙" });
  });
});
