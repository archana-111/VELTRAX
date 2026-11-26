import type { Metadata } from "next";
import Link from "next/link";
import { industries } from "@/data/industries";
import { images } from "@/data/images";
import { Frame } from "@/components/ui/Frame";
import { PageHero } from "@/components/ui/PageHero";
import { HomeCtaBlock } from "@/components/sections/HomeCtaBlock";
import { Reveal } from "@/components/ui/Reveal";
import { RevealStagger } from "@/components/ui/RevealStagger";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Industries",
  description: "Sample industry pages for manufacturing, retail, automotive, healthcare, energy, and food.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        kicker="Industries"
        title="The same record, different rooms."
        lede="Six sample sectors. Each page names the pressure, the way the template’s services respond, and a related study."
        image={images.warehouse}
        crumbs={[{ label: "Home", href: "/" }, { label: "Industries" }]}
        action={{ href: "/quote", label: "Request a quote" }}
      />
      <section className="band">
        <Reveal className="shell">
          <header className="home-intro">
            <p className="kicker">Sectors</p>
            <h2>Pick the room that matches the dock.</h2>
          </header>
          <RevealStagger className="home-industry-grid">
            {industries.slice(0, 3).map((industry) => (
              <Link
                key={industry.slug}
                href={`/industries/${industry.slug}`}
                className="home-industry-tile"
              >
                <Frame image={industry.image} sizes="(min-width: 900px) 28vw, 100vw" />
                <span>
                  <em>{industry.index}</em>
                  <strong>{industry.name}</strong>
                </span>
              </Link>
            ))}
          </RevealStagger>
          <ul className="home-index stack-gap-lg">
            {industries.map((industry) => (
              <li key={industry.slug}>
                <Link href={`/industries/${industry.slug}`}>
                  <em>{industry.index}</em>
                  <strong>{industry.name}</strong>
                  <span>{industry.summary}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>
      <HomeCtaBlock />
    </>
  );
}
