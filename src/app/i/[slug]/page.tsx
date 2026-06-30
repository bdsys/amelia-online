import { notFound } from "next/navigation";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getParty } from "@/lib/grownups";
import PartyInvite from "@/app/components/PartyInvite";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "You're Invited!",
  robots: { index: false, follow: false },
};

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function InvitePage({ params }: Props) {
  const { slug } = await params;

  const ctx = await getCloudflareContext({ async: true });
  const inviteSlug = (ctx.env as Record<string, string | undefined>).INVITE_SLUG ?? "";

  if (!inviteSlug || slug !== inviteSlug) {
    notFound();
  }

  const party = getParty();
  return <PartyInvite party={party} showBackLink={false} />;
}
