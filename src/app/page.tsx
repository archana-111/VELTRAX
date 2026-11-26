import type { Metadata } from "next";
import { HomeGlobal } from "@/components/sections/HomeGlobal";
import { HomeScrollMotion } from "@/components/motion/HomeScrollMotion";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Moving business beyond borders",
  description:
    "VELTRAX global logistics homepage. Sample freight, transportation, and supply chain pages for a demonstration company.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <HomeScrollMotion />
      <HomeGlobal />
    </>
  );
}
