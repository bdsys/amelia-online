import { getParty } from "@/lib/grownups";
import PartyInvite from "@/app/components/PartyInvite";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Party Invite · Amelia",
  robots: { index: false, follow: false },
};

export default function PartyPage() {
  const party = getParty();
  return <PartyInvite party={party} showBackLink />;
}
