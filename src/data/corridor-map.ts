import { MAP_H, MAP_W } from "@/data/world-land";

export type CorridorCity = {
  id: string;
  label: string;
  x: number;
  y: number;
  anchor: "left" | "right" | "top" | "bottom";
  /** Extra label offset in viewBox units */
  labelOffset?: { x?: number; y?: number };
};

export type CorridorRoute = {
  id: string;
  from: string;
  to: string;
  d: string;
};

/** Pixel-tuned to the dotted land artwork (1024 × 546). */
export const corridorCities: CorridorCity[] = [
  { id: "los-angeles", label: "Los Angeles", x: 168, y: 248, anchor: "bottom", labelOffset: { y: 4 } },
  { id: "chicago", label: "Chicago", x: 248, y: 198, anchor: "top", labelOffset: { y: -4 } },
  { id: "santos", label: "Santos", x: 332, y: 392, anchor: "bottom", labelOffset: { y: 4 } },
  { id: "rotterdam", label: "Rotterdam", x: 512, y: 168, anchor: "left", labelOffset: { x: -6, y: -10 } },
  { id: "hamburg", label: "Hamburg", x: 532, y: 158, anchor: "right", labelOffset: { x: 6, y: -10 } },
  { id: "dubai", label: "Dubai", x: 668, y: 268, anchor: "bottom", labelOffset: { y: 4 } },
  { id: "shanghai", label: "Shanghai", x: 846, y: 228, anchor: "top", labelOffset: { y: -4 } },
  { id: "singapore", label: "Singapore", x: 802, y: 348, anchor: "bottom", labelOffset: { y: 4 } },
];

const cityById = Object.fromEntries(corridorCities.map((city) => [city.id, city]));

/** Soft cubic corridor — control points lift above the chord. */
function corridorPath(fromId: string, toId: string, lift = 0.32, bias = 0) {
  const a = cityById[fromId];
  const b = cityById[toId];
  if (!a || !b) return "";

  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const dist = Math.hypot(dx, dy) || 1;
  const nx = -dy / dist;
  const ny = dx / dist;
  const rise = dist * lift;

  const c1x = a.x + dx * 0.28 + nx * rise * (0.55 + bias);
  const c1y = a.y + dy * 0.28 + ny * rise * (0.55 + bias) - rise * 0.35;
  const c2x = a.x + dx * 0.72 + nx * rise * (0.45 - bias);
  const c2y = a.y + dy * 0.72 + ny * rise * (0.45 - bias) - rise * 0.35;

  return `M${a.x} ${a.y} C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${b.x} ${b.y}`;
}

export const corridorRoutes: CorridorRoute[] = [
  { id: "la-chicago", from: "los-angeles", to: "chicago", d: corridorPath("los-angeles", "chicago", 0.18, 0.1) },
  { id: "la-rotterdam", from: "los-angeles", to: "rotterdam", d: corridorPath("los-angeles", "rotterdam", 0.4, 0.15) },
  { id: "chicago-santos", from: "chicago", to: "santos", d: corridorPath("chicago", "santos", 0.22, -0.08) },
  { id: "chicago-dubai", from: "chicago", to: "dubai", d: corridorPath("chicago", "dubai", 0.36, 0.05) },
  { id: "santos-singapore", from: "santos", to: "singapore", d: corridorPath("santos", "singapore", 0.28, 0.1) },
  { id: "rotterdam-hamburg", from: "rotterdam", to: "hamburg", d: corridorPath("rotterdam", "hamburg", 0.08, 0) },
  { id: "hamburg-dubai", from: "hamburg", to: "dubai", d: corridorPath("hamburg", "dubai", 0.26, -0.05) },
  { id: "dubai-shanghai", from: "dubai", to: "shanghai", d: corridorPath("dubai", "shanghai", 0.3, 0.08) },
  { id: "dubai-singapore", from: "dubai", to: "singapore", d: corridorPath("dubai", "singapore", 0.2, -0.06) },
  { id: "singapore-shanghai", from: "singapore", to: "shanghai", d: corridorPath("singapore", "shanghai", 0.18, 0.05) },
];

export const CORRIDOR_VIEWBOX = { w: MAP_W, h: MAP_H };
