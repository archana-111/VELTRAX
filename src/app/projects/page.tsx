import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { images } from "@/data/images";
import { ProjectBrowser } from "@/components/projects/ProjectBrowser";
import { PageHero } from "@/components/ui/PageHero";
import { HomeCtaBlock } from "@/components/sections/HomeCtaBlock";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Projects",
  description: "Sample logistics case studies. They describe a way of working and do not name real customers.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        kicker="Studies"
        title="Four movements, told without a trophy percentage."
        lede="Filter by the sample sector. Every study is marked as demonstration content and can be replaced in src/data/projects.ts."
        image={images.containers}
        crumbs={[{ label: "Home", href: "/" }, { label: "Projects" }]}
        action={{ href: "/quote", label: "Request a quote" }}
      />
      <section className="band">
        <div className="shell">
          <ProjectBrowser projects={projects} />
        </div>
      </section>
      <HomeCtaBlock />
    </>
  );
}
