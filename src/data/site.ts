/**
 * Buyer configuration. Company facts, contact details, and the public URL
 * live here so the rest of the template can stay untouched.
 */
export const site = {
  name: "VELTRAX",
  legalName: "Veltrax Logistics",
  tagline: "Moving business. Beyond borders.",
  description:
    "VELTRAX is a demonstration logistics company. This template presents freight, transportation, warehousing, and supply chain pages for you to rewrite with your own operation.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  email: "hello@veltrax.example",
  phone: "+1 (000) 000-0000",
  phoneHref: "tel:+10000000000",
  address: {
    line1: "18 Harbour Index",
    line2: "Suite 400",
    city: "Sample City",
    region: "Demonstration Region",
    postal: "00000",
    country: "Sample Country",
  },
  hours: "Monday to Friday, 08:00–18:00 sample local time",
  version: "1.0.1",
  releaseDate: "26 November 2026",
};

export const addressLines = [
  site.address.line1,
  site.address.line2,
  `${site.address.city}, ${site.address.region} ${site.address.postal}`,
  site.address.country,
];
