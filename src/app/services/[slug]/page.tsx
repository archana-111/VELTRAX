import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getService, services } from "@/data/services";
import { industries } from "@/data/industries";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { HomeCtaBlock } from "@/components/sections/HomeCtaBlock";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return createPageMetadata({
    title: service.name,
    description: service.summary,
    path: `/services/${service.slug}`,
    image: service.image.src,
    imageAlt: service.image.alt,
  });
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const related = industries.filter((industry) => industry.serviceSlugs.includes(service.slug)).slice(0, 3);
  const others = services.filter((item) => item.slug !== service.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.name,
          description: service.summary,
          provider: { "@type": "Organization", name: "Veltrax Logistics" },
          url: absoluteUrl(`/services/${service.slug}`),
        }}
      />
      <PageHero
        kicker={`Service ${service.index}`}
        title={service.name}
        lede={service.summary}
        image={service.image}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.name },
        ]}
        action={{ href: "/quote", label: "Request a quote" }}
      />
      <section className="band">
        <div className="shell detail-grid">
          <div className="prose">
            {service.narrative.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <aside>
            <header className="page-section-head">
              <p className="kicker">At a glance</p>
              <h2>What this mode holds.</h2>
            </header>
            <ul className="meta-list">
              {service.disciplines.map((item) => (
                <li key={item}>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
      <section className="band band-sand">
        <div className="shell">
          <header className="home-intro">
            <p className="kicker">Capabilities</p>
            <h2>Work the desk can name.</h2>
          </header>
          <div className="floor">
            {service.capabilities.map((item, index) => (
              <article key={item.title}>
                <em>0{index + 1}</em>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="band">
        <div className="shell detail-grid">
          <div>
            <header className="page-section-head">
              <p className="kicker">Before you book</p>
              <h2>What has to be true.</h2>
            </header>
            <ul>
              {service.considerations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <header className="page-section-head">
              <p className="kicker">Related</p>
              <h2>Industries and other modes.</h2>
            </header>
            <div className="related">
              {related.map((industry) => (
                <Link key={industry.slug} href={`/industries/${industry.slug}`}>
                  {industry.name}
                </Link>
              ))}
            </div>
            <div className="related stack-gap-md">
              {others.map((item) => (
                <Link key={item.slug} href={`/services/${item.slug}`}>
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      <HomeCtaBlock />
    </>
  );
}
