import type { Metadata } from "next";
import { articles } from "@/data/articles";
import { images } from "@/data/images";
import { ArticleBrowser } from "@/components/blog/ArticleBrowser";
import { PageHero } from "@/components/ui/PageHero";
import { HomeCtaBlock } from "@/components/sections/HomeCtaBlock";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Insights",
  description: "Sample logistics essays on briefing, air freight, warehouse slots, borders, rail, and milestone records.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <PageHero
        kicker="Insights"
        title="Notes a planner could hand to a new coordinator."
        lede="Six sample articles. Filter by subject. The list paginates so the control is real even with a short archive."
        image={images.operations}
        crumbs={[{ label: "Home", href: "/" }, { label: "Insights" }]}
      />
      <section className="band band-sand">
        <div className="shell">
          <ArticleBrowser articles={articles} />
        </div>
      </section>
      <HomeCtaBlock />
    </>
  );
}
