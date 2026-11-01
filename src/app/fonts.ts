import { Big_Shoulders, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";

// next/font 16.4 has Big_Shoulders, the variable-font successor of Big Shoulders Display.
export const display = Big_Shoulders({
  subsets: ["latin"],
  weight: "800",
  variable: "--font-display-loaded",
  display: "swap",
  adjustFontFallback: false,
  fallback: ["Arial Narrow", "Impact", "sans-serif"],
});

export const body = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body-loaded",
  display: "swap",
});

export const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-loaded",
  display: "swap",
});

// CJK uses the system stack in globals.css (PingFang SC / Microsoft YaHei / Noto Sans CJK).
// Shipping Noto Sans SC via next/font injected ~280KB of @font-face CSS and ~1MB of
// subset woff2 downloads on every locale, including English pages that only show a
// few Chinese characters in the bilingual chrome.

export const fontVariableClass = [display.variable, body.variable, mono.variable].join(" ");
