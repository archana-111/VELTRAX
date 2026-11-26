import type { Career, Faq, TeamMember, Testimonial } from "@/types/content";

export const team: TeamMember[] = [
  {
    name: "Mara Ellison",
    role: "Managing director",
    focus: "Sample profile. Sets the lane reviews and the standard for a readable record.",
    initials: "ME",
    photo: "/images/team/mara.jpg",
  },
  {
    name: "Jonah Voss",
    role: "Ocean desk",
    focus: "Sample profile. Sailings, cut-offs, and the document pack that travels with the box.",
    initials: "JV",
    photo: "/images/team/jonah.jpg",
  },
  {
    name: "Adele Okonkwo",
    role: "Air planning",
    focus: "Sample profile. Chargeable weight, recovery flights, and line-down references.",
    initials: "AO",
    photo: "/images/team/adele.jpg",
  },
  {
    name: "Luis Ferreira",
    role: "Road and rail",
    focus: "Sample profile. Collection windows, ramps, and the truck at each end of a train.",
    initials: "LF",
  },
  {
    name: "Hana Ito",
    role: "Warehousing",
    focus: "Sample profile. Slots, receipts, and dispatch windows tied to the freight reference.",
    initials: "HI",
  },
  {
    name: "Priya Raman",
    role: "Customs documentation",
    focus: "Sample profile. Descriptions, permits, and holds written as milestones. Not a real licence.",
    initials: "PR",
  },
  {
    name: "Evan Cho",
    role: "Customer desk",
    focus: "Sample profile. Quote questions and the person who keeps one status language.",
    initials: "EC",
  },
  {
    name: "Nora Berg",
    role: "Network design",
    focus: "Sample profile. Lane reviews and the decision to change a standing instruction.",
    initials: "NB",
  },
];

export const careers: Career[] = [
  {
    id: "freight-coordinator",
    title: "Freight coordinator",
    department: "Coordination",
    location: "Sample City · demonstration",
    type: "Full time",
    summary: "Turns quotes into bookings and keeps the milestone record in the same words the customer saw.",
    responsibilities: [
      "Check a brief for place, weight, pieces, and a document owner before it is priced.",
      "Write collection windows in the booking, including site constraints.",
      "Update the sample-style milestone list when a leg changes.",
    ],
  },
  {
    id: "warehouse-supervisor",
    title: "Warehouse supervisor",
    department: "Warehouse",
    location: "Sample City · demonstration",
    type: "Full time",
    summary: "Runs inbound and dispatch against a slot plan, and keeps held freight out of the pick face.",
    responsibilities: [
      "Receive against the freight reference, not a second numbering system.",
      "Reserve space for known peaks before the trailers arrive.",
      "Give early, short, and refused freight a status the outbound wave can see.",
    ],
  },
  {
    id: "customs-specialist",
    title: "Customs specialist",
    department: "Compliance",
    location: "Sample City · demonstration",
    type: "Full time",
    summary: "Prepares entries from facts collected before departure. This listing does not describe a real licence.",
    responsibilities: [
      "Compare the commercial description with the packing list before filing.",
      "Name the owner of each permit and each invoice.",
      "Write authority questions into the milestone record in plain language.",
    ],
  },
  {
    id: "network-planner",
    title: "Network planner",
    department: "Planning",
    location: "Sample City · hybrid demonstration",
    type: "Full time",
    summary: "Reviews lanes on a schedule and separates urgent products from the weekly consolidation.",
    responsibilities: [
      "Write a lane as a mode, a handoff, a document owner, and a date variance.",
      "Recommend rail only where the volume can hold a timetable.",
      "Change the standing instruction when the review says the lane is wrong.",
    ],
  },
];

export const careerDepartments = ["All", ...Array.from(new Set(careers.map((role) => role.department)))];

