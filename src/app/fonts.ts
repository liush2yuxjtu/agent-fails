import { Big_Shoulders, IBM_Plex_Mono, IBM_Plex_Sans, Noto_Sans_SC } from "next/font/google";

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

export const sc = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sc-loaded",
  display: "swap",
  preload: false,
});

export const fontVariableClass = [display.variable, body.variable, mono.variable, sc.variable].join(" ");
