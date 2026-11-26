import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getIndustry, industries } from "@/data/industries";
import { getProject } from "@/data/projects";
import { getService } from "@/data/services";
import { PageHero } from "@/components/ui/PageHero";
import { HomeCtaBlock } from "@/components/sections/HomeCtaBlock";
import { createPageMetadata } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};
  return createPageMetadata({
    title: industry.name,
    description: industry.summary,
    path: `/industries/${industry.slug}`,
    image: industry.image.src,
    imageAlt: industry.image.alt,
  });
}

export default async function IndustryPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();
  const project = getProject(industry.projectSlug);
  const linked = industry.serviceSlugs.map((item) => getService(item)).filter((item) => item !== undefined);

  return (
    <>
      <PageHero
        kicker={`Industry ${industry.index}`}
        title={industry.name}
        lede={industry.summary}
        image={industry.image}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Industries", href: "/industries" },
          { label: industry.name },
        ]}
        action={{ href: "/quote", label: "Request a quote" }}
      />
      <section className="band">
        <div className="shell detail-grid">
          <div>
            <header className="page-section-head">
              <p className="kicker">Pressure</p>
              <h2>What the room will not tolerate.</h2>
            </header>
            <ul>
              {industry.pressures.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <header className="page-section-head">
              <p className="kicker">Response</p>
              <h2>How the sample desk answers.</h2>
            </header>
            <ul>
              {industry.approach.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="band band-sand">
        <div className="shell detail-grid">
          <div>
            <header className="page-section-head">
              <p className="kicker">Services</p>
              <h2>Modes this sector pulls in.</h2>
            </header>
            <div className="related">
              {linked.map((service) => (
                <Link key={service.slug} href={`/services/${service.slug}`}>
                  {service.name}
                </Link>
              ))}
            </div>
          </div>
          {project ? (
            <div>
              <header className="page-section-head">
                <p className="kicker">Related study</p>
                <h2>A movement in this room.</h2>
              </header>
              <p>{project.summary}</p>
              <Link className="btn btn-line stack-gap" href={`/projects/${project.slug}`}>
                Read the study
              </Link>
            </div>
          ) : null}
        </div>
      </section>
      <HomeCtaBlock />
    </>
  );
}
