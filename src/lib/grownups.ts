import "server-only";
import data from "../../content/grownups.json";

export interface WishlistLink {
  label: string;
  url: string;
}

export interface Wishlist {
  title: string;
  emoji: string;
  lists: WishlistLink[];
}

export interface PartyData {
  who: string;
  age: number;
  date: string;
  time: string;
  place: string;
  address: string;
  note: string;
  rsvpEmail: string;
}

/** Strip www. and return hostname, e.g. "amazon.com". Returns "" on invalid URL. */
export function hostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

export function getWishlist(which: "christmas" | "birthday"): Wishlist {
  return data.wishlists[which];
}

export function getParty(): PartyData {
  return data.party;
}
