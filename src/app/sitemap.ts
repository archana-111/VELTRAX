import type { MetadataRoute } from "next";
import { articles } from "@/data/articles";
import { industries } from "@/data/industries";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "/",
    "/home-freight",
    "/home-warehousing",
    "/about",
    "/team",
    "/careers",
    "/faq",
    "/contact",
    "/services",
    "/industries",
    "/projects",
    "/blog",
    "/quote",
    "/track",
  ];

  const dynamicPaths = [
    ...services.map((item) => `/services/${item.slug}`),
    ...industries.map((item) => `/industries/${item.slug}`),
    ...projects.map((item) => `/projects/${item.slug}`),
    ...articles.map((item) => `/blog/${item.slug}`),
  ];

  return [...staticPaths, ...dynamicPaths].map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
