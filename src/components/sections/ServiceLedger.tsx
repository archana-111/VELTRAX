"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { services } from "@/data/services";
import { Frame } from "@/components/ui/Frame";
import { getGsap, isMobileMotion, prefersReducedMotion, ScrollTrigger } from "@/lib/gsap-client";
import { motion } from "@/lib/motion";

export function ServiceLedger() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(services[0].slug);
  const current = services.find((service) => service.slug === active) ?? services[0];

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;

    const gsap = getGsap();
    const mobile = isMobileMotion();
    const links = Array.from(section.querySelectorAll<HTMLAnchorElement>(".home-ledger-list a"));
    const photo = section.querySelector(".home-ledger-photo");
    const header = section.querySelectorAll(".home-intro > *");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        header,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: motion.duration.sm,
          stagger: motion.stagger.tight,
          ease: motion.ease.out,
          scrollTrigger: { trigger: section, start: motion.start.base, once: true },
        },
      );

      if (photo) {
        gsap.fromTo(
          photo,
          { clipPath: "inset(8% 8% 8% 8%)", opacity: 0.7 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            duration: motion.duration.md,
            ease: motion.ease.outExpo,
            scrollTrigger: { trigger: section, start: motion.start.base, once: true },
          },
        );
      }

      gsap.fromTo(
        links,
        { opacity: 0, x: mobile ? 0 : 20 },
        {
          opacity: 1,
          x: 0,
          duration: motion.duration.sm,
          stagger: motion.stagger.base,
          ease: motion.ease.outSoft,
          scrollTrigger: {
            trigger: section.querySelector(".home-ledger-list"),
            start: "top 88%",
            once: true,
          },
        },
      );

      if (!mobile && links.length) {
        const pinDistance = () => Math.min(window.innerHeight * 0.55, 420);

        ScrollTrigger.create({
          trigger: section,
          start: "top top+=80",
          end: () => `+=${pinDistance()}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.25,
          anticipatePin: 1,
          onUpdate: (self) => {
            const index = Math.min(
              services.length - 1,
              Math.floor(self.progress * services.length),
            );
            const next = services[index]?.slug;
            if (next) setActive(next);
            links.forEach((link, i) => link.classList.toggle("is-on", i === index));
          },
        });
      } else {
        links.forEach((link, index) => {
          ScrollTrigger.create({
            trigger: link,
            start: "top 68%",
            end: "bottom 40%",
            onEnter: () => {
              const slug = services[index]?.slug;
              if (slug) setActive(slug);
            },
            onEnterBack: () => {
              const slug = services[index]?.slug;
              if (slug) setActive(slug);
            },
          });
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="band home-services"
      id="services"
      data-motion="services"
      aria-labelledby="services-title"
    >
      <div className="shell">
        <header className="home-intro home-intro--row">
          <div>
            <p className="kicker">Services</p>
            <h2 id="services-title">Five clocks, kept apart.</h2>
            <p>Hover a line to swap the photograph. Each mode keeps its own page.</p>
          </div>
          <Link className="text-link" href="/services">
            All services
          </Link>
        </header>
        <div className="home-ledger">
          <figure className="home-ledger-photo">
            <div className="home-ledger-photo-frame" key={current.slug}>
              <Frame image={current.image} sizes="(min-width: 960px) 38vw, 100vw" />
            </div>
            <figcaption>
              <b>{current.index}</b> {current.name}
            </figcaption>
          </figure>
          <ol className="home-ledger-list">
            {services.map((service) => {
              const on = service.slug === current.slug;
              return (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className={on ? "is-on" : undefined}
                    onMouseEnter={() => setActive(service.slug)}
                    onFocus={() => setActive(service.slug)}
                  >
                    <em>{service.index}</em>
                    <strong>{service.name}</strong>
                    <span>{service.short}</span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
