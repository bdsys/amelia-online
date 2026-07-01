import { getWishlist } from "@/lib/grownups";
import WishlistView from "@/app/components/WishlistView";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Christmas List · Amelia",
  robots: { index: false, follow: false },
};

export default function ChristmasPage() {
  const list = getWishlist("christmas");
  return <WishlistView list={list} accentColor="var(--gu-xmas)" />;
}
