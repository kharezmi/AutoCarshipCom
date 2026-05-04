import type { Metadata } from "next";
import { COMPANY, SITE_URL } from "@/lib/constants";
import { DEFAULT_OG_IMAGE } from "@/lib/seo-assets";

export function clipMeta(s: string, max: number) {
  if (s.length <= max) return s;
  return `${s.slice(0, max - 3).trimEnd()}...`;
}

/** Site root with trailing slash normalized away. */
export function siteBaseUrl() {
  return SITE_URL.replace(/\/$/, "");
}

/** Canonical absolute URL for a path (defaults to homepage). */
export function absoluteUrl(path: string = "/") {
  const base = siteBaseUrl();
  if (!path || path === "/") return `${base}/`;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

/** Full `<title>` value. Root layout uses `template: \"%s\"` so this is emitted verbatim. */
export function pageTitle(segment: string) {
  return `${segment} | ${COMPANY.name} | Nationwide auto transport broker`;
}

/** Canonical URL + Open Graph + Twitter defaults for generic marketing routes. */
export function canonicalAndSocial(
  pathname: string,
  shareTitle: string,
  plainDescription: string,
  opts?: {
    ogType?: "website" | "article";
    imageAlt?: string;
  }
): Pick<Metadata, "alternates" | "openGraph" | "twitter"> {
  const url = absoluteUrl(pathname || "/");
  const desc = clipMeta(plainDescription, 160);
  const alt =
    opts?.imageAlt ??
    `${COMPANY.name} open car carrier hauling customer vehicles`;

  return {
    alternates: { canonical: url },
    openGraph: {
      url,
      title: shareTitle,
      description: desc,
      siteName: COMPANY.name,
      locale: "en_US",
      type: opts?.ogType ?? "website",
      images: [
        { url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description: desc,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}
