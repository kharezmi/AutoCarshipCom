import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { getPublishedPosts } from "@/lib/blog-store";
import { SERVICES } from "@/lib/services-catalog";
import { VEHICLE_MAKES } from "@/lib/vehicle-makes";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL.replace(/\/$/, "");
  const now = new Date();

  const staticPaths = [
    "",
    "/services",
    "/vehicles",
    "/reviews",
    "/contact",
    "/blogs",
    "/company/about",
    "/company/faq",
    "/company/terms",
    "/company/privacy",
    "/terms",
    "/privacy",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${base}${path || "/"}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const serviceEntries: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const vehicleEntries: MetadataRoute.Sitemap = VEHICLE_MAKES.map((m) => ({
    url: `${base}/shipping/${m.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  const blogEntries: MetadataRoute.Sitemap = getPublishedPosts().map((p) => ({
    url: `${base}/blogs/${p.slug}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  return [
    ...staticEntries,
    ...serviceEntries,
    ...vehicleEntries,
    ...blogEntries,
  ];
}
