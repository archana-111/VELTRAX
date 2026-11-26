import { services } from "@/data/services";

export type NavLink = {
  label: string;
  href: string;
  note?: string;
};

export type NavEntry = {
  id: string;
  label: string;
  href?: string;
  mega?: boolean;
  children?: NavLink[];
};

export const serviceLinks: NavLink[] = services.map((service) => ({
  label: service.name,
  href: `/services/${service.slug}`,
  note: service.short,
}));

export const primaryNav: NavEntry[] = [
  { id: "services", label: "Services", mega: true, children: serviceLinks },
  { id: "industries", label: "Industries", href: "/industries" },
  { id: "projects", label: "Projects", href: "/projects" },
  { id: "insights", label: "Insights", href: "/blog" },
  {
    id: "company",
    label: "Company",
    children: [
      { label: "About", href: "/about", note: "How the sample company is framed" },
      { label: "Team", href: "/team", note: "Demonstration profiles" },
      { label: "Careers", href: "/careers", note: "Sample roles, no applications" },
      { label: "Questions", href: "/faq", note: "Practical answers about the demo" },
      { label: "Contact", href: "/contact", note: "A form that stays in the browser" },
    ],
  },
];

export const footerNav = {
  services: serviceLinks,
  company: [
    { label: "About", href: "/about" },
    { label: "Team", href: "/team" },
    { label: "Careers", href: "/careers" },
    { label: "Questions", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
  tools: [
    { label: "Request a quote", href: "/quote" },
    { label: "Track a shipment", href: "/track" },
    { label: "Projects", href: "/projects" },
    { label: "Insights", href: "/blog" },
    { label: "Industries", href: "/industries" },
  ],
  homes: [
    { label: "Home 01 · Global", href: "/" },
    { label: "Home 02 · Freight", href: "/home-freight" },
    { label: "Home 03 · Warehousing", href: "/home-warehousing" },
  ],
};
