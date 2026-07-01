import { getWishlist } from "@/lib/grownups";
import WishlistView from "@/app/components/WishlistView";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Birthday List · Amelia",
  robots: { index: false, follow: false },
};

export default function BirthdayPage() {
  const list = getWishlist("birthday");
  return <WishlistView list={list} accentColor="var(--gu-bday)" />;
}
