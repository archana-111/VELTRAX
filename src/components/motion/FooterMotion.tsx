"use client";

import { useLayoutEffect } from "react";
import { getGsap, prefersReducedMotion, ScrollTrigger } from "@/lib/gsap-client";
import { motion } from "@/lib/motion";

/** Progressive footer reveal on every page (skipped on home — HomeScrollMotion owns it). */
export function FooterMotion() {
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    if (document.documentElement.classList.contains("has-home-motion")) return;

    const footer = document.querySelector<HTMLElement>(".site-footer");
    if (!footer) return;

    const gsap = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        footer.querySelector(".footer-mark"),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: motion.duration.sm,
          ease: motion.ease.out,
          scrollTrigger: { trigger: footer, start: "top 94%", once: true },
        },
      );
      gsap.fromTo(
        footer.querySelectorAll(".footer-grid > *"),
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: motion.duration.xs,
          stagger: motion.stagger.tight,
          ease: motion.ease.outSoft,
          scrollTrigger: {
            trigger: footer.querySelector(".footer-grid"),
            start: "top 96%",
            once: true,
          },
        },
      );
      ScrollTrigger.refresh();
    }, footer);

    return () => ctx.revert();
  }, []);

  return null;
}
