"use client";

import { useRouter } from "next/navigation";
import AdminView from "@/components/admin/AdminView";
import Icon from "@/components/common/Icon";
import placeholderStyles from "@/components/common/Placeholder.module.css";
import { useAuth } from "@/hooks/useAuth";

export default function AdminPage() {
  const { user } = useAuth();
  const router = useRouter();

  if (user?.role !== "admin") {
    return (
      <div className={placeholderStyles.page}>
        <div className={placeholderStyles.empty}>
          <div className={placeholderStyles.emptyIcon}>
            <Icon name="admin" size={32} />
          </div>
          <h2 className={placeholderStyles.emptyTitle}>Admins only</h2>
          <p className={placeholderStyles.emptyDesc}>
            This area is restricted to workspace admins. Your role is &ldquo;{user?.role}&rdquo;.
          </p>
          <div className={placeholderStyles.emptyActions}>
            <button
              type="button"
              className={placeholderStyles.ghostButton}
              onClick={() => router.push("/dashboard")}
            >
              Back to dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <AdminView />;
}
