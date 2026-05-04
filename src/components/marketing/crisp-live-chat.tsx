"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const WEBSITE_ID = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID;

declare global {
  interface Window {
    $crisp?: Array<unknown[] | string | number | boolean | null | undefined>;
    CRISP_WEBSITE_ID?: string;
  }
}

/**
 * Loads [Crisp](https://crisp.chat/) when `NEXT_PUBLIC_CRISP_WEBSITE_ID` is set.
 * Operators answer in the Crisp inbox (web + mobile apps). Bot/automation is optional in their dashboard.
 * Hidden on `/admin` so the widget does not overlap the CMS UI.
 */
export function CrispLiveChat() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin") ?? false;

  useEffect(() => {
    if (!WEBSITE_ID || typeof window === "undefined") return;
    const crisp = window.$crisp;
    if (!crisp || typeof crisp.push !== "function") return;
    if (isAdmin) {
      crisp.push(["do", "chat:hide"]);
    } else {
      crisp.push(["do", "chat:show"]);
    }
  }, [isAdmin]);

  if (!WEBSITE_ID) return null;
  if (isAdmin) return null;

  return (
    <>
      <Script id="crisp-init" strategy="lazyOnload">
        {`window.$crisp=[];window.CRISP_WEBSITE_ID=${JSON.stringify(WEBSITE_ID)};`}
      </Script>
      <Script src="https://client.crisp.chat/l.js" strategy="lazyOnload" />
    </>
  );
}
