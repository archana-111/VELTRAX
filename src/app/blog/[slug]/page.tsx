import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticle, relatedArticles } from "@/data/articles";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { HomeCtaBlock } from "@/components/sections/HomeCtaBlock";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return createPageMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/blog/${article.slug}`,
    image: article.image.src,
    imageAlt: article.image.alt,
  });
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const related = relatedArticles(article.slug);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          author: { "@type": "Organization", name: "VELTRAX" },
          description: article.excerpt,
          image: absoluteUrl(article.image.src),
          mainEntityOfPage: absoluteUrl(`/blog/${article.slug}`),
        }}
      />
      <PageHero
        kicker={`${article.category} · ${article.date} · ${article.readMinutes} min read`}
        title={article.title}
        lede={article.excerpt}
        image={article.image}
        crumbs={[{ label: "Home", href: "/" }, { label: "Insights", href: "/blog" }, { label: article.category }]}
      />
      <article className="band">
        <div className="shell prose">
          <p className="muted">{article.author}</p>
          {article.blocks.map((block) => (
            <section key={block.heading ?? block.paragraphs[0]}>
              {block.heading ? <h2>{block.heading}</h2> : null}
              {block.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
        </div>
      </article>
      <section className="band band-sand">
        <div className="shell">
          <header className="home-intro">
            <p className="kicker">Insights</p>
            <h2>Related notes.</h2>
          </header>
          <div className="related">
            {related.map((item) => (
              <Link key={item.slug} href={`/blog/${item.slug}`}>
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
