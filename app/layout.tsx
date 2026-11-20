import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "./globals.css";

export const metadata: Metadata = { title: "Керамика — учебная мастерская", description: "Учебный пример для курса технической грамотности" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="ru"><body>{children}</body></html>;
}
