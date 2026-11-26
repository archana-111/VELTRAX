"use client";

import Link from "next/link";
import { images } from "@/data/images";
import { Frame } from "@/components/ui/Frame";
import { Magnetic } from "@/components/motion/Magnetic";

export function HomeCtaBlock() {
  return (
    <section className="home-cta" data-motion="cta" aria-labelledby="cta-title">
      <Frame image={images.port} sizes="100vw" />
      <div className="home-cta-shade" aria-hidden="true" />
      <div className="shell home-cta-copy">
        <h2 id="cta-title">Write the brief before you ask for a rate.</h2>
        <p>
          The quote form checks place, weight, pieces, and a document owner on this device. Nothing is
          sent until you connect it.
        </p>
        <div className="home-cta-actions">
          <Magnetic strength={0.22}>
            <Link className="btn btn-signal" href="/quote">
              Request a quote
            </Link>
          </Magnetic>
          <Magnetic strength={0.18}>
            <Link className="btn btn-line-light" href="/track">
              Track a shipment
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
