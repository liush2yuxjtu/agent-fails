import type { Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { fontVariableClass } from "../fonts";
import "../globals.css";

export const viewport: Viewport = { themeColor: "#0b1218", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`h-full antialiased ${fontVariableClass}`}>
      <body className="af-chassis min-h-full">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
