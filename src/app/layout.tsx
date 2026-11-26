import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Schibsted_Grotesk, Source_Sans_3 } from "next/font/google";
import { SiteShell } from "@/components/layout/SiteShell";
import { JsonLd } from "@/components/ui/JsonLd";
import { site } from "@/data/site";
import { absoluteUrl } from "@/lib/seo";
import "./globals.css";

const display = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display-family",
  display: "swap",
});

const body = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body-family",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "VELTRAX — Logistics and transportation",
    template: "%s — VELTRAX",
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  keywords: [
    "logistics",
    "freight",
    "transportation",
    "warehousing",
    "supply chain",
    "shipping",
    "VELTRAX",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  category: "business",
  other: {
    "theme-color": "#101d29",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.legalName,
    url: absoluteUrl("/"),
    email: site.email,
    telephone: site.phone,
    description: "Demonstration logistics company presented by the VELTRAX website template.",
  };

  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <JsonLd data={organization} />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
