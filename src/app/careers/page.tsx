import type { Metadata } from "next";
import { careers } from "@/data/company";
import { CareerList } from "@/components/careers/CareerList";
import { PageHero } from "@/components/ui/PageHero";
import { images } from "@/data/images";
import { HomeCtaBlock } from "@/components/sections/HomeCtaBlock";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Careers",
  description: "Sample logistics roles for the VELTRAX template. Applications are not collected.",
  path: "/careers",
});

export default function CareersPage() {
  return (
    <>
      <PageHero
        kicker="Careers"
        title="Roles written as work, not as perks."
        lede="Four demonstration listings. The discuss button opens the contact form, which also does not deliver a message."
        image={images.warehouse}
        crumbs={[{ label: "Home", href: "/" }, { label: "Careers" }]}
        action={{ href: "/contact", label: "Contact the desk" }}
      />
      <section className="band">
        <div className="shell">
          <CareerList roles={careers} />
        </div>
      </section>
      <HomeCtaBlock />
    </>
  );
}
