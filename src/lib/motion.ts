/** Centralized motion tokens for GSAP + CSS scroll choreography. */

export const motion = {
  ease: {
    out: "power3.out",
    outSoft: "power2.out",
    outExpo: "expo.out",
    inOut: "power2.inOut",
    cinematic: "power4.out",
    none: "none",
  },
  duration: {
    xs: 0.35,
    sm: 0.5,
    md: 0.75,
    lg: 1.05,
    xl: 1.45,
  },
  stagger: {
    tight: 0.04,
    base: 0.07,
    loose: 0.11,
    lines: 0.12,
  },
  scrub: {
    soft: 0.4,
    base: 0.65,
    heavy: 0.9,
  },
  start: {
    early: "top 88%",
    base: "top 78%",
    late: "top 68%",
  },
} as const;

export type MotionEase = (typeof motion.ease)[keyof typeof motion.ease];

/** Mask a heading into line spans for editorial reveal. */
export function maskLines(el: Element | null, className = "motion-line") {
  if (!el || el.querySelector(`.${className}`)) return;
  const text = el.textContent?.trim() ?? "";
  if (!text) return;
  el.setAttribute("aria-label", text);
  el.textContent = "";
  const mask = document.createElement("span");
  mask.className = `${className} hero-title-mask`;
  const inner = document.createElement("span");
  inner.className = `${className}-inner motion-line-inner`;
  inner.textContent = text;
  mask.appendChild(inner);
  el.appendChild(mask);
}

/** Split into word masks for denser headlines. */
export function maskWords(el: Element | null) {
  if (!el || el.querySelector(".motion-line")) return;
  const text = el.textContent?.trim() ?? "";
  if (!text) return;
  el.setAttribute("aria-label", text);
  el.textContent = "";
  const words = text.split(/\s+/);
  words.forEach((word, index) => {
    const line = document.createElement("span");
    line.className = "motion-line";
    const inner = document.createElement("span");
    inner.className = "motion-line-inner";
    inner.textContent = word;
    line.appendChild(inner);
    el.appendChild(line);
    if (index < words.length - 1) el.appendChild(document.createTextNode(" "));
  });
}

export function revealStatic(root: ParentNode) {
  root.querySelectorAll(".reveal, .reveal-stagger").forEach((node) => {
    node.classList.add("is-in");
  });
}
