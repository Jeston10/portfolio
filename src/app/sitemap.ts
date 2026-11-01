import type { MetadataRoute } from "next";
import { profile } from "@/data/profile";

// Every public route. Google reads this to discover and index each page.
const routes = [
  "", // landing (/)
  "/home",
  "/projects",
  "/experience",
  "/skills",
  "/opensource",
  "/blogs",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${profile.siteUrl}${route}`,
    lastModified,
    changeFrequency: "weekly",
    priority: route === "" || route === "/home" ? 1 : 0.8,
  }));
}
