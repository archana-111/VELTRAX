"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  CORRIDOR_VIEWBOX,
  corridorCities,
  corridorRoutes,
} from "@/data/corridor-map";
import { MAP_H, MAP_W } from "@/data/world-land";
import { getGsap, prefersReducedMotion } from "@/lib/gsap-client";

export function NetworkMap() {
  const panelRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [activeCity, setActiveCity] = useState<string | null>(null);

  useLayoutEffect(() => {
    const panel = panelRef.current;
    const svg = svgRef.current;
    if (!panel || !svg) return;

    if (prefersReducedMotion()) {
      svg.querySelectorAll<SVGPathElement>(".network-route-base").forEach((path) => {
        path.style.strokeDasharray = "none";
        path.style.strokeDashoffset = "0";
      });
      return;
    }

    const gsap = getGsap();
    const land = svg.querySelector<SVGImageElement>(".network-land-image");
    const bases = Array.from(svg.querySelectorAll<SVGPathElement>(".network-route-base"));
    const flows = Array.from(svg.querySelectorAll<SVGPathElement>(".network-route-flow"));
    const nodes = Array.from(svg.querySelectorAll<SVGCircleElement>(".network-node-core"));
    const labels = Array.from(svg.querySelectorAll<SVGGElement>(".network-label"));

    const ctx = gsap.context(() => {
      bases.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      });

      flows.forEach((path) => {
        const length = path.getTotalLength();
        path.style.strokeDasharray = `${Math.max(12, length * 0.07)} ${length}`;
        path.style.strokeDashoffset = String(length);
      });

      if (land) gsap.set(land, { opacity: 0 });
      gsap.set(nodes, { scale: 0, transformOrigin: "50% 50%", transformBox: "fill-box" });
      gsap.set(labels, { opacity: 0, y: 6 });

      const intro = gsap.timeline({
        scrollTrigger: {
          trigger: panel,
          start: "top 80%",
          once: true,
        },
      });

      if (land) {
        intro.to(land, { opacity: 1, duration: 0.85, ease: "power2.out" }, 0);
      }

      intro.to(
        bases,
        {
          strokeDashoffset: 0,
          duration: 1.35,
          stagger: 0.05,
          ease: "power2.inOut",
        },
        0.18,
      );

      intro.to(
        nodes,
        {
          scale: 1,
          duration: 0.45,
          stagger: 0.035,
          ease: "back.out(1.6)",
        },
        0.48,
      );

      intro.to(
        labels,
        {
          opacity: 1,
          y: 0,
          duration: 0.42,
          stagger: 0.035,
          ease: "power2.out",
        },
        0.58,
      );

      flows.forEach((path, index) => {
        const length = path.getTotalLength();
        gsap.to(path, {
          strokeDashoffset: -length,
          duration: 3.2 + (index % 3) * 0.5,
          ease: "none",
          repeat: -1,
          delay: 1.05 + index * 0.14,
        });
      });

      gsap.to(nodes, {
        scale: 1.1,
        duration: 2.1,
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.18, from: "random" },
        ease: "sine.inOut",
        delay: 1.4,
      });
    }, panel);

    return () => ctx.revert();
  }, []);

  const relatedRoutes = useMemo(() => {
    if (!activeCity) return null;
    return new Set(
      corridorRoutes
        .filter((route) => route.from === activeCity || route.to === activeCity)
        .map((route) => route.id),
    );
  }, [activeCity]);

  const relatedCities = useMemo(() => {
    if (!activeCity) return null;
    return new Set(
      corridorRoutes.flatMap((route) =>
        route.from === activeCity || route.to === activeCity ? [route.from, route.to] : [],
      ),
    );
  }, [activeCity]);

  return (
    <figure ref={panelRef} className="network-panel">
      <div className="network-media network-media--vector">
        <svg
          ref={svgRef}
          className="network-svg network-svg--vector"
          viewBox={`0 0 ${CORRIDOR_VIEWBOX.w} ${CORRIDOR_VIEWBOX.h}`}
          role="img"
          aria-label="Dotted world map with sample logistics corridors between labeled cities"
        >
          <defs>
            <linearGradient id="network-flow-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f46b38" stopOpacity="0" />
              <stop offset="45%" stopColor="#ff8f5c" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#f46b38" stopOpacity="0" />
            </linearGradient>
            <filter id="network-node-glow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="2.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect className="network-board" x="0" y="0" width={MAP_W} height={MAP_H} />
          <image
            className="network-land-image"
            href="/images/corridor-land-dots.png"
            x="0"
            y="0"
            width={MAP_W}
            height={MAP_H}
            preserveAspectRatio="xMidYMid meet"
          />

          <g className="network-routes" fill="none">
            {corridorRoutes.map((route) => {
              const dimmed = relatedRoutes ? !relatedRoutes.has(route.id) : false;
              const lit = relatedRoutes ? relatedRoutes.has(route.id) : false;
              return (
                <g
                  key={route.id}
                  className={`network-route-group${lit ? " is-lit" : ""}${dimmed ? " is-dim" : ""}`}
                >
                  <path className="network-route-base" data-route={route.id} d={route.d} />
                  <path className="network-route-flow" data-route={route.id} d={route.d} />
                </g>
              );
            })}
          </g>

          {corridorCities.map((city) => {
            const isActive = activeCity === city.id;
            const isRelated = !relatedCities || relatedCities.has(city.id);
            const ox = city.labelOffset?.x ?? 0;
            const oy = city.labelOffset?.y ?? 0;
            const labelWidth = Math.max(64, city.label.length * 6.8 + 22);
            const gap = 14;
            // Always center text in the pill; shift the whole pill for left/right anchors.
            const labelX =
              (city.anchor === "right"
                ? gap + labelWidth / 2
                : city.anchor === "left"
                  ? -(gap + labelWidth / 2)
                  : 0) + ox;
            const labelY =
              (city.anchor === "bottom" ? 20 : city.anchor === "top" ? -18 : 0) + oy;

            return (
              <g
                key={city.id}
                className={`network-city${isActive ? " is-active" : ""}${!isRelated ? " is-dim" : ""}`}
                transform={`translate(${city.x} ${city.y})`}
              >
                <circle className="network-node-halo" r="14" />
                <circle className="network-node-ring" r="6.2" />
                <circle className="network-node-core" r="3.15" filter="url(#network-node-glow)" />
                <g className="network-label" transform={`translate(${labelX} ${labelY})`}>
                  <rect
                    className="network-label-bg"
                    x={-labelWidth / 2}
                    y="-11"
                    width={labelWidth}
                    height="22"
                    rx="11"
                  />
                  <text className="network-label-text" textAnchor="middle" x="0" y="4.5">
                    {city.label}
                  </text>
                </g>
                <circle
                  className="network-hit"
                  r="28"
                  tabIndex={0}
                  role="button"
                  aria-label={`${city.label} corridors`}
                  onMouseEnter={() => setActiveCity(city.id)}
                  onMouseLeave={() => setActiveCity(null)}
                  onFocus={() => setActiveCity(city.id)}
                  onBlur={() => setActiveCity(null)}
                />
              </g>
            );
          })}
        </svg>
      </div>
    </figure>
  );
}
