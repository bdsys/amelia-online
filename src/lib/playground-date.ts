const BIRTH = new Date(2022, 5, 22); // June 22 2022

export function ageNow(now: Date = new Date()): number {
  let age = now.getFullYear() - BIRTH.getFullYear();
  const hadBirthday =
    now.getMonth() > BIRTH.getMonth() ||
    (now.getMonth() === BIRTH.getMonth() && now.getDate() >= BIRTH.getDate());
  if (!hadBirthday) age--;
  return age;
}

export function daysToBday(now: Date = new Date()): number {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let next = new Date(today.getFullYear(), 5, 22); // June 22 this year
  if (next < today) next = new Date(today.getFullYear() + 1, 5, 22);
  return Math.round((next.getTime() - today.getTime()) / 86_400_000);
}

export type Greeting = { text: string; emoji: string };

export function greeting(now: Date = new Date()): Greeting {
  const h = now.getHours();
  if (h < 12) return { text: "Good morning",   emoji: "🌅" };
  if (h < 17) return { text: "Good afternoon", emoji: "☀️" };
  if (h < 20) return { text: "Good evening",   emoji: "🌇" };
  return        { text: "Good night",     emoji: "🌙" };
}
