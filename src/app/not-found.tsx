import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page is not part of the VELTRAX demonstration.",
};

export default function NotFound() {
  return (
    <section className="lost">
      <div className="shell">
        <p className="kicker">404</p>
        <h1>This lane is not on the map.</h1>
        <p className="lede stack-gap">
          The address does not match a page in the template. The shipment tracker and the service index are still where you left them.
        </p>
        <div className="cta-row">
          <Link className="btn btn-navy" href="/">Back to home</Link>
          <Link className="btn btn-line" href="/track">Track a shipment</Link>
        </div>
      </div>
    </section>
  );
}
