import type { Metadata } from "next";
import { Suspense } from "react";
import { images } from "@/data/images";
import { TrackPanel } from "@/components/forms/TrackPanel";
import { PageHero } from "@/components/ui/PageHero";
import { HomeCtaBlock } from "@/components/sections/HomeCtaBlock";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Track a shipment",
  description: "Look up a demonstration shipment. Three sample numbers show a timeline. No carrier API is connected.",
  path: "/track",
});

export default function TrackPage() {
  return (
    <>
      <PageHero
        kicker="Tracking"
        title="A milestone list with a place and a time."
        lede="Try VLX-24081-HAM, VLX-24092-SIN, or VLX-24105-ORD. Anything else returns a clear not-found state."
        image={images.containers}
        crumbs={[{ label: "Home", href: "/" }, { label: "Track" }]}
        action={{ href: "/quote", label: "Request a quote" }}
      />
      <section className="band">
        <div className="shell">
          <Suspense fallback={<p>Loading the demonstration tracker.</p>}>
            <TrackPanel />
          </Suspense>
        </div>
      </section>
      <HomeCtaBlock />
    </>
  );
}
