import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/projects";
import { PageHero } from "@/components/ui/PageHero";
import { HomeCtaBlock } from "@/components/sections/HomeCtaBlock";
import { createPageMetadata } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return createPageMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}`,
    image: project.image.src,
    imageAlt: project.image.alt,
  });
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const more = projects.filter((item) => item.slug !== project.slug).slice(0, 2);

  return (
    <>
      <PageHero
        kicker="Sample study"
        title={project.title}
        lede={project.summary}
        image={project.image}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Projects", href: "/projects" },
          { label: "Study" },
        ]}
        action={{ href: "/quote", label: "Request a quote" }}
      />
      <section className="band-tight">
        <div className="shell">
          <ul className="meta-list">
            <li>
              <span className="muted">Sector</span>
              <span>{project.sector}</span>
            </li>
            <li>
              <span className="muted">Mode</span>
              <span>{project.mode}</span>
            </li>
            <li>
              <span className="muted">Lane</span>
              <span>{project.lane}</span>
            </li>
          </ul>
        </div>
      </section>
      <section className="band">
        <div className="shell detail-grid">
          <div className="prose">
            <h2>The situation</h2>
            {project.challenge.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <h2>The approach</h2>
            {project.approach.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="prose">
            <h2>What the record showed</h2>
            {project.record.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>
      <section className="band band-sand">
        <div className="shell">
          <header className="home-intro">
            <p className="kicker">Projects</p>
            <h2>Other sample movements.</h2>
          </header>
          <div className="related">
            {more.map((item) => (
              <Link key={item.slug} href={`/projects/${item.slug}`}>
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </section>
      <HomeCtaBlock />
    </>
  );
}
