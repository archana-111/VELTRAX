"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";
import { getGsap, isMobileMotion, prefersReducedMotion } from "@/lib/gsap-client";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: "div" | "span";
};

/**
 * Subtle magnetic pull on pointer — desktop only.
 * Strength stays low so it feels premium, not gimmicky.
 */
export function Magnetic({
  children,
  className,
  strength = 0.28,
  as: Tag = "div",
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion() || isMobileMotion()) return;

    const gsap = getGsap();
    const inner = node.querySelector<HTMLElement>("[data-magnetic-inner]") ?? node;

    const onMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      gsap.to(inner, {
        x: x * strength,
        y: y * strength,
        duration: 0.45,
        ease: "power3.out",
        overwrite: true,
      });
    };

    const onLeave = () => {
      gsap.to(inner, {
        x: 0,
        y: 0,
        duration: 0.55,
        ease: "power3.out",
        overwrite: true,
      });
    };

    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerleave", onLeave);
    return () => {
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
      gsap.set(inner, { clearProps: "transform" });
    };
  }, [strength]);

  const style = { display: "inline-flex" } satisfies CSSProperties;

  return (
    <Tag ref={ref as never} className={className} style={style}>
      <span data-magnetic-inner style={{ display: "inline-flex" }}>
        {children}
      </span>
    </Tag>
  );
}
