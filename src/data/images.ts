import type { ImageAsset } from "@/types/content";

/**
 * Pexels photographs used as demonstration art.
 * Replace the files in /public/images and update alt text here.
 * See ASSET_LICENSES.md before packaging a commercial release.
 */
export const images = {
  port: {
    src: "/images/port-terminal.jpg",
    alt: "Container terminal photographed for Pexels, used here as demonstration art",
    width: 1600,
    height: 900,
  },
  vessel: {
    src: "/images/vessel-bow.jpg",
    alt: "Container ship alongside port cranes, a Pexels photograph used as demonstration art",
    width: 1600,
    height: 900,
  },
  air: {
    src: "/images/air-cargo.jpg",
    alt: "Aircraft on approach, a Pexels photograph used as demonstration art",
    width: 1600,
    height: 900,
  },
  road: {
    src: "/images/road-freight.jpg",
    alt: "Truck on a highway, a Pexels photograph used as demonstration art",
    width: 1600,
    height: 900,
  },
  rail: {
    src: "/images/rail-freight.jpg",
    alt: "Freight train, a Pexels photograph used as demonstration art",
    width: 1600,
    height: 900,
  },
  warehouse: {
    src: "/images/warehouse.jpg",
    alt: "Warehouse interior, a Pexels photograph used as demonstration art",
    width: 1600,
    height: 900,
  },
  customs: {
    src: "/images/customs-bay.jpg",
    alt: "Warehouse handling, a Pexels photograph used as demonstration art",
    width: 1600,
    height: 900,
  },
  containers: {
    src: "/images/containers-detail.jpg",
    alt: "Stacked shipping containers, a Pexels photograph used as demonstration art",
    width: 1600,
    height: 1200,
  },
  operations: {
    src: "/images/operations-team.jpg",
    alt: "Two people loading a delivery van, a Pexels photograph used as demonstration art",
    width: 1200,
    height: 1600,
  },
  corridor: {
    src: "/images/corridor-routes.jpg",
    alt: "Dot-matrix world map with sample corridors linking Los Angeles, Chicago, Santos, Rotterdam, Hamburg, Dubai, Shanghai, and Singapore",
    width: 1024,
    height: 546,
  },
} as const satisfies Record<string, ImageAsset>;

export type ImageKey = keyof typeof images;
