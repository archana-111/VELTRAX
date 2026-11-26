import type { Metadata } from "next";
import { HomeWarehouse } from "@/components/sections/HomeWarehouse";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Warehousing and supply chain",
  description: "A warehouse-led VELTRAX homepage about slots, receipts, and dispatch, using demonstration content only.",
  path: "/home-warehousing",
  image: "/images/warehouse.jpg",
  imageAlt: "Distribution warehouse interior, a demonstration photograph",
});

export default function WarehouseHomePage() {
  return <HomeWarehouse />;
}
