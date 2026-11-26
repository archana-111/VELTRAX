"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
  threshold?: number;
  parallax?: boolean;
  clip?: boolean;
};

export function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
  threshold = 0,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let shown = false;
    let timer = 0;

    const reveal = () => {
      if (shown) return;
      shown = true;
      window.clearTimeout(timer);
      if (delay > 0) {
        timer = window.setTimeout(() => node.classList.add("is-in"), delay);
      } else {
        node.classList.add("is-in");
      }
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      reveal();
      return;
    }

    const inView = () => {
      const rect = node.getBoundingClientRect();
      return rect.top < window.innerHeight + 40 && rect.bottom > -40;
    };

    if (inView()) reveal();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        reveal();
        observer.disconnect();
      },
      { threshold, rootMargin: "48px 0px" },
    );
    observer.observe(node);

    const onScroll = () => {
      if (inView()) reveal();
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const failsafe = window.setTimeout(reveal, 900);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(failsafe);
      window.clearTimeout(timer);
    };
  }, [delay, threshold]);

  const classes = ["reveal", className].filter(Boolean).join(" ");
  const style = delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined;

  return (
    <Tag ref={ref} className={classes} style={style}>
      {children}
    </Tag>
  );
}
