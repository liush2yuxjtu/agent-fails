"use client";

import { track } from "@vercel/analytics";
import type { ComponentProps, MouseEvent } from "react";

/** Host of an off-site http(s) URL, or null for same-site and non-web targets. */
export function destinationHost(href: string): string | null {
  try {
    const url = new URL(href, window.location.href);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    if (url.hostname === window.location.hostname) return null;
    return url.hostname;
  } catch {
    return null;
  }
}

/** Sponsor or affiliate link that leaves the site. Records `outbound_click` with the destination host. */
export function OutboundLink({ href, onClick, children, ...props }: ComponentProps<"a"> & { href: string }) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (event.defaultPrevented) return;
    const host = destinationHost(href);
    if (host) track("outbound_click", { host });
  }

  return (
    <a href={href} {...props} onClick={handleClick}>
      {children}
    </a>
  );
}
