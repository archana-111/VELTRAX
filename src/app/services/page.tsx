import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/data/services";
import { images } from "@/data/images";
import { Frame } from "@/components/ui/Frame";
import { PageHero } from "@/components/ui/PageHero";
import { HomeCtaBlock } from "@/components/sections/HomeCtaBlock";
import { Reveal } from "@/components/ui/Reveal";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Services",
  description: "Ocean, air, road, rail, and warehousing pages in the VELTRAX template.",
  path: "/services",
});

export default function ServicesPage() {
  const [lead, ...rest] = services;

  return (
    <>
      <PageHero
        kicker="Services"
        title="Five clocks, kept apart."
        lede="Start with the mode that matches the calendar you actually have. Each page is a full essay, not a repeated card."
        image={images.containers}
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        action={{ href: "/quote", label: "Request a quote" }}
      />
      <section className="band">
        <div className="shell">
          <Reveal className="page-list-lead home-split">
            <Frame image={lead.image} sizes="(min-width: 900px) 48vw, 100vw" />
            <div>
              <p className="kicker">{lead.index}</p>
              <h2>
                <Link href={`/services/${lead.slug}`}>{lead.name}</Link>
              </h2>
              <p className="lede">{lead.summary}</p>
              <Link className="text-link" href={`/services/${lead.slug}`}>
                Read the service
              </Link>
            </div>
          </Reveal>
          <Reveal>
            <header className="page-section-head home-intro">
              <p className="kicker">All modes</p>
              <h2>The rest of the desk.</h2>
            </header>
            <ul className="home-index">
              {rest.map((service) => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}`}>
                    <em>{service.index}</em>
                    <strong>{service.name}</strong>
                    <span>{service.short}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
      <HomeCtaBlock />
    </>
  );
}
