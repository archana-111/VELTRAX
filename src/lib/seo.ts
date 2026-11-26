import type { Metadata } from "next";
import { site } from "@/data/site";

export function absoluteUrl(path = "/") {
  const base = site.url.replace(/\/$/, "");
  if (!path || path === "/") return `${base}/`;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const isFile = /\.[a-z0-9]+$/i.test(normalized);
  if (isFile) return `${base}${normalized}`;
  return `${base}${normalized.endsWith("/") ? normalized : `${normalized}/`}`;
}

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
};

export function createPageMetadata({
  title,
  description,
  path,
  image = "/images/port-terminal.jpg",
  imageAlt = "Container terminal, a VELTRAX demonstration photograph",
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  const socialTitle = `${title} — ${site.name}`;

  return {
    title: path === "/" ? socialTitle : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: socialTitle,
      description,
      url,
      siteName: site.name,
      type: "website",
      locale: "en_US",
      images: [{ url: imageUrl, width: 1600, height: 900, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [imageUrl],
    },
    formatDetection: {
      telephone: false,
      email: false,
      address: false,
    },
  };
}
