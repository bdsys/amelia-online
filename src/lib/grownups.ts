import "server-only";
import data from "../../content/grownups.json";

export interface WishlistItem {
  name: string;
  note: string;
  url: string;
}

export interface Wishlist {
  title: string;
  emoji: string;
  items: WishlistItem[];
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

export function getWishlist(which: "christmas" | "birthday"): Wishlist {
  return data.wishlists[which];
}

export function getParty(): PartyData {
  return data.party;
}
