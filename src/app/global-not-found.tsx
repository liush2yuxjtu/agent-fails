/* eslint-disable @next/next/no-html-link-for-pages -- global 404 renders outside the app layouts; plain links are intended */
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "404 · AgentFails", robots: { index: false } };

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-white px-4 text-zinc-900">
        <div className="text-center">
          <p className="text-sm font-medium text-orange-700">404 · 页面不存在</p>
          <h1 className="mt-2 text-3xl font-bold">This page went off the rails.</h1>
          <p className="mt-2 text-zinc-600">Even agents get lost sometimes.</p>
          <div className="mt-6 flex justify-center gap-3">
            <a href="/" className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white">All patterns</a>
            <a href="/zh" className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-semibold">中文首页</a>
          </div>
        </div>
      </body>
    </html>
  );
}
