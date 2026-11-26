"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { team } from "@/data/company";
import { images } from "@/data/images";
import { Frame } from "@/components/ui/Frame";
import { Magnetic } from "@/components/motion/Magnetic";
import { getGsap, isMobileMotion, prefersReducedMotion } from "@/lib/gsap-client";
import { maskLines, motion } from "@/lib/motion";

const faces = team.slice(0, 3);

export function GlobalHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const media = mediaRef.current;
    if (!section || !media) return;

    section.classList.add("is-hero-ready");

    if (prefersReducedMotion()) return;

    const gsap = getGsap();
    const mobile = isMobileMotion();

    const ctx = gsap.context(() => {
      const badge = section.querySelector(".hero-ocean-badge");
      const titleSpans = section.querySelectorAll<HTMLElement>(".hero-ocean-title > span");
      const actions = section.querySelector(".hero-ocean-actions");
      const note = section.querySelector(".hero-ocean-note");
      const layout = section.querySelector(".hero-ocean-layout");
      const image = media.querySelector("img");
      const gradient = section.querySelector(".hero-ocean-gradient");
      const grain = section.querySelector(".hero-ocean-grain");

      titleSpans.forEach((span) => maskLines(span));

      const load = gsap.timeline({ defaults: { ease: motion.ease.cinematic } });

      load.fromTo(
        media,
        { scale: 1.12, opacity: 0.55 },
        { scale: 1, opacity: 1, duration: motion.duration.xl },
        0,
      );
      if (image) {
        load.fromTo(
          image,
          { scale: 1.2, yPercent: 6 },
          { scale: 1.05, yPercent: 0, duration: 1.85, ease: motion.ease.outSoft },
          0,
        );
      }
      if (gradient) {
        load.fromTo(gradient, { opacity: 0.25 }, { opacity: 1, duration: 1.35 }, 0.08);
      }
      if (grain) {
        load.fromTo(grain, { opacity: 0 }, { opacity: 0.35, duration: 1.2 }, 0.2);
      }

      if (badge) {
        load.fromTo(
          badge,
          { y: 22, opacity: 0, filter: "blur(8px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: motion.duration.md, ease: motion.ease.out },
          0.32,
        );
      }

      const inners = section.querySelectorAll(".hero-ocean-title .motion-line-inner");
      load.fromTo(
        inners,
        { yPercent: 118 },
        {
          yPercent: 0,
          duration: motion.duration.lg,
          stagger: motion.stagger.lines,
          ease: motion.ease.cinematic,
        },
        0.42,
      );

      if (actions) {
        load.fromTo(
          actions,
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: motion.duration.md, ease: motion.ease.out },
          0.78,
        );
      }
      if (note) {
        load.fromTo(
          note,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: motion.duration.sm, ease: motion.ease.outSoft },
          0.95,
        );
      }

      /* Layered parallax — restrained, editorial */
      if (!mobile) {
        if (image) {
          gsap.to(image, {
            yPercent: 8,
            scale: 1.08,
            ease: motion.ease.none,
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: motion.scrub.soft,
            },
          });
        }
        if (layout) {
          gsap.to(layout, {
            y: 36,
            ease: motion.ease.none,
            scrollTrigger: {
              trigger: section,
              start: "center top",
              end: "bottom top",
              scrub: motion.scrub.base,
            },
          });
        }
        if (gradient) {
          gsap.to(gradient, {
            opacity: 0.85,
            ease: motion.ease.none,
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero-ocean is-hero-ready"
      data-motion="hero"
      aria-labelledby="hero-title"
    >
      <div ref={mediaRef} className="hero-ocean-media" aria-hidden="true">
        <Frame image={images.vessel} priority sizes="100vw" />
        <div className="hero-ocean-gradient" />
        <div className="hero-ocean-grain" />
      </div>

      <div className="shell hero-ocean-layout">
        <div className="hero-ocean-main">
          <p className="hero-ocean-badge">
            <Check aria-hidden="true" size={15} strokeWidth={2.5} />
            One record from port to warehouse
          </p>
          <h1 id="hero-title" className="hero-ocean-title">
            <span>Built for oceans.</span>
            <span>Trusted by desks.</span>
          </h1>
          <div className="hero-ocean-actions">
            <Magnetic strength={0.2}>
              <Link className="btn btn-hero-pill" href="/quote">
                Request a quote
                <span className="btn-hero-pill-icon" aria-hidden="true">
                  <ArrowUpRight size={18} strokeWidth={2.25} />
                </span>
              </Link>
            </Magnetic>
            <div className="hero-ocean-proof">
              <ul className="hero-ocean-faces" aria-hidden="true">
                {faces.map((member) => (
                  <li key={member.initials}>
                    {member.photo ? (
                      <Image
                        src={member.photo}
                        alt=""
                        width={64}
                        height={64}
                        className="hero-ocean-face"
                      />
                    ) : (
                      member.initials
                    )}
                  </li>
                ))}
              </ul>
              <p>Sample team profiles in this template</p>
            </div>
          </div>
        </div>
        <p className="hero-ocean-note">
          Freight, warehousing, and the paperwork between them — written so the next person can book
          without guessing what the last person meant.
        </p>
      </div>
    </section>
  );
}
