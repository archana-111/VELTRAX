import Image from "next/image";
import "@/styles/black-friday.css";

const offers = [
  {
    id: "server",
    kicker: "Server management",
    title: "Hands-off servers, without the surprises.",
    points: [
      "1st month FREE + 10% off the monthly plan",
      "From $90 / month after the free month",
      "Complimentary server security audit",
    ],
    cta: "Claim offer",
    href: "mailto:sales@supportpro.com?subject=Black%20Friday%20-%20Server%20Management",
    image: "/images/containers-detail.jpg",
    alt: "Close-up of stacked shipping containers",
  },
  {
    id: "cloud",
    kicker: "Cloud management",
    title: "Cloud kept tidy while your team ships product.",
    points: [
      "20% off for the first 3 months",
      "Free cloud infrastructure assessment",
      "Monitoring, patching, and clear escalation paths",
    ],
    cta: "Claim offer",
    href: "mailto:sales@supportpro.com?subject=Black%20Friday%20-%20Cloud%20Management",
    image: "/images/operations-team.jpg",
    alt: "Operations specialists collaborating at a desk",
    flip: true,
  },
  {
    id: "helpdesk",
    kicker: "Helpdesk support",
    title: "Try the desk before you commit the contract.",
    points: [
      "7 days free — up to 25 support tickets",
      "No long commitment for the trial window",
      "Same engineers who run the paid queue",
    ],
    cta: "Start free trial",
    href: "mailto:sales@supportpro.com?subject=Black%20Friday%20-%20Helpdesk%20Trial",
    image: "/images/customs-bay.jpg",
    alt: "Team reviewing documents in a working bay",
  },
  {
    id: "hours",
    kicker: "Prepaid technician hours",
    title: "Buy a block of hours. Get extras free.",
    points: [
      "Buy 10 hours + 2 free — $300",
      "Buy 15 hours + 5 free — $450",
      "Valid for 6 months from purchase",
    ],
    cta: "Claim offer",
    href: "mailto:sales@supportpro.com?subject=Black%20Friday%20-%20Prepaid%20Hours",
    image: "/images/warehouse.jpg",
    alt: "Technician reviewing systems in a warehouse aisle",
    flip: true,
  },
  {
    id: "aws",
    kicker: "Managed AWS",
    title: "AWS monitored, managed, and maintained.",
    points: [
      "From $299 / month",
      "Infrastructure monitoring and maintenance",
      "Free AWS assessment for growing teams",
    ],
    cta: "Explore offer",
    href: "mailto:sales@supportpro.com?subject=Black%20Friday%20-%20Managed%20AWS",
    image: "/images/port-terminal.jpg",
    alt: "Port terminal infrastructure at dusk",
  },
] as const;

const proof = [
  "ISO 9001:2015 certified company",
  "14+ years in the web hosting field",
  "100% Red Hat & cPanel certified engineers",
  "Certified cloud experts on the floor",
  "150+ engineers across delivery teams",
  "Offices in Illinois, USA & Kerala, India",
];

export function BlackFridayPage() {
  return (
    <div className="bf-page">
      <a className="skip" href="#bf-offers">
        Skip to offers
      </a>
      <article className="bf-shell">
        <header className="bf-hero">
          <div className="bf-hero__media" aria-hidden="true">
            <Image
              src="/images/vessel-bow.jpg"
              alt=""
              width={1600}
              height={900}
              priority
              sizes="(max-width: 720px) 100vw, 44rem"
            />
          </div>
          <div className="bf-hero__glow" aria-hidden="true" />
          <div className="bf-hero__copy">
            <p className="bf-hero__eyebrow">Limited window · 25 Nov – 05 Dec 2026</p>
            <h1>
              Black Friday
              <br />
              <span>Offers</span>
            </h1>
            <p className="bf-hero__sub">Web hosting, cloud &amp; infrastructure support.</p>
          </div>
        </header>

        <div className="bf-brand-bridge">
          <div className="bf-brand-bridge__mark" aria-hidden="true">
            S
          </div>
          <strong>SupportPRO</strong>
          <p>Transparent technical support</p>
        </div>

        <section className="bf-intro" aria-label="Introduction">
          <p>
            Running a hosting business is challenging enough. This Black Friday, we&apos;re making the
            operations side quieter.
          </p>
          <p>
            Less firefighting. <em>More time to grow.</em>
          </p>
        </section>

        <section className="bf-offers" id="bf-offers" aria-label="Black Friday offers">
          {offers.map((offer) => (
            <article
              key={offer.id}
              className={`bf-offer${"flip" in offer && offer.flip ? " bf-offer--flip" : ""}`}
            >
              <div className="bf-offer__media">
                <Image
                  src={offer.image}
                  alt={offer.alt}
                  width={1200}
                  height={800}
                  sizes="(max-width: 720px) 100vw, 22rem"
                />
              </div>
              <div className="bf-offer__body">
                <p className="bf-offer__kicker">{offer.kicker}</p>
                <h2>{offer.title}</h2>
                <ul className="bf-offer__points">
                  {offer.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <a className="bf-btn" href={offer.href}>
                  {offer.cta}
                </a>
              </div>
            </article>
          ))}
        </section>

        <section className="bf-band" aria-label="Additional services">
          <div className="bf-band__media" aria-hidden="true">
            <Image
              src="/images/air-cargo.jpg"
              alt=""
              width={1600}
              height={900}
              sizes="(max-width: 720px) 100vw, 44rem"
            />
          </div>
          <div className="bf-band__content">
            <h2>Need more than hosting ops?</h2>
            <p>
              Mobile &amp; web application development, DevOps &amp; cloud services, and server
              management — under the same SupportPRO desk.
            </p>
            <a className="bf-btn bf-btn--wide" href="#proof">
              Try now
            </a>
          </div>
        </section>

        <section className="bf-proof" id="proof" aria-labelledby="bf-proof-title">
          <h2 id="bf-proof-title">Why teams stay with SupportPRO</h2>
          <ol>
            {proof.map((item, index) => (
              <li key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </li>
            ))}
          </ol>
        </section>

        <footer className="bf-footer">
          <p className="bf-footer__dates">Offer valid from 25 Nov – 05 Dec 2026</p>
          <ul className="bf-footer__contacts">
            <li>
              <a href="mailto:sales@supportpro.com">sales@supportpro.com</a>
            </li>
            <li>
              <a href="skype:supportpro.sales?chat">Skype · supportpro.sales</a>
            </li>
          </ul>
          <ul className="bf-footer__social" aria-label="Social links">
            <li>
              <a href="https://facebook.com" rel="noopener noreferrer" aria-label="Facebook">
                f
              </a>
            </li>
            <li>
              <a href="https://linkedin.com" rel="noopener noreferrer" aria-label="LinkedIn">
                in
              </a>
            </li>
            <li>
              <a href="https://x.com" rel="noopener noreferrer" aria-label="X">
                x
              </a>
            </li>
          </ul>
          <p className="bf-footer__fine">
            SupportPRO Black Friday campaign sample.{" "}
            <a href="mailto:sales@supportpro.com">Contact sales</a> to activate an offer.
          </p>
        </footer>
      </article>
    </div>
  );
}
