import Link from "next/link";
import { articles } from "@/data/articles";
import { images } from "@/data/images";
import { testimonials } from "@/data/company";
import { Frame } from "@/components/ui/Frame";
import { FreightHero } from "@/components/sections/FreightHero";

const lanes = ["Hamburg–Chicago", "Singapore–Rotterdam", "Santos–Rotterdam", "Shanghai–Los Angeles", "Dubai–Hamburg"];

const schedule = [
  { title: "Name the gate", text: "Collection city, delivery city, and the terminal if you know it." },
  { title: "Choose the clock", text: "Ocean for the plan, air for the exception, road for the dock, rail for density." },
  { title: "Hold the space", text: "Book against a cut-off or a window, and write the recovery if it is missed." },
  { title: "Report the leg", text: "A place, a time, and the next event. The track page shows the shape." },
];

export function HomeFreight() {
  return (
    <>
      <FreightHero />
      <section className="band-tight">
        <div className="shell">
          <p className="kicker">Sample lanes</p>
          <div className="lane-row" aria-label="Illustrated lanes">
            {lanes.map((lane) => (
              <span key={lane}>{lane}</span>
            ))}
          </div>
          <p className="muted" style={{ marginTop: "0.8rem" }}>Labels for the template. They are not a schedule.</p>
        </div>
      </section>
      <section className="band">
        <div className="shell">
          <div className="section-head">
            <h2>A movement, scheduled</h2>
            <p>Four moves, left to right. This is the freight homepage’s version of the operating sequence, kept shorter than the global page.</p>
          </div>
          <div className="schedule">
            {schedule.map((item, index) => (
              <article key={item.title}>
                <b>0{index + 1}</b>
                <strong>{item.title}</strong>
                <p className="muted">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="band band-sand">
        <div className="shell">
          <div className="section-head">
            <h2>Equipment follows the lane</h2>
            <p>No fleet count is published here. The photographs show the kinds of movement the sample company talks about.</p>
          </div>
          <div className="trio">
            <figure>
              <Frame image={images.road} sizes="(min-width: 800px) 55vw, 100vw" />
              <figcaption className="muted" style={{ marginTop: "0.45rem" }}>Road collection, demonstration photograph</figcaption>
            </figure>
            <div className="trio-side">
              <figure>
                <Frame image={images.rail} sizes="(min-width: 800px) 30vw, 100vw" />
                <figcaption className="muted">Rail</figcaption>
              </figure>
              <figure>
                <Frame image={images.air} sizes="(min-width: 800px) 30vw, 100vw" />
                <figcaption className="muted">Air</figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>
      <section className="band">
        <div className="shell" style={{ maxWidth: "52rem" }}>
          <p className="kicker">Sample voice</p>
          <blockquote className="quote-main">{testimonials[2].quote}</blockquote>
          <p style={{ marginTop: "1rem" }}>{testimonials[2].role}</p>
          <p className="muted">{testimonials[2].context}</p>
        </div>
      </section>
      <section className="band-tight">
        <div className="shell story-list">
          {articles.slice(0, 3).map((article) => (
            <Link key={article.slug} href={`/blog/${article.slug}`}>
              <span className="muted">{article.category}</span>
              <strong>{article.title}</strong>
            </Link>
          ))}
        </div>
      </section>
      <section className="band band-navy">
        <div className="shell cta-split">
          <h2>Price the lane you actually have.</h2>
          <div>
            <p>Tell the form the mode, the places, and the awkward dimension. The demonstration stops in the browser.</p>
            <Link className="btn btn-signal" href="/quote" style={{ marginTop: "1rem" }}>Request a quote</Link>
          </div>
        </div>
      </section>
    </>
  );
}
