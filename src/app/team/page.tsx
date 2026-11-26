import type { Metadata } from "next";
import { team } from "@/data/company";
import { PageHero } from "@/components/ui/PageHero";
import { images } from "@/data/images";
import { HomeCtaBlock } from "@/components/sections/HomeCtaBlock";
import { Reveal } from "@/components/ui/Reveal";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Team",
  description: "Demonstration staff profiles for the VELTRAX template. Replace every name before you publish.",
  path: "/team",
});

export default function TeamPage() {
  return (
    <>
      <PageHero
        kicker="People"
        title="Sample profiles, not a directory."
        lede="These names are fictional. Replace each profile in src/data/company.ts before you publish."
        image={images.operations}
        crumbs={[{ label: "Home", href: "/" }, { label: "Team" }]}
        action={{ href: "/careers", label: "Sample roles" }}
      />
      <section className="band">
        <Reveal className="shell">
          <header className="home-intro">
            <p className="kicker">Desk</p>
            <h2>Demonstration people only.</h2>
            <p>Do not present them as employees of a real company.</p>
          </header>
          <div className="team-grid team-grid--clean">
            {team.map((person) => (
              <article key={person.name} className="person person--clean">
                <p className="mono" aria-hidden="true">
                  {person.initials}
                </p>
                <h2>{person.name}</h2>
                <p>{person.role}</p>
                <p className="muted">{person.focus}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </section>
      <HomeCtaBlock />
    </>
  );
}