export const faqs: Faq[] = [
  {
    id: "quote-facts",
    group: "Quotes",
    question: "What do you need before you can price a shipment?",
    answer:
      "A usable brief names the collection and delivery places, the ready date, the piece count, the weight, the longest dimensions, the mode you have in mind, and a person who owns the documents. The quote form in this template collects those fields. In the demo, nothing is sent.",
  },
  {
    id: "quote-demo",
    group: "Quotes",
    question: "Does the quote form reach a person?",
    answer:
      "No. The form validates in the browser and then confirms that the submission stayed on the device. Connect it to your inbox, CRM, or form service before you publish. The documentation describes that handoff.",
  },
  {
    id: "track-demo",
    group: "Tracking",
    question: "Which tracking numbers work on the demo?",
    answer:
      "Three sample records are included: VLX-24081-HAM, VLX-24092-SIN, and VLX-24105-ORD. Any other number shows a not-found state. They are not live shipments.",
  },
  {
    id: "track-live",
    group: "Tracking",
    question: "Can this page show my carrier’s live events?",
    answer:
      "Not until you replace the local dataset. The timeline is shaped so a provider response can be mapped onto origin, destination, status, and milestones. There is no tracking API key in the template.",
  },
  {
    id: "documents",
    group: "Documents",
    question: "Who prepares customs entries?",
    answer:
      "The customs page describes a sample way of working. It is not a brokerage licence and it is not legal advice. Publish only the filings you are authorised to make, in the jurisdictions where you are authorised to make them.",
  },
  {
    id: "hold",
    group: "Documents",
    question: "What happens when a shipment is held?",
    answer:
      "In the sample record, a hold is a milestone with a reason and a next action. It is not a separate portal. One of the demo shipments is currently in that state so you can see the wording.",
  },
  {
    id: "warehouse",
    group: "Warehousing",
    question: "How is warehouse space described?",
    answer:
      "As reserved, free, or held. The template does not invent a square-metre count or a certification. Add your real capacity, your systems, and your handling rules on the warehousing pages.",
  },
  {
    id: "temperature",
    group: "Warehousing",
    question: "Do you store temperature-controlled goods?",
    answer:
      "The sample copy mentions handling notes. It does not claim a cold store, a licence, or a monitored range. Write those facts only if they are true of your building.",
  },
  {
    id: "careers-apply",
    group: "Company",
    question: "How do applications work?",
    answer:
      "They do not. Career listings are sample roles. The discuss link opens the contact form, which is also a demonstration and does not deliver a message. Point the button at your own applicant system.",
  },
  {
    id: "figures",
    group: "Company",
    question: "Are the numbers on the site performance claims?",
    answer:
      "No. Counts on the homepage describe the sample map and the template itself, and they are labeled as demonstration figures. Replace them with published numbers you can evidence, or remove the band.",
  },
];

export const faqGroups = ["All", ...Array.from(new Set(faqs.map((faq) => faq.group)))];

export const testimonials: Testimonial[] = [
  {
    quote:
      "The useful change was not a new portal. It was a brief the planner could book, and a status line the warehouse did not have to translate.",
    role: "Sample operations lead",
    context: "Demonstration testimonial · manufacturing account",
  },
  {
    quote:
      "We stopped finding out about the slot when the container was already on the quay. The date was in the booking, next to the sailing.",
    role: "Sample replenishment manager",
    context: "Demonstration testimonial · retail account",
  },
  {
    quote:
      "Line-down parts left the weekly consolidation. The rest of the freight got quieter because the urgent box had its own rule.",
    role: "Sample service-desk supervisor",
    context: "Demonstration testimonial · parts account",
  },
];

export const processSteps = [
  {
    index: "01",
    title: "Listen",
    text: "Place, date, pieces, weight, dimensions, and the person who owns the documents.",
  },
  {
    index: "02",
    title: "Plan",
    text: "A mode, a handoff, and a note about what happens if the first departure is missed.",
  },
  {
    index: "03",
    title: "Book",
    text: "Space or a slot held against that plan, not against a slogan and a total weight.",
  },
  {
    index: "04",
    title: "Move",
    text: "Milestones written as they happen: a place, a time, and the next expected event.",
  },
  {
    index: "05",
    title: "Close",
    text: "Delivery noted, exceptions filed in the same list, standing instructions updated if the lane was wrong.",
  },
];

export const sampleMetrics = [
  { value: 36, suffix: "", label: "Illustrated lanes on the sample schematic" },
  { value: 5, suffix: "", label: "Service pages shipped in this template" },
  { value: 5, suffix: "", label: "Steps in the sample operating sequence" },
];
