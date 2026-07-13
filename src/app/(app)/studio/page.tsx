import type { Metadata } from "next";
import StudioView from "@/components/studio/StudioView";

export const metadata: Metadata = { title: "Content Studio — SocialCraft AI" };

export default function StudioPage() {
  return <StudioView />;
}
