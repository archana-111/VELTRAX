"use client";

import { useState } from "react";
import Link from "next/link";
import { images } from "@/data/images";
import { Frame } from "@/components/ui/Frame";

const modes = [
  {
    id: "ocean",
    label: "Ocean",
    title: "Freight that keeps the calendar honest.",
    text: "A sailing is a date with a cut-off. The sample ocean desk books against that date and names the person who owns the documents.",
    image: images.vessel,
    href: "/services/ocean-freight",
  },
  {
    id: "air",
    label: "Air",
    title: "The short list flies. The rest stays on the plan.",
    text: "Urgent references get a latest arrival and a recovery flight. Ordinary freight is not dragged into the same panic.",
    image: images.air,
    href: "/services/air-freight",
  },
  {
    id: "road",
    label: "Road",
    title: "The truck is planned from the dock backward.",
    text: "Collection windows, gate hours, and equipment are the brief. A highway photograph is not a fleet claim.",
    image: images.road,
    href: "/services/road-transportation",
  },
  {
    id: "rail",
    label: "Rail",
    title: "Density, a ramp, and a timetable.",
    text: "Rail is offered where the volume can wait for a departure, with the road legs written into the same quote.",
    image: images.rail,
    href: "/services/rail-freight",
  },
];

export function FreightHero() {
  const [active, setActive] = useState(modes[0].id);
  const mode = modes.find((item) => item.id === active) ?? modes[0];

  return (
    <section className="hero-b" aria-labelledby="freight-title">
      <Frame image={mode.image} priority sizes="100vw" />
      <div className="shell hero-b-layout">
        <div className="hero-b-panel">
          <p className="kicker">Freight and transportation</p>
          <h1 id="freight-title">{mode.title}</h1>
          <p className="lede" style={{ marginTop: "1rem" }}>{mode.text}</p>
          <div className="cta-row">
            <Link className="btn btn-navy" href={mode.href}>Open this mode</Link>
            <Link className="btn btn-line" href="/quote">Request a quote</Link>
          </div>
        </div>
        <div className="mode-switch" role="group" aria-label="Freight modes">
          {modes.map((item) => (
            <button key={item.id} type="button" aria-pressed={item.id === active} onClick={() => setActive(item.id)}>
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
