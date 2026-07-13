"use client";

import Icon from "@/components/common/Icon";
import { useToast } from "@/hooks/useToast";
import styles from "./AppShell.module.css";

export default function ToastViewport() {
  const { toast } = useToast();
  if (!toast?.visible) return null;

  return (
    <div className={styles.toast} role="status">
      <span className={styles.toastIcon}>
        <Icon name="check" size={16} strokeWidth={2.4} />
      </span>
      <span className={styles.toastText}>{toast.message}</span>
    </div>
  );
}
