import { images } from "@/data/images";
import type { Service } from "@/types/content";

export const services: Service[] = [
  {
    slug: "ocean-freight",
    name: "Ocean freight",
    index: "01",
    short: "Port to port, planned against the sailing you actually need.",
    summary:
      "Full containers, grouped cargo, and project pieces moved on scheduled ocean services, with the paperwork kept in the same record as the booking.",
    image: images.vessel,
    disciplines: ["FCL", "LCL", "Project cargo", "Port coordination"],
    narrative: [
      "Ocean freight rewards a plan that starts before the container is stuffed. VELTRAX treats the sailing, the cut-off, and the document set as one conversation, so a late commercial invoice does not surface for the first time at the gate.",
      "The sample operation covers full containers and grouped cargo. Project pieces that need a flat rack or an open top are described in the same brief, with dimensions written the way a planner can use them.",
      "Nothing on this page is a live schedule. Sailing days, alliances, and port congestion change. Replace this copy with the trades you actually cover and link the tracking page to your own milestone feed.",
    ],
    capabilities: [
      {
        title: "Booking against a cut-off",
        text: "Space is requested with the cargo ready date, the port pair, and the document owner named before the booking is confirmed.",
      },
      {
        title: "Container and cargo fit",
        text: "Weight, cube, and handling notes are collected in the quote so the equipment suggestion is a response, not a guess.",
      },
      {
        title: "Origin and destination desks",
        text: "The sample record shows who hands the box to the terminal and who receives it after discharge, including the haulage leg.",
      },
      {
        title: "Document pack",
        text: "Bill of lading instructions, commercial papers, and packing detail sit beside the movement instead of in a separate inbox.",
      },
    ],
    considerations: [
      "Tell the desk if the cargo is hazardous, oversized, or temperature-aware before a sailing is proposed.",
      "Port storage and demurrage are commercial terms. This template does not quote them.",
      "Replace sample port pairs with the corridors your contracts actually support.",
    ],
  },
  {
    slug: "air-freight",
    name: "Air freight",
    index: "02",
    short: "When the calendar is shorter than an ocean transit.",
    summary:
      "Airport-to-airport and door-linked air cargo for shipments that need a defined handoff, a clear chargeable weight, and a readable status.",
    image: images.air,
    disciplines: ["Airport to airport", "Consolidation", "Charter enquiry", "Hand-carry desk"],
    narrative: [
      "Air freight is chosen when the date matters more than the lowest rate. The useful brief is short: ready time, pieces, dimensions, and what happens if the flight rolls.",
      "VELTRAX shows chargeable weight as a planning fact, not a surprise on the invoice. Dimensional notes collected on the quote form are the same notes an air planner would ask for.",
      "The photography and the lane names are demonstrations. Airline capacity, screening rules, and embargoes belong to your operation and to the carriers you appoint.",
    ],
    capabilities: [
      {
        title: "Defined handoff",
        text: "The record names the accepting terminal, the build-up cut-off, and the person who can amend a piece count.",
      },
      {
        title: "Chargeable weight",
        text: "Actual and volumetric weight are both requested so the quote conversation starts with the number that will be billed.",
      },
      {
        title: "Recovery plan",
        text: "If a flight is missed, the sample process asks for the next acceptable arrival, not only the original promise.",
      },
      {
        title: "Screening and papers",
        text: "Security and customs documents are listed before the cargo is tendered, with a named owner for each file.",
      },
    ],
    considerations: [
      "Batteries, liquids, and temperature-controlled pieces need a specific declaration. The demo form is not a dangerous-goods acceptance.",
      "Door delivery after the airport is a separate leg. Say so in the quote.",
      "Do not publish airline names unless you have permission to use them.",
    ],
  },
  {
    slug: "road-transportation",
    name: "Road transportation",
    index: "03",
    short: "Linehaul and collection timed to the warehouse, not to a slogan.",
    summary:
      "Regional and long-haul road freight planned around collection windows, equipment type, and the dock that will actually be open.",
    image: images.road,
    disciplines: ["Full truckload", "Groupage", "Port haulage", "Scheduled milk-runs"],
    narrative: [
      "A road plan fails in the small print: the dock height, the time the gate closes, the forklift that is already booked. VELTRAX puts those constraints next to the lane.",
      "The sample service covers full loads, grouped freight, and the trucking that connects a port or rail ramp to a warehouse. It does not invent a fleet size.",
      "Use this page to describe the regions you run, the equipment you can offer, and the way a customer books a collection. Delete the demonstration lanes.",
    ],
    capabilities: [
      {
        title: "Collection windows",
        text: "Quotes ask for a ready time and a site constraint, so dispatch is not planned against an empty clock.",
      },
      {
        title: "Equipment match",
        text: "Curtain, box, temperature, and tail-lift needs are separate choices, not a single generic truck.",
      },
      {
        title: "Port and ramp connection",
        text: "Ocean and rail pages hand their last mile to this service instead of describing a second, conflicting process.",
      },
      {
        title: "Proof of handoff",
        text: "The milestone record expects a collection and a delivery event, each with a place and a time.",
      },
    ],
    considerations: [
      "Driving-time rules and permits are local. Do not copy sample transit times into a contract.",
      "Site access notes belong in the quote message when they change the vehicle.",
      "Replace the highway photograph if your brand needs a marked fleet you have rights to show.",
    ],
  },
  {
    slug: "rail-freight",
    name: "Rail freight",
    index: "04",
    short: "Inland density for cargo that can keep a timetable.",
    summary:
      "Ramp-to-ramp rail for containers and consolidated inland moves, coordinated with the road legs on either end.",
    image: images.rail,
    disciplines: ["Ramp to ramp", "Inland container", "Scheduled departures", "Terminal transfer"],
    narrative: [
      "Rail is the right tool when the volume is steady and the inland distance is long enough to absorb a fixed departure. VELTRAX presents it as a timetable, not as a truck with different scenery.",
      "The sample page pairs a ramp-to-ramp move with the road collection that makes the ramp usable. A rail product that ignores the first and last kilometre is only half a service.",
      "Departure days in a live business come from the railway and from your allocations. This template keeps those fields as copy you can replace.",
    ],
    capabilities: [
      {
        title: "Ramp pair",
        text: "Origin ramp, destination ramp, and the cut-off for gate-in are the first three facts in the brief.",
      },
      {
        title: "Box suitability",
        text: "Weight, cargo type, and whether the container is already on a chassis are recorded before a departure is suggested.",
      },
      {
        title: "Road at each end",
        text: "Collection and delivery are planned as connected legs, with their own windows.",
      },
      {
        title: "Exception note",
        text: "If a train is annulled, the record asks which alternative — next departure or road — the customer will accept.",
      },
    ],
    considerations: [
      "Gauge, wagon type, and terminal rules are corridor-specific. Write the ones you operate.",
      "Do not imply a national network you do not serve.",
      "Sample city names on the map are illustrative labels, not offices.",
    ],
  },
  {
    slug: "warehousing",
    name: "Warehousing",
    index: "05",
    short: "Slots, receipts, and dispatch held to the same clock as the freight.",
    summary:
      "Inbound, storage, and outbound handled as part of the movement, with capacity described in language a planner can check.",
    image: images.warehouse,
    disciplines: ["Inbound", "Storage", "Pick and dispatch", "Inventory record"],
    narrative: [
      "A warehouse is useful when it knows which freight is about to arrive. VELTRAX connects the receipt to the shipment record so the building is not surprised by its own inbound.",
      "The sample layout talks about slots, handling, and dispatch windows. It does not claim a square-metre count, a certification, or a bonded status. Add those only when they are yours.",
      "Home 03 is the long version of this idea: an architectural page about capacity. This service page is the practical description you link from navigation.",
    ],
    capabilities: [
      {
        title: "Receipt against a reference",
        text: "Inbound is checked against the shipment or purchase reference the customer already uses.",
      },
      {
        title: "Slot logic",
        text: "Storage is described as available, reserved, or constrained, rather than as an undefined cloud of space.",
      },
      {
        title: "Dispatch window",
        text: "Outbound work is booked with a carrier and a dock time, not left as a same-day hope.",
      },
      {
        title: "Exception hold",
        text: "Damage, shortage, and hold-for-documents are statuses the record can show without a phone call.",
      },
    ],
    considerations: [
      "Temperature, hazardous storage, and bonded regimes need their own operating rules. Do not imply them here unless you run them.",
      "Inventory accuracy is an operating claim. Publish a method, not a invented percentage.",
      "Replace the interior photograph with your building if you have rights to the image.",
    ],
  },
];

export const freightTypes = services.map((service) => service.name);

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
