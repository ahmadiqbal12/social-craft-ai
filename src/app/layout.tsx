import type { Metadata } from "next";
import { Inter } from "next/font/google";
import StoreProvider from "@/store/StoreProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SocialCraft AI",
  description: "AI-powered social content studio, calendar and analytics.",
};

const THEME_INIT_SCRIPT = `
try {
  var theme = localStorage.getItem('sc-theme');
  if (theme === 'dark') document.documentElement.dataset.theme = 'dark';
} catch (e) {}
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Runs before hydration so returning dark-mode users don't see a light flash. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body style={{ fontFamily: "var(--font-inter), system-ui, -apple-system, sans-serif" }}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
