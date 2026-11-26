import type { Metadata } from "next";
import { images } from "@/data/images";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { PageHero } from "@/components/ui/PageHero";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Request a quote",
  description: "A demonstration freight quote form with validation. Submissions stay in the browser.",
  path: "/quote",
});

export default function QuotePage() {
  return (
    <>
      <PageHero
        kicker="Quote"
        title="A brief, not a brochure form."
        lede="Name the places, the weight, the mode, and the constraint at the site. Required fields are checked before the demonstration success state appears."
        image={images.port}
        crumbs={[{ label: "Home", href: "/" }, { label: "Request a quote" }]}
      />
      <section className="band">
        <div className="shell-narrow">
          <QuoteForm />
        </div>
      </section>
    </>
  );
}
