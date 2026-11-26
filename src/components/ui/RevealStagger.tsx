"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type RevealStaggerProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  threshold?: number;
};

export function RevealStagger({
  children,
  className = "",
  as: Tag = "div",
  threshold = 0.1,
}: RevealStaggerProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const show = () => node.classList.add("is-in");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      show();
      return;
    }

    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
      show();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        show();
        observer.disconnect();
      },
      { threshold, rootMargin: "0px 0px -4% 0px" },
    );
    observer.observe(node);

    const failsafe = window.setTimeout(show, 2400);
    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, [threshold]);

  const classes = className ? `reveal-stagger ${className}` : "reveal-stagger";

  return (
    <Tag ref={ref} className={classes}>
      {children}
    </Tag>
  );
}
