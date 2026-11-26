import type { Metadata } from "next";
import { addressLines, site } from "@/data/site";
import { images } from "@/data/images";
import { ContactFormGate } from "@/components/forms/ContactFormGate";
import { PageHero } from "@/components/ui/PageHero";
import { HomeCtaBlock } from "@/components/sections/HomeCtaBlock";
import { Reveal } from "@/components/ui/Reveal";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description: "Contact the sample VELTRAX desk. The form validates in the browser and does not send a message.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        kicker="Contact"
        title="Write to a desk that is not listening yet."
        lede="The address and the phone number are placeholders. Replace them in the site configuration, then connect the form."
        image={images.operations}
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />
      <section className="band">
        <div className="shell quote-layout">
          <Reveal>
            <p className="kicker">Sample office</p>
            <h2>Where the template pretends to sit.</h2>
            <ul className="meta-list">
              {addressLines.map((line) => (
                <li key={line}>
                  <span>{line}</span>
                </li>
              ))}
              <li>
                <span className="muted">Email</span>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                <span className="muted">Phone</span>
                <a href={site.phoneHref}>{site.phone}</a>
              </li>
              <li>
                <span className="muted">Hours</span>
                <span>{site.hours}</span>
              </li>
            </ul>
            <p className="muted stack-gap">
              A map embed is intentionally absent. Add your own when you have an address worth showing.
            </p>
          </Reveal>
          <Reveal delay={90}>
            <ContactFormGate />
          </Reveal>
        </div>
      </section>
      <HomeCtaBlock />
    </>
  );
}
