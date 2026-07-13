import type { Metadata } from "next";
import { Suspense } from "react";
import AccountsView from "@/components/accounts/AccountsView";

export const metadata: Metadata = { title: "Social Accounts — SocialCraft AI" };

export default function AccountsPage() {
  return (
    <Suspense fallback={null}>
      <AccountsView />
    </Suspense>
  );
}
