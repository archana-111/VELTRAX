import type { Metadata } from "next";
import { faqs } from "@/data/company";
import { images } from "@/data/images";
import { FaqBrowser } from "@/components/faq/FaqBrowser";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { HomeCtaBlock } from "@/components/sections/HomeCtaBlock";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Questions",
  description: "Answers about the VELTRAX demonstration: quotes, tracking numbers, documents, warehousing, and sample figures.",
  path: "/faq",
});

export default function FaqPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <JsonLd data={schema} />
      <PageHero
        kicker="Questions"
        title="Straight answers about this demonstration."
        lede="The questions cover the quote form, the three tracking numbers, and the claims this template deliberately does not make."
        image={images.customs}
        crumbs={[{ label: "Home", href: "/" }, { label: "Questions" }]}
        action={{ href: "/quote", label: "Request a quote" }}
      />
      <section className="band">
        <div className="shell-narrow">
          <FaqBrowser items={faqs} />
        </div>
      </section>
      <HomeCtaBlock />
    </>
  );
}
