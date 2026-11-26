import { images } from "@/data/images";
import type { Industry } from "@/types/content";

export const industries: Industry[] = [
  {
    slug: "manufacturing",
    name: "Manufacturing",
    index: "01",
    summary:
      "Inbound parts and outbound finished goods kept on a plan the plant can read before the dock is blocked.",
    image: images.containers,
    pressures: [
      "A line stop costs more than a premium on one lane.",
      "Suppliers ship in different modes, and the plant still needs one receiving calendar.",
      "Project cargo for a new cell does not fit the weekly groupage habit.",
    ],
    approach: [
      "Separate the replenishment lane from the project move, and give each a document owner.",
      "Put the plant’s receiving window into the booking, not into a note after the truck is rolling.",
      "Use the milestone record to show what is on the water, what is in the air, and what is already at the dock.",
    ],
    serviceSlugs: ["ocean-freight", "air-freight", "road-transportation", "warehousing"],
    projectSlug: "machinery-two-coasts",
  },
  {
    slug: "retail",
    name: "Retail",
    index: "02",
    summary:
      "Store and e-commerce replenishment planned against a floor set date, with the warehouse in the same conversation as the port.",
    image: images.port,
    pressures: [
      "A promotion date does not move because a container rolled.",
      "Carton-level accuracy matters once freight becomes pick-face stock.",
      "Returns and overages need a place to sit that is not the outbound dock.",
    ],
    approach: [
      "Book inland capacity when the sailing is booked, not when the vessel is already at the pilot station.",
      "Receive against the purchase order the merchant already uses.",
      "Keep a hold status for freight that arrives too early for the floor set.",
    ],
    serviceSlugs: ["ocean-freight", "warehousing", "road-transportation", "rail-freight"],
    projectSlug: "coastal-retail-replenishment",
  },
  {
    slug: "automotive",
    name: "Automotive",
    index: "03",
    summary:
      "Sequenced parts and service components moved with the intolerance for a vague arrival that this industry already has.",
    image: images.rail,
    pressures: [
      "Sequence breaks are visible immediately on the line.",
      "Service parts have a different clock from production parts.",
      "Packaging is part of the freight, not an afterthought.",
    ],
    approach: [
      "Name the sequence or dealer order in the shipment reference.",
      "Choose rail where the density is steady and air where a line would otherwise stop.",
      "Record packaging constraints in the quote so the equipment is chosen on purpose.",
    ],
    serviceSlugs: ["road-transportation", "rail-freight", "air-freight", "warehousing"],
    projectSlug: "spare-parts-air-bridge",
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    index: "04",
    summary:
      "Shipments with a handling note, a document standard, and no appetite for an unnamed exception.",
    image: images.air,
    pressures: [
      "Some products cannot wait for the next weekly consolidation.",
      "Paperwork is part of the product’s right to move.",
      "A missed handoff is an operational incident, not a tracking curiosity.",
    ],
    approach: [
      "Collect handling constraints before a mode is proposed.",
      "Pair the movement with the customs facts that release depends on.",
      "Write exceptions in the milestone record while there is still a next flight or a next dispatch.",
    ],
    serviceSlugs: ["air-freight", "road-transportation", "warehousing", "ocean-freight"],
    projectSlug: "spare-parts-air-bridge",
  },
  {
    slug: "energy",
    name: "Energy",
    index: "05",
    summary:
      "Project pieces, spares, and remote-site deliveries described with dimensions, permits, and a realistic handoff.",
    image: images.vessel,
    pressures: [
      "Pieces do not fit a standard box, and the site may not fit a standard truck.",
      "Permits and lifting plans take longer than the transit.",
      "A spare that is late idles equipment that costs more than the freight.",
    ],
    approach: [
      "Treat project cargo and urgent spares as different products with different desks.",
      "Ask for dimensions and site access in the quote, in a format a planner can check.",
      "Attach the permit owner to the record before the cargo is collected.",
    ],
    serviceSlugs: ["ocean-freight", "air-freight", "road-transportation", "rail-freight"],
    projectSlug: "machinery-two-coasts",
  },
  {
    slug: "food-and-beverage",
    name: "Food and beverage",
    index: "06",
    summary:
      "Groceries and ingredients staged so the temperature note, the slot, and the store delivery are one plan.",
    image: images.warehouse,
    pressures: [
      "Shelf life runs during the transit, not after it.",
      "Promotional peaks need space before they need trucks.",
      "A refused delivery has to go somewhere specific.",
    ],
    approach: [
      "Write the handling note into the booking and into the warehouse receipt.",
      "Reserve slots against the inbound you already know about.",
      "Give refused or early freight a status that is not “lost in the building”.",
    ],
    serviceSlugs: ["warehousing", "road-transportation", "ocean-freight", "rail-freight"],
    projectSlug: "grocery-staging",
  },
];

export function getIndustry(slug: string) {
  return industries.find((industry) => industry.slug === slug);
}
