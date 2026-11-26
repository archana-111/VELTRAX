import { images } from "@/data/images";
import type { Project } from "@/types/content";

export const projects: Project[] = [
  {
    slug: "coastal-retail-replenishment",
    title: "A coastal replenishment, written as one calendar",
    sector: "Retail · sample study",
    mode: "Ocean, warehouse, road",
    lane: "Sample port pair into a regional DC",
    summary:
      "A demonstration of how a floor-set date, a sailing, and a warehouse slot can be planned as one record instead of three inboxes.",
    image: images.port,
    challenge: [
      "The sample merchant was setting promotional floors on a fixed Monday. Containers were being watched in a portal, the warehouse was being booked by phone, and the store list lived in a spreadsheet that nobody on the freight desk could see.",
      "Nothing in that arrangement was exotic. It was ordinary, and it failed in ordinary ways: freight arrived before the slot, cartons waited on the dock, and the store delivery was replanned in the same week it was supposed to happen.",
    ],
    approach: [
      "The sample plan named one reference for the purchase orders in the box, the sailing, and the warehouse receipt.",
      "Inland delivery was requested when the booking was made, with a hold status if the floor set was still two weeks away.",
      "Exceptions were limited to three words the merchant already understood: early, short, or held for documents.",
    ],
    record: [
      "The useful outcome in this sample is not a percentage. It is a record a store operations lead can read without calling the forwarder.",
      "Replace this study with a real movement you are allowed to describe. Do not borrow a retailer’s name.",
    ],
  },
  {
    slug: "machinery-two-coasts",
    title: "Machinery between two coasts",
    sector: "Manufacturing · sample study",
    mode: "Ocean project cargo and road",
    lane: "Sample east-coast plant to a west-coast cell",
    summary:
      "A demonstration of moving pieces that do not fit the weekly container habit, with dimensions and site access treated as the brief.",
    image: images.vessel,
    challenge: [
      "The sample plant was installing a cell. Two pieces needed an open top. The rest of the kit was ordinary cartons that could travel with a different sailing and did not need to.",
      "The first version of the brief said “machinery” and a total weight. That is not enough for equipment, a crane, or a gate.",
    ],
    approach: [
      "Pieces were listed with dimensions, lifting points, and whether they could be split from the cartons.",
      "The cartons took a standard container. The two long pieces took a later sailing that matched the site’s crane window.",
      "The receiving gate’s hours were written into the delivery leg before the vessel was booked.",
    ],
    record: [
      "The sample record shows two arrivals on purpose, instead of one arrival that the site could not unload.",
      "Publish real project stories only with the customer’s permission and with figures you can stand behind.",
    ],
  },
  {
    slug: "grocery-staging",
    title: "Staging a grocery peak without borrowing the outbound dock",
    sector: "Food and beverage · sample study",
    mode: "Warehouse and road",
    lane: "Sample regional DC to a store cluster",
    summary:
      "A demonstration of reserving inbound slots before a promotional peak, and of giving early freight a status that is not a blocked dock.",
    image: images.warehouse,
    challenge: [
      "The sample grocer knew the promotion. The building learned about it when the first trailers arrived and the outbound wave was already on the dock.",
      "Early freight and refused store deliveries were sharing floor space with live orders.",
    ],
    approach: [
      "Slots were reserved against the inbound plan two weeks before the first receipt.",
      "Early promotional freight was received into a named hold, not into the pick face.",
      "Refused deliveries were given a bay and a reason code so they did not re-enter the outbound queue by accident.",
    ],
    record: [
      "The study’s point is the status language: reserved, held, refused, dispatched. The template does not invent a waste percentage.",
      "Temperature regimes, if you operate them, need a true description and a true photograph.",
    ],
  },
  {
    slug: "spare-parts-air-bridge",
    title: "An air bridge for parts that stop a line",
    sector: "Service parts · sample study",
    mode: "Air and road",
    lane: "Sample airport pair with a same-night delivery",
    summary:
      "A demonstration of separating urgent spares from the weekly consolidation, with chargeable weight and a recovery flight agreed in advance.",
    image: images.air,
    challenge: [
      "The sample service desk was putting line-down parts into the same consolidation as ordinary replenishment. The consolidation was cheaper and regularly a day late for the only shipment that mattered.",
      "Dimensions were being guessed from a catalog photo.",
    ],
    approach: [
      "Line-down references were given an air product with a latest arrival, not a general “as soon as possible”.",
      "The quote captured piece dimensions so chargeable weight was known before the flight was chosen.",
      "A recovery option — the next flight the desk would accept — was written next to the first choice.",
    ],
    record: [
      "The sample ends with a milestone the plant manager can see: tendered, departed, arrived, out for delivery.",
      "Do not name an airline or a manufacturer unless you have the right to do so.",
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
