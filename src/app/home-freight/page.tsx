import type { Metadata } from "next";
import { HomeFreight } from "@/components/sections/HomeFreight";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Freight and transportation",
  description: "A freight-led VELTRAX homepage for ocean, air, road, and rail, with sample lanes and a mode switcher.",
  path: "/home-freight",
  image: "/images/road-freight.jpg",
  imageAlt: "Freight truck at dawn, a demonstration photograph",
});

export default function FreightHomePage() {
  return <HomeFreight />;
}
