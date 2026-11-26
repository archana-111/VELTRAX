"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ImageAsset } from "@/types/content";
import { images } from "@/data/images";
import { Frame } from "@/components/ui/Frame";
import { getGsap, isMobileMotion, prefersReducedMotion } from "@/lib/gsap-client";
import { maskLines, motion } from "@/lib/motion";

type Crumb = { label: string; href?: string };

type PageHeroProps = {
  kicker: string;
  title: string;
  lede: string;
  image?: ImageAsset;
  crumbs?: Crumb[];
  action?: { href: string; label: string };
};

function titleLines(title: string) {
  const parts = title
    .split(/(?<=[.!?])\s+/)
    .map((part) => part.trim())
    .filter(Boolean);
  return parts.length > 1 ? parts : [title];
}

export function PageHero({
  kicker,
  title,
  lede,
  image = images.port,
  crumbs,
  action,
}: PageHeroProps) {
  const lines = titleLines(title);
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = ref.current;
    if (!section || prefersReducedMotion()) return;

    const gsap = getGsap();
    const mobile = isMobileMotion();

    const ctx = gsap.context(() => {
      const spans = section.querySelectorAll<HTMLElement>(".page-hero-title > span");
      spans.forEach((span) => maskLines(span));

      const load = gsap.timeline({ defaults: { ease: motion.ease.out } });
      const media = section.querySelector(".page-hero-media");
      const img = section.querySelector(".page-hero-media img");

      if (media) {
        load.fromTo(media, { scale: 1.08, opacity: 0.7 }, { scale: 1, opacity: 1, duration: 1.25 }, 0);
      }
      if (img && !mobile) {
        load.fromTo(img, { scale: 1.12 }, { scale: 1.03, duration: 1.4, ease: motion.ease.outSoft }, 0);
        gsap.to(img, {
          yPercent: 6,
          ease: motion.ease.none,
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: motion.scrub.soft,
          },
        });
      }

      load.fromTo(
        section.querySelectorAll(".page-hero-crumb, .page-hero-badge"),
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: motion.duration.sm, stagger: 0.06 },
        0.2,
      );
      load.fromTo(
        section.querySelectorAll(".page-hero-title .motion-line-inner"),
        { yPercent: 115 },
        {
          yPercent: 0,
          duration: motion.duration.md,
          stagger: motion.stagger.lines,
          ease: motion.ease.cinematic,
        },
        0.32,
      );
      load.fromTo(
        section.querySelectorAll(".page-hero-lede, .page-hero-actions"),
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: motion.duration.sm, stagger: 0.08 },
        0.55,
      );
    }, section);

    return () => ctx.revert();
  }, [title]);

  return (
    <header ref={ref} className="page-hero page-hero--cinema" data-motion="page-hero">
      <div className="page-hero-media" aria-hidden="true">
        <Frame image={image} priority sizes="100vw" />
        <div className="page-hero-gradient" />
      </div>

      <div className="shell page-hero-layout">
        <div className="page-hero-main">
          {crumbs ? (
            <nav className="page-hero-crumb" aria-label="Breadcrumb">
              {crumbs.map((crumb, index) => (
                <span key={`${crumb.label}-${index}`}>
                  {index > 0 ? <span aria-hidden="true"> / </span> : null}
                  {crumb.href ? (
                    <Link href={crumb.href}>{crumb.label}</Link>
                  ) : (
                    <span>{crumb.label}</span>
                  )}
                </span>
              ))}
            </nav>
          ) : null}

          <p className="page-hero-badge">{kicker}</p>
          <h1 className="page-hero-title">
            {lines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
          <p className="page-hero-lede">{lede}</p>

          {action ? (
            <div className="page-hero-actions">
              <Link className="btn btn-hero-pill" href={action.href}>
                {action.label}
                <span className="btn-hero-pill-icon" aria-hidden="true">
                  <ArrowUpRight size={18} strokeWidth={2.25} />
                </span>
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
