import type { Shipment } from "@/types/content";

/**
 * Demonstration shipments. They do not represent live cargo.
 * Replace this array, or map a provider response onto the same shape.
 * Working sample numbers:
 *   VLX-24081-HAM
 *   VLX-24092-SIN
 *   VLX-24105-ORD
 */
export const shipments: Shipment[] = [
  {
    id: "VLX-24081-HAM",
    status: "On the water",
    progress: 62,
    mode: "Ocean freight",
    origin: "Sample ramp, Hamburg",
    destination: "Sample DC, Chicago",
    eta: "Estimated discharge 2 December 2026",
    pieces: "1 × 40-foot container",
    weight: "18,400 kg actual",
    milestones: [
      {
        label: "Booked",
        detail: "Sailing and document owner confirmed in the sample record.",
        time: "4 November 2026 · 09:10",
        state: "complete",
      },
      {
        label: "Collected",
        detail: "Container picked up against the collection window.",
        time: "6 November 2026 · 14:40",
        state: "complete",
      },
      {
        label: "Gate-in",
        detail: "Received at the sample origin terminal before cut-off.",
        time: "8 November 2026 · 11:05",
        state: "complete",
      },
      {
        label: "Departed",
        detail: "Vessel left the sample origin port.",
        time: "12 November 2026 · 19:20",
        state: "current",
      },
      {
        label: "Discharge",
        detail: "Estimated arrival at the sample discharge port.",
        time: "Estimated 2 December 2026",
        state: "upcoming",
      },
      {
        label: "Delivered",
        detail: "Road leg to the sample DC after release.",
        time: "Not yet scheduled",
        state: "upcoming",
      },
    ],
  },
  {
    id: "VLX-24092-SIN",
    status: "Held for a document",
    progress: 48,
    mode: "Air freight",
    origin: "Sample terminal, Singapore",
    destination: "Sample plant, Rotterdam",
    eta: "Departure waiting on a commercial invoice",
    pieces: "4 pieces",
    weight: "640 kg actual · 710 kg chargeable in the sample",
    milestones: [
      {
        label: "Booked",
        detail: "Air product selected with a recovery flight named.",
        time: "16 November 2026 · 08:00",
        state: "complete",
      },
      {
        label: "Tendered",
        detail: "Pieces accepted at the sample origin terminal.",
        time: "17 November 2026 · 21:15",
        state: "complete",
      },
      {
        label: "Held",
        detail: "Commercial invoice description does not match the packing list. Priya Raman (sample) owns the correction.",
        time: "18 November 2026 · 10:45",
        state: "current",
      },
      {
        label: "Departed",
        detail: "First choice flight, after the invoice is reissued.",
        time: "Waiting",
        state: "upcoming",
      },
      {
        label: "Out for delivery",
        detail: "Road leg from the sample destination airport.",
        time: "Not yet scheduled",
        state: "upcoming",
      },
    ],
  },
  {
    id: "VLX-24105-ORD",
    status: "Out for delivery",
    progress: 88,
    mode: "Road transportation",
    origin: "Sample DC, Chicago",
    destination: "Sample store cluster, Milwaukee",
    eta: "Delivery window today, 15:00–17:00 sample local time",
    pieces: "18 pallets",
    weight: "6,200 kg actual",
    milestones: [
      {
        label: "Received",
        detail: "Pallets received against the purchase-order reference.",
        time: "18 November 2026 · 07:30",
        state: "complete",
      },
      {
        label: "Staged",
        detail: "Held overnight so the outbound wave was not blocked.",
        time: "18 November 2026 · 16:10",
        state: "complete",
      },
      {
        label: "Dispatched",
        detail: "Trailer left the sample DC inside the dock window.",
        time: "19 November 2026 · 06:50",
        state: "complete",
      },
      {
        label: "Out for delivery",
        detail: "Driver is inside the sample delivery window.",
        time: "19 November 2026 · 13:05",
        state: "current",
      },
      {
        label: "Delivered",
        detail: "Proof of handoff not yet on the sample record.",
        time: "Expected before 17:00",
        state: "upcoming",
      },
    ],
  },
];

export function findShipment(raw: string) {
  const id = raw.trim().toUpperCase();
  return shipments.find((shipment) => shipment.id === id);
}
