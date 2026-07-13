"use client";

import type { ReactNode } from "react";
import { useAppSelector } from "@/store/hooks";
import Sidebar from "./Sidebar";
import Header from "./Header";
import ToastViewport from "./ToastViewport";
import styles from "./AppShell.module.css";

export default function AppShell({ children }: { children: ReactNode }) {
  const theme = useAppSelector((state) => state.ui.theme);

  return (
    <div className={styles.shell} data-theme={theme}>
      <Sidebar />
      <div className={styles.main}>
        <Header />
        <main className={`${styles.content} scScroll`}>{children}</main>
      </div>
      <ToastViewport />
    </div>
  );
}
