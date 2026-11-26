"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { ScrollTrigger, getGsap, prefersReducedMotion } from "@/lib/gsap-client";

let lenisSingleton: Lenis | null = null;

export function getLenis() {
  return lenisSingleton;
}

export function ScrollMotionInit() {
  useEffect(() => {
    getGsap();

    if (prefersReducedMotion()) {
      document.documentElement.classList.add("motion-reduced");
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("resize", refresh);
      return () => window.removeEventListener("resize", refresh);
    }

    document.documentElement.classList.add("has-lenis");
    document.documentElement.style.scrollBehavior = "auto";

    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.25,
      wheelMultiplier: 0.95,
      autoRaf: false,
    });
    lenisSingleton = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const gsap = getGsap();
    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const refresh = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", refresh);
    window.addEventListener("load", refresh);

    const fontsReady = document.fonts?.ready;
    if (fontsReady) {
      void fontsReady.then(refresh);
    }

    return () => {
      window.removeEventListener("resize", refresh);
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisSingleton = null;
      document.documentElement.classList.remove("has-lenis");
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  return null;
}
