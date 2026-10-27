/* eslint-disable @next/next/no-html-link-for-pages -- global 404 renders outside the app layouts; plain links are intended */
import type { Metadata } from "next";
import { fontVariableClass } from "./fonts";
import "./globals.css";

export const metadata: Metadata = { title: "404 · AgentFails", robots: { index: false } };

export default function GlobalNotFound() {
  return (
    <html lang="en" className={fontVariableClass}>
      <body className="af-chassis flex min-h-screen items-center justify-center px-4">
        <div className="text-center">
          <p className="af-meta">404 · 页面不存在</p>
          <h1 className="af-h1">This page went off the rails.</h1>
          <p className="af-muted">Even agents get lost sometimes.</p>
          <div className="af-actions">
            <a href="/" className="af-btn">All patterns</a>
            <a href="/zh" className="af-btn-ghost">中文首页</a>
          </div>
        </div>
      </body>
    </html>
  );
}
