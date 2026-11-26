import type { Metadata } from "next";
import Link from "next/link";
import { images } from "@/data/images";
import { PageHero } from "@/components/ui/PageHero";
import { Frame } from "@/components/ui/Frame";
import { HomeCtaBlock } from "@/components/sections/HomeCtaBlock";
import { Reveal } from "@/components/ui/Reveal";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About",
  description: "How the sample company VELTRAX describes freight planning, records, and the limits of this demonstration.",
  path: "/about",
  image: "/images/operations-team.jpg",
});

const principles = [
  {
    title: "The brief comes first",
    text: "A quote that cannot be booked is a conversation, not a service. The form asks for place, weight, pieces, and an owner.",
  },
  {
    title: "Modes are not synonyms",
    text: "Ocean, air, road, rail, storage, and clearance keep different clocks. The navigation treats them as different work.",
  },
  {
    title: "Proof is earned",
    text: "This site refuses invented client names, fleet sizes, and on-time percentages. Put yours in only when you can evidence them.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="Company"
        title="Built around the record, not the slogan."
        lede="VELTRAX is a fictional logistics company created so this template has a voice. The operating ideas are real kinds of work. The office, the people, and the lanes are samples."
        image={images.operations}
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        action={{ href: "/quote", label: "Request a quote" }}
      />
      <section className="band home-position">
        <div className="shell home-split home-position-grid">
          <Reveal className="home-split-copy">
            <p className="kicker">Position</p>
            <h2>What the sample company sells</h2>
            <p className="lede">
              It sells attention to the handoff. A container, a flight, a truck, a ramp, a slot, and an
              entry are useful when the next person can see what the last person decided.
            </p>
            <p>
              The three homepages tell that story from different rooms: the port, the mode, and the
              building. They share data files so a buyer is not maintaining three copies of the truth.
            </p>
            <p>
              If you are adapting the template, start with <code>src/data/site.ts</code> and the
              service essays. Leave the layout alone until the words are yours.
            </p>
          </Reveal>
          <Reveal as="figure" className="home-split-media home-position-media" delay={90}>
            <Frame image={images.customs} sizes="(min-width: 900px) 42vw, 100vw" />
            <figcaption>Documentation bay · demonstration photograph</figcaption>
          </Reveal>
        </div>
      </section>
      <section className="band band-sand">
        <Reveal className="shell">
          <header className="home-intro">
            <p className="kicker">Principles</p>
            <h2>Three rules the copy keeps.</h2>
          </header>
          <ol className="home-steps">
            {principles.map((item, index) => (
              <li key={item.title}>
                <b>0{index + 1}</b>
                <strong>{item.title}</strong>
                <p>{item.text}</p>
              </li>
            ))}
          </ol>
          <div className="cta-row">
            <Link className="btn btn-navy" href="/team">
              Sample team
            </Link>
            <Link className="btn btn-line" href="/careers">
              Sample roles
            </Link>
          </div>
        </Reveal>
      </section>
      <HomeCtaBlock />
    </>
  );
}
