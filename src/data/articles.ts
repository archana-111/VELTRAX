import { images } from "@/data/images";
import type { Article } from "@/types/content";

export const articles: Article[] = [
  {
    slug: "brief-a-forwarder",
    title: "How to brief a forwarder so the first quote is usable",
    excerpt:
      "A useful freight brief is shorter than a proposal and more specific than a lane and a weight. Here is the list a planner can actually book from.",
    category: "Planning",
    date: "4 March 2026",
    readMinutes: 6,
    image: images.containers,
    author: "VELTRAX desk · sample byline",
    blocks: [
      {
        paragraphs: [
          "Most slow quotes are not slow because the rate is hard. They are slow because the brief cannot be priced. “A container from Asia to the coast, about 18 tons” leaves the planner to invent the port, the ready date, and whether the cargo is one piece or four hundred cartons.",
          "This note is sample guidance for the template. It is not a contract and it is not a claim about how any named forwarder works.",
        ],
      },
      {
        heading: "Write the place, not the region",
        paragraphs: [
          "Name the collection city and the delivery city. If you know the terminal or the ramp, write that too. A region is a sales word. A planner books a gate.",
          "If the delivery site closes at 15:00 or cannot take a full trailer, that fact belongs in the first message. It changes the equipment and the day.",
        ],
      },
      {
        heading: "Weight, pieces, and the awkward dimension",
        paragraphs: [
          "Give actual weight, a piece count, and the longest side. If you have a packing list, attach the idea of it even in a demo: one line per piece is enough to see whether the freight fits the box you have in mind.",
          "Volumetric weight is not a trick. It is the number air and sometimes road will bill. A brief that hides dimensions creates a second quote.",
        ],
      },
      {
        heading: "Name a person for the documents",
        paragraphs: [
          "Say who can reissue the invoice and who can answer a customs question. A booking without a document owner is a future hold.",
          "The quote form in this template asks for those facts on purpose. When you connect it to a real inbox or CRM, keep the fields. Do not collapse them into a single message box.",
        ],
      },
    ],
  },
  {
    slug: "when-air-is-quieter",
    title: "When air freight is the quieter choice",
    excerpt:
      "Air is not only the expensive button. Used on the right references, it makes the rest of the week simpler.",
    category: "Air",
    date: "18 February 2026",
    readMinutes: 5,
    image: images.air,
    author: "VELTRAX desk · sample byline",
    blocks: [
      {
        paragraphs: [
          "Teams reach for air in a panic and then resent the invoice. The calmer use is earlier: a small set of references that are allowed to fly, with a rule for everything else.",
          "This article uses a sample service desk. It does not quote airline tariffs or promise a transit time.",
        ],
      },
      {
        heading: "Separate the reference, not the customer",
        paragraphs: [
          "A customer can have both a weekly consolidation and a line-down product. The mistake is one standing instruction that tries to cover both.",
          "Give the urgent reference a latest arrival and a recovery flight. “As soon as possible” is not an instruction a night shift can execute.",
        ],
      },
      {
        heading: "Know the number you will be billed",
        paragraphs: [
          "Chargeable weight is the greater of actual and volumetric weight, under the rules of the product you book. Measure the piece. A catalog photo is not a measurement.",
          "The quote form asks for dimensions for this reason. If your live integration prices automatically, still show the chargeable weight back to the person who asked.",
        ],
      },
      {
        heading: "Leave the consolidation alone",
        paragraphs: [
          "Once the urgent pieces have a product of their own, the weekly air or ocean consolidation can run on time. That is the quiet part. The building, the plant, and the store stop treating every shipment as an exception.",
        ],
      },
    ],
  },
  {
    slug: "reading-a-slot-plan",
    title: "How to read a warehouse slot plan",
    excerpt:
      "Capacity is not a feeling about the building. It is a list of what is reserved, what is free, and what is holding for a reason.",
    category: "Warehousing",
    date: "2 February 2026",
    readMinutes: 7,
    image: images.warehouse,
    author: "VELTRAX desk · sample byline",
    blocks: [
      {
        paragraphs: [
          "A slot plan is a promise about floor and racking, made before the truck arrives. If the plan is only a picture in someone’s head, the outbound wave will meet the inbound in the doorway.",
          "The language below matches the warehousing pages in this template. Change the words if your WMS uses different ones, and then use those words everywhere.",
        ],
      },
      {
        heading: "Three states are enough to start",
        paragraphs: [
          "Reserved means a known inbound has a place. Free means the place can be promised. Held means the freight is in the building and must not be picked: early for a promotion, short of documents, or damaged.",
          "Teams get into trouble when held freight is invisible and therefore gets treated as free. A status that is not on the record will be walked through.",
        ],
      },
      {
        heading: "Tie the slot to a reference you already have",
        paragraphs: [
          "Use the purchase order, the container number, or the shipment id the customer already tracks. A warehouse reference that does not match the freight reference creates a second inventory.",
          "Home 03 shows this as a sequence: inbound, storage, pick, dispatch. The sequence is the plan. The building is where it happens.",
        ],
      },
      {
        heading: "Peaks are booked, not absorbed",
        paragraphs: [
          "A promotion, a seasonal reset, or a plant shutdown is a known inbound. Reserve it when you know about it. Heroics on the day are a sign the slot plan was never written down.",
        ],
      },
    ],
  },
  {
    slug: "documents-that-stall-a-border",
    title: "The documents that stall a border",
    excerpt:
      "Holds are often missing facts with a official stamp on them. A checklist written before departure is cheaper than storage after arrival.",
    category: "Borders",
    date: "15 January 2026",
    readMinutes: 6,
    image: images.customs,
    author: "VELTRAX desk · sample byline",
    blocks: [
      {
        paragraphs: [
          "This is not legal advice and it is not a brokerage manual. It is a planning note: the papers that most often arrive late, described so a shipper can see them before the cargo moves.",
          "Licences, regimes, and the right to file an entry are local. Describe only the ones you hold.",
        ],
      },
      {
        heading: "The description has to match the box",
        paragraphs: [
          "A commercial description written for a catalog is often too vague for an entry. If the invoice says “parts” and the packing list says six different parts, expect a question.",
          "Agree the description before the goods are collected. Changing it after departure is how a simple export becomes a story.",
        ],
      },
      {
        heading: "Value, origin, and the permit nobody named",
        paragraphs: [
          "The value on the invoice, the currency, and any assist or royalty the importer is obliged to declare need an owner. So does origin, when the lane depends on it.",
          "Permits are not a customs surprise. If the commodity needs one, the permit’s owner belongs in the brief next to the document owner for the invoice.",
        ],
      },
      {
        heading: "Put the question in the milestone",
        paragraphs: [
          "When an authority asks for something, the tracking record should say what was asked and who is answering. “Customs hold” on its own is a status that produces phone calls.",
          "The sample shipments in this template include a hold milestone so you can see the pattern. Replace them with your live events when you connect a provider.",
        ],
      },
    ],
  },
  {
    slug: "rail-for-inland-density",
    title: "Rail is for inland density, not for scenery",
    excerpt:
      "A ramp-to-ramp product works when the volume is steady and the road legs on each end are part of the product.",
    category: "Rail",
    date: "9 December 2025",
    readMinutes: 5,
    image: images.rail,
    author: "VELTRAX desk · sample byline",
    blocks: [
      {
        paragraphs: [
          "Rail gets marketed as the thoughtful alternative to a truck. Operators know it is a timetable with a gate-in cut-off and a ramp that may be an hour from the shipper’s dock.",
          "Use it where those facts are acceptable. Do not use a rail page to imply a network you have not allocated.",
        ],
      },
      {
        heading: "The product includes the road",
        paragraphs: [
          "A container on a train still needs a collection and a delivery. If those legs are planned by someone who does not know the train cut-off, the box misses the departure and the rate comparison was fiction.",
          "Write the ramp pair and the truck windows as one quote.",
        ],
      },
      {
        heading: "Steady freight loves a fixed departure",
        paragraphs: [
          "Weekly volume that can wait for a named departure is the rail case. A single urgent box is usually a road or air case wearing a rail headline.",
          "When a departure is annulled, decide in advance whether the customer will take the next train or a truck. That decision should not be invented at midnight.",
        ],
      },
      {
        heading: "Say what you do not serve",
        paragraphs: [
          "A schematic map with sample cities is a design device in this template. Your page should list ramps you can actually book. Taking the others off is part of making the site honest.",
        ],
      },
    ],
  },
  {
    slug: "what-a-milestone-record-holds",
    title: "What a milestone record should hold",
    excerpt:
      "Tracking is a sentence with a time and a place. If it needs a legend, it will not be read on a dock.",
    category: "Records",
    date: "20 November 2025",
    readMinutes: 6,
    image: images.road,
    author: "VELTRAX desk · sample byline",
    blocks: [
      {
        paragraphs: [
          "People ask for visibility and then receive a portal with twelve colours. A useful record is smaller. It says where the freight is, what just happened, and what is supposed to happen next.",
          "The track page in this template is a demonstration of that shape. It is not connected to a carrier.",
        ],
      },
      {
        heading: "One status language",
        paragraphs: [
          "Pick words you will use in the warehouse, on the truck, and at the border. The sample set is: booked, collected, departed, arrived, held, out for delivery, delivered.",
          "If your provider uses different codes, translate them before they reach the customer. Do not make the customer learn the provider’s abbreviations.",
        ],
      },
      {
        heading: "Every event needs a place and a time",
        paragraphs: [
          "“In transit” without a place is a mood. “Departed sample ramp, 06:40” is a milestone. The demo shipments follow that pattern so you can see how little data a clear timeline needs.",
          "Estimated arrival should be labeled as an estimate. The template does that. Keep the habit when you wire a live feed.",
        ],
      },
      {
        heading: "Write the exception in the same list",
        paragraphs: [
          "A hold is not a separate system. It is the current milestone, with the question and the owner. When the hold clears, the next event is delivery, not a return to a vague in-transit.",
          "See the documentation for where a real tracking provider would replace the local dataset.",
        ],
      },
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function relatedArticles(slug: string, count = 2) {
  const current = getArticle(slug);
  if (!current) return [];
  const same = articles.filter((article) => article.slug !== slug && article.category === current.category);
  const others = articles.filter((article) => article.slug !== slug && article.category !== current.category);
  return [...same, ...others].slice(0, count);
}

export const articleCategories = ["All", ...Array.from(new Set(articles.map((article) => article.category)))];
