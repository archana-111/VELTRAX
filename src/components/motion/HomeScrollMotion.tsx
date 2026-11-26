"use client";

import { useLayoutEffect } from "react";
import { getGsap, isMobileMotion, prefersReducedMotion, ScrollTrigger } from "@/lib/gsap-client";
import { maskWords, motion, revealStatic } from "@/lib/motion";

/**
 * Section-specific home choreography.
 * Each block uses a distinct technique — wipe, draw, pin, or stagger —
 * rather than a repeated fade-up.
 */
export function HomeScrollMotion() {
  useLayoutEffect(() => {
    const main = document.getElementById("main");
    if (!main) return;

    document.documentElement.classList.add("has-home-motion");
    revealStatic(main);
    revealStatic(document.querySelector(".site-footer") ?? document);

    if (prefersReducedMotion()) {
      return () => document.documentElement.classList.remove("has-home-motion");
    }

    const gsap = getGsap();
    const mobile = isMobileMotion();

    const ctx = gsap.context(() => {
      /* ——— Position / About ——— */
      const position = main.querySelector<HTMLElement>("[data-motion='position']");
      if (position) {
        const title = position.querySelector("#position-title");
        maskWords(title);
        const frame = position.querySelector(".home-position-media .frame");
        const img = position.querySelector(".home-position-media img");
        const copyBits = position.querySelectorAll(
          ".kicker, .lede, .text-link, .home-metrics li",
        );

        if (title) {
          gsap.fromTo(
            title.querySelectorAll(".motion-line-inner"),
            { yPercent: 110 },
            {
              yPercent: 0,
              duration: motion.duration.md,
              stagger: motion.stagger.tight,
              ease: motion.ease.cinematic,
              scrollTrigger: { trigger: position, start: motion.start.base, once: true },
            },
          );
        }

        if (frame) {
          gsap.fromTo(
            frame,
            { clipPath: "inset(0 0 100% 0)" },
            {
              clipPath: "inset(0 0 0% 0)",
              duration: motion.duration.lg,
              ease: motion.ease.outExpo,
              scrollTrigger: { trigger: position, start: motion.start.base, once: true },
            },
          );
        }

        if (img && !mobile) {
          gsap.fromTo(
            img,
            { scale: 1.12, yPercent: -4 },
            {
              scale: 1,
              yPercent: 0,
              ease: motion.ease.none,
              scrollTrigger: {
                trigger: position,
                start: "top 85%",
                end: "bottom 35%",
                scrub: motion.scrub.soft,
              },
            },
          );
        }

        gsap.fromTo(
          copyBits,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: motion.duration.sm,
            stagger: motion.stagger.base,
            ease: motion.ease.out,
            scrollTrigger: { trigger: position, start: "top 72%", once: true },
          },
        );
      }

      /* ——— Process / sequence ——— */
      const sequence = main.querySelector<HTMLElement>("[data-motion='sequence']");
      if (sequence) {
        const intro = sequence.querySelectorAll(".home-sequence-intro > *");
        const media = sequence.querySelector(".home-sequence-media .frame");
        const steps = sequence.querySelectorAll<HTMLElement>(".home-steps li");

        gsap.fromTo(
          intro,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: motion.duration.sm,
            stagger: motion.stagger.base,
            ease: motion.ease.out,
            scrollTrigger: { trigger: sequence, start: motion.start.base, once: true },
          },
        );

        if (media) {
          gsap.fromTo(
            media,
            { clipPath: "inset(0 55% 0 0)" },
            {
              clipPath: "inset(0 0% 0 0)",
              ease: motion.ease.none,
              scrollTrigger: {
                trigger: sequence,
                start: "top 70%",
                end: "top 28%",
                scrub: motion.scrub.base,
              },
            },
          );
        }

        steps.forEach((step, index) => {
          gsap.fromTo(
            step,
            { opacity: 0.35, y: 18 },
            {
              opacity: 1,
              y: 0,
              duration: motion.duration.sm,
              ease: motion.ease.outSoft,
              scrollTrigger: {
                trigger: step,
                start: "top 88%",
                once: true,
              },
              delay: mobile ? 0 : index * 0.03,
            },
          );

        });
      }

      /* ——— Network ——— */
      const network = main.querySelector<HTMLElement>("[data-motion='network']");
      if (network) {
        gsap.fromTo(
          network.querySelectorAll(".home-intro > *"),
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: motion.duration.sm,
            stagger: motion.stagger.tight,
            ease: motion.ease.out,
            scrollTrigger: { trigger: network, start: motion.start.early, once: true },
          },
        );
        const panel = network.querySelector(".network-panel");
        if (panel) {
          gsap.fromTo(
            panel,
            { opacity: 0.4, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: motion.duration.md,
              ease: motion.ease.out,
              scrollTrigger: { trigger: panel, start: motion.start.base, once: true },
            },
          );
        }
      }

      /* ——— Industries ——— */
      const industries = main.querySelector<HTMLElement>("[data-motion='industries']");
      if (industries) {
        gsap.fromTo(
          industries.querySelectorAll(".home-intro > *"),
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: motion.duration.sm,
            stagger: motion.stagger.tight,
            ease: motion.ease.out,
            scrollTrigger: { trigger: industries, start: motion.start.base, once: true },
          },
        );

        industries.querySelectorAll(".home-industry-tile").forEach((tile) => {
          gsap.fromTo(
            tile,
            { clipPath: "inset(100% 0 0 0)" },
            {
              clipPath: "inset(0% 0 0 0)",
              duration: motion.duration.md,
              ease: motion.ease.outExpo,
              scrollTrigger: { trigger: tile, start: "top 90%", once: true },
            },
          );
          const img = tile.querySelector("img");
          if (img && !mobile) {
            gsap.fromTo(
              img,
              { scale: 1.14 },
              {
                scale: 1,
                ease: motion.ease.none,
                scrollTrigger: {
                  trigger: tile,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: motion.scrub.soft,
                },
              },
            );
          }
        });

        gsap.fromTo(
          industries.querySelectorAll(".home-index li"),
          { opacity: 0, x: mobile ? 0 : -18 },
          {
            opacity: 1,
            x: 0,
            duration: motion.duration.xs,
            stagger: motion.stagger.tight,
            ease: motion.ease.outSoft,
            scrollTrigger: {
              trigger: industries.querySelector(".home-index"),
              start: "top 90%",
              once: true,
            },
          },
        );
      }

      /* ——— Featured project wipe ——— */
      const feature = main.querySelector<HTMLElement>("[data-motion='feature']");
      if (feature) {
        const fig = feature.querySelector("figure .frame");
        const copy = feature.querySelectorAll(".home-feature-grid > div:last-child > *");
        if (fig) {
          gsap.fromTo(
            fig,
            { clipPath: mobile ? "inset(0 0 100% 0)" : "inset(0 0 0 100%)" },
            {
              clipPath: "inset(0 0 0 0%)",
              ease: motion.ease.none,
              scrollTrigger: {
                trigger: feature,
                start: "top 78%",
                end: "top 32%",
                scrub: motion.scrub.base,
              },
            },
          );
        }
        gsap.fromTo(
          copy,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: motion.duration.md,
            stagger: motion.stagger.base,
            ease: motion.ease.out,
            scrollTrigger: { trigger: feature, start: motion.start.late, once: true },
          },
        );
      }

      /* ——— Project cards ——— */
      const projects = main.querySelector<HTMLElement>("[data-motion='projects']");
      if (projects) {
        gsap.fromTo(
          projects.querySelectorAll(".home-intro > *"),
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: motion.duration.sm,
            stagger: motion.stagger.tight,
            ease: motion.ease.out,
            scrollTrigger: { trigger: projects, start: motion.start.base, once: true },
          },
        );

        projects.querySelectorAll(".home-card").forEach((card, i) => {
          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: 36,
              clipPath: "inset(12% 8% 12% 8%)",
            },
            {
              opacity: 1,
              y: 0,
              clipPath: "inset(0% 0% 0% 0%)",
              duration: motion.duration.md,
              delay: i * 0.06,
              ease: motion.ease.out,
              scrollTrigger: { trigger: card, start: "top 90%", once: true },
            },
          );
        });
      }

      /* ——— Insights ——— */
      const insights = main.querySelector<HTMLElement>("[data-motion='insights']");
      if (insights) {
        const media = insights.querySelector(".home-split-media .frame");
        const copy = insights.querySelectorAll(".home-split-copy > *");
        if (media) {
          gsap.fromTo(
            media,
            { clipPath: "inset(10% 0 10% 0)", scale: 1.06 },
            {
              clipPath: "inset(0% 0 0% 0)",
              scale: 1,
              ease: motion.ease.none,
              scrollTrigger: {
                trigger: insights,
                start: "top 80%",
                end: "top 36%",
                scrub: motion.scrub.soft,
              },
            },
          );
        }
        gsap.fromTo(
          copy,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: motion.duration.sm,
            stagger: motion.stagger.base,
            ease: motion.ease.out,
            scrollTrigger: { trigger: insights, start: motion.start.late, once: true },
          },
        );
      }

      /* ——— Questions / testimonials-adjacent ——— */
      const questions = main.querySelector<HTMLElement>("[data-motion='questions']");
      if (questions) {
        const media = questions.querySelector(".home-split-media .frame");
        const copy = questions.querySelectorAll(".home-split-copy > *");
        if (media) {
          gsap.fromTo(
            media,
            { clipPath: "inset(0 0 100% 0)" },
            {
              clipPath: "inset(0 0 0% 0)",
              duration: motion.duration.lg,
              ease: motion.ease.outExpo,
              scrollTrigger: { trigger: questions, start: motion.start.base, once: true },
            },
          );
        }
        gsap.fromTo(
          copy,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: motion.duration.sm,
            stagger: motion.stagger.base,
            ease: motion.ease.outSoft,
            scrollTrigger: { trigger: questions, start: "top 74%", once: true },
          },
        );
      }

      /* ——— CTA ——— */
      const cta = main.querySelector<HTMLElement>("[data-motion='cta']");
      if (cta) {
        const title = cta.querySelector("#cta-title");
        maskWords(title);
        const inners = title?.querySelectorAll(".motion-line-inner");
        if (inners?.length) {
          gsap.fromTo(
            inners,
            { yPercent: 120 },
            {
              yPercent: 0,
              duration: motion.duration.md,
              stagger: 0.035,
              ease: motion.ease.cinematic,
              scrollTrigger: { trigger: cta, start: motion.start.late, once: true },
            },
          );
        }
        gsap.fromTo(
          cta.querySelectorAll(".home-cta-copy > p, .home-cta-actions"),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: motion.duration.sm,
            stagger: motion.stagger.base,
            ease: motion.ease.out,
            scrollTrigger: { trigger: cta, start: "top 70%", once: true },
          },
        );
        gsap.fromTo(
          cta.querySelector(".home-cta-shade"),
          { opacity: 0.4 },
          {
            opacity: 1,
            ease: motion.ease.none,
            scrollTrigger: {
              trigger: cta,
              start: "top bottom",
              end: "top 45%",
              scrub: true,
            },
          },
        );
        const ctaImg = cta.querySelector(".frame img");
        if (ctaImg && !mobile) {
          gsap.fromTo(
            ctaImg,
            { scale: 1.1 },
            {
              scale: 1,
              ease: motion.ease.none,
              scrollTrigger: {
                trigger: cta,
                start: "top bottom",
                end: "bottom top",
                scrub: motion.scrub.soft,
              },
            },
          );
        }
      }

      /* ——— Footer ——— */
      const footer = document.querySelector<HTMLElement>(".site-footer");
      if (footer) {
        gsap.fromTo(
          footer.querySelector(".footer-mark"),
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: motion.duration.md,
            ease: motion.ease.out,
            scrollTrigger: { trigger: footer, start: "top 92%", once: true },
          },
        );
        gsap.fromTo(
          footer.querySelectorAll(".footer-grid > *"),
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: motion.duration.sm,
            stagger: motion.stagger.tight,
            ease: motion.ease.outSoft,
            scrollTrigger: {
              trigger: footer.querySelector(".footer-grid"),
              start: "top 94%",
              once: true,
            },
          },
        );
        gsap.fromTo(
          footer.querySelector(".footer-base"),
          { opacity: 0 },
          {
            opacity: 1,
            duration: motion.duration.sm,
            ease: motion.ease.outSoft,
            scrollTrigger: { trigger: footer, start: "top 80%", once: true },
          },
        );
      }

      ScrollTrigger.refresh();
    }, main);

    const failsafe = window.setTimeout(() => {
      revealStatic(main);
      gsap.set(
        main.querySelectorAll(
          "h2, .home-intro > *, .home-split-copy > *, .home-cta-copy > *, .home-metrics li, .home-steps li, .home-card, .home-industry-tile, .network-panel, .footer-mark, .footer-grid > *",
        ),
        { clearProps: "opacity,transform,clipPath,filter" },
      );
      ScrollTrigger.refresh();
    }, 2800);

    return () => {
      window.clearTimeout(failsafe);
      ctx.revert();
      document.documentElement.classList.remove("has-home-motion");
    };
  }, []);

  return null;
}
