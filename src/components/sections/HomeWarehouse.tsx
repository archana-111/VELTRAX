import Link from "next/link";
import { faqs } from "@/data/company";
import { images } from "@/data/images";
import { projects } from "@/data/projects";
import { Accordion } from "@/components/ui/Accordion";
import { Frame } from "@/components/ui/Frame";

const floors = [
  { code: "Inbound", text: "Receipts are checked against the freight or purchase reference already on the shipment." },
  { code: "Storage", text: "A slot is reserved, free, or held. Held freight does not wander into the pick face." },
  { code: "Pick", text: "Orders leave storage only when the dispatch window and the carrier are both named." },
  { code: "Dispatch", text: "The dock time belongs to the same record as the outbound truck." },
];

const specs = [
  ["Record", "Reserved, free, or held"],
  ["Inbound", "Matched to a freight reference"],
  ["Peaks", "Booked before the trailers"],
  ["Claim", "No floor area invented here"],
];

export function HomeWarehouse() {
  const study = projects[2];

  return (
    <>
      <section className="hero-c" aria-labelledby="warehouse-title">
        <Frame image={images.warehouse} priority sizes="(min-width: 960px) 42vw, 100vw" />
        <div className="shell hero-c-copy">
          <p className="kicker">Warehousing and supply chain</p>
          <h1 id="warehouse-title">Room for what has to move.</h1>
          <p className="lede" style={{ marginTop: "1rem" }}>
            Capacity is a plan: what is coming, where it will sit, and when it must leave. The building is the last place that plan should be a surprise.
          </p>
          <table className="spec-table">
            <caption className="sr-only">Sample warehouse record language</caption>
            <tbody>
              {specs.map(([label, value]) => (
                <tr key={label}>
                  <th scope="row">{label}</th>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="cta-row">
            <Link className="btn btn-navy" href="/services/warehousing">Warehousing service</Link>
            <Link className="btn btn-line" href="/services/road-transportation">Road transportation</Link>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="shell network-layout">
          <div>
            <p className="kicker">Slot logic</p>
            <h2>A rack is a sentence about space.</h2>
            <p style={{ marginTop: "1rem" }}>
              The drawing is original and deliberately abstract. Replace it with your own location map if you have one you can publish. Do not add a square-metre claim unless it is yours.
            </p>
          </div>
          <svg className="rack" viewBox="0 0 480 320" role="img" aria-label="Abstract rack elevation with reserved, free, and held bays">
            <rect width="480" height="320" fill="#fbfaf7" />
            {Array.from({ length: 5 }, (_, row) =>
              Array.from({ length: 8 }, (_, col) => {
                const held = (row + col) % 7 === 0;
                const reserved = (row * 3 + col) % 5 === 0;
                const fill = held ? "#f46b38" : reserved ? "#101d29" : "#e7e3d8";
                return <rect key={`${row}-${col}`} x={28 + col * 56} y={28 + row * 56} width="44" height="40" fill={fill} />;
              }),
            )}
          </svg>
          <p className="muted">Navy bays are reserved. Sand bays are free. Orange bays are held.</p>
        </div>
      </section>

      <section className="band band-sand">
        <div className="shell" style={{ maxWidth: "46rem" }}>
          <p className="kicker">Inside the building</p>
          <h2>Four rooms, one reference.</h2>
          <div className="floor" style={{ marginTop: "1.5rem" }}>
            {floors.map((floor) => (
              <article key={floor.code}>
                <em>{floor.code}</em>
                <h3>{floor.code}</h3>
                <p>{floor.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="band">
        <div className="shell feature-case">
          <Frame image={study.image} sizes="(min-width: 960px) 60vw, 100vw" />
          <div className="feature-copy">
            <p className="kicker">Sample study</p>
            <h2>{study.title}</h2>
            <p style={{ marginTop: "0.8rem" }}>{study.summary}</p>
            <Link className="btn btn-line" href={`/projects/${study.slug}`} style={{ marginTop: "1rem" }}>Read the study</Link>
          </div>
        </div>
      </section>

      <section className="band-tight">
        <div className="shell" style={{ maxWidth: "48rem" }}>
          <p className="kicker">Questions</p>
          <h2>Space, holds, and what this demo will not claim.</h2>
          <div style={{ marginTop: "1rem" }}>
            <Accordion items={faqs.filter((faq) => faq.group === "Warehousing" || faq.id === "figures")} />
          </div>
        </div>
      </section>

      <section className="band band-navy">
        <div className="shell cta-split">
          <h2>Tell us what is about to arrive.</h2>
          <div>
            <p>A quote can name the inbound, the handling note, and the dock. The form still does not send.</p>
            <div className="cta-row">
              <Link className="btn btn-signal" href="/quote">Request a quote</Link>
              <Link className="btn btn-line-light" href="/industries/food-and-beverage">Food and beverage</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
