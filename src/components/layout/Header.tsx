"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { primaryNav, serviceLinks } from "@/data/navigation";
import { services } from "@/data/services";
import { Frame } from "@/components/ui/Frame";

function clean(path: string) {
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return path;
}

function sectionActive(path: string, href?: string, id?: string) {
  if (!href && id === "services") return path === "/services" || path.startsWith("/services/");
  if (!href && id === "company") {
    return ["/about", "/team", "/careers", "/faq", "/contact"].some(
      (item) => path === item || path.startsWith(`${item}/`),
    );
  }
  if (!href) return false;
  const target = clean(href);
  if (target === "/") return path === "/";
  return path === target || path.startsWith(`${target}/`);
}

export function Header() {
  const path = clean(usePathname() || "/");
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [pathSnapshot, setPathSnapshot] = useState(path);
  if (path !== pathSnapshot) {
    setPathSnapshot(path);
    setOpen(null);
    setMobile(false);
  }
  const [preview, setPreview] = useState(services[0].slug);
  const headerRef = useRef<HTMLElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const previewService = services.find((service) => service.slug === preview) ?? services[0];
  const cinema = path !== "/black-friday" && !path.startsWith("/black-friday/");
  const overlay = cinema && !stuck && !open && !mobile;

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(null);
    };
    const onPointer = (event: MouseEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [open]);

  useEffect(() => {
    if (!mobile) return;
    const root = drawerRef.current;
    const menuButton = menuButtonRef.current;
    const previous = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusable = () =>
      Array.from(
        root?.querySelectorAll<HTMLElement>(
          "a, button, summary, input, [tabindex]:not([tabindex='-1'])",
        ) ?? [],
      );

    focusable()[0]?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobile(false);
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusable();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      previous?.focus();
      menuButton?.focus();
    };
  }, [mobile]);

  return (
    <header
      ref={headerRef}
      className={[
        "site-header",
        cinema ? "is-cinema" : "",
        stuck ? "is-stuck" : "",
        overlay ? "is-overlay" : "",
        open ? "is-open" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="shell header-bar">
        <Link href="/" className="logo" aria-label="VELTRAX home">
          <span className="logo-mark" aria-hidden="true" />
          VELTRAX
        </Link>

        <nav className="primary-nav" aria-label="Primary">
          {primaryNav.map((item) => {
            const active = sectionActive(path, item.href, item.id);
            if (item.children) {
              const expanded = open === item.id;
              return (
                <div key={item.id} className="nav-item">
                  <button
                    className={`nav-button${active ? " is-active" : ""}`}
                    aria-expanded={expanded}
                    aria-controls={`${menuId}-${item.id}`}
                    onClick={() => setOpen(expanded ? null : item.id)}
                  >
                    {item.label}
                    <ChevronDown
                      aria-hidden="true"
                      size={14}
                      strokeWidth={2.25}
                      className={`nav-chevron${expanded ? " is-open" : ""}`}
                    />
                  </button>
                </div>
              );
            }
            return (
              <Link
                key={item.id}
                href={item.href || "/"}
                className={`nav-link${active ? " is-active" : ""}`}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/track"
            className={`nav-link${path === "/track" ? " is-active" : ""}`}
            aria-current={path === "/track" ? "page" : undefined}
          >
            Track
          </Link>
        </nav>

        <div className="header-actions">
          <Link className="btn header-quote" href="/quote">
            Quote
          </Link>
        </div>

        <button
          ref={menuButtonRef}
          className="menu-toggle"
          aria-expanded={mobile}
          aria-controls="mobile-navigation"
          onClick={() => setMobile(true)}
        >
          <Menu aria-hidden="true" />
          <span className="sr-only">Open menu</span>
        </button>
      </div>

      {open === "services" ? (
        <div className="mega" id={`${menuId}-services`}>
          <div className="shell mega-grid">
            <div className="mega-list">
              {serviceLinks.map((link) => {
                const service = services.find((item) => item.name === link.label);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={service?.slug === preview ? "mega-link is-active" : "mega-link"}
                    onMouseEnter={() => service && setPreview(service.slug)}
                    onFocus={() => service && setPreview(service.slug)}
                  >
                    <em>{service?.index}</em>
                    <strong>{link.label}</strong>
                    <span>{link.note}</span>
                  </Link>
                );
              })}
            </div>
            <figure className="mega-preview">
              <Frame image={previewService.image} sizes="320px" />
              <figcaption>{previewService.summary}</figcaption>
            </figure>
          </div>
        </div>
      ) : null}

      {open === "company" ? (
        <div className="company-menu" id={`${menuId}-company`}>
          <ul>
            {primaryNav
              .find((item) => item.id === "company")
              ?.children?.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    {link.label}
                    <small>{link.note}</small>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      ) : null}

      {mobile ? (
        <div
          className="drawer"
          onClick={(event) => event.currentTarget === event.target && setMobile(false)}
        >
          <div
            ref={drawerRef}
            id="mobile-navigation"
            className="drawer-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="drawer-top">
              <span className="logo">
                <span className="logo-mark" aria-hidden="true" />
                VELTRAX
              </span>
              <button className="menu-toggle" onClick={() => setMobile(false)}>
                <X aria-hidden="true" />
                <span className="sr-only">Close menu</span>
              </button>
            </div>
            <details>
              <summary>Services</summary>
              <div className="drawer-sub">
                {serviceLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </details>
            <Link className="drawer-link" href="/industries">
              Industries
            </Link>
            <Link className="drawer-link" href="/projects">
              Projects
            </Link>
            <Link className="drawer-link" href="/blog">
              Insights
            </Link>
            <details>
              <summary>Company</summary>
              <div className="drawer-sub">
                {primaryNav
                  .find((item) => item.id === "company")
                  ?.children?.map((link) => (
                    <Link key={link.href} href={link.href}>
                      {link.label}
                    </Link>
                  ))}
              </div>
            </details>
            <Link className="drawer-link" href="/track">
              Track a shipment
            </Link>
            <Link className="btn btn-signal drawer-quote" href="/quote">
              Request a quote
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
