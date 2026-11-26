import { chromium, devices } from "playwright";

const BASE = process.env.MOTION_BASE_URL ?? "http://localhost:3000";

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 834, height: 1112 },
  { name: "mobile", ...devices["iPhone 13"].viewport },
];

async function assertPage(page, path, label) {
  const response = await page.goto(`${BASE}${path}`, {
    waitUntil: "domcontentloaded",
    timeout: 45000,
  });
  if (!response || !response.ok()) {
    throw new Error(`${label}: bad response ${response?.status()} for ${path}`);
  }

  await page.waitForSelector("#main", { timeout: 20000 });
  await page.waitForTimeout(900);

  if (path === "/" || path === "") {
    await page.waitForFunction(
      () =>
        document.documentElement.classList.contains("has-home-motion") ||
        document.documentElement.classList.contains("motion-reduced") ||
        Boolean(document.querySelector("[data-motion='hero']")),
      { timeout: 15000 },
    );
  }

  const metrics = await page.evaluate(() => {
    const doc = document.documentElement;
    const body = document.body;
    const scrollWidth = Math.max(doc.scrollWidth, body.scrollWidth);
    const clientWidth = doc.clientWidth;
    const blankHero = (() => {
      const hero = document.querySelector(".hero-ocean, .page-hero");
      if (!hero) return false;
      const style = getComputedStyle(hero);
      return style.visibility === "hidden" || Number(style.opacity) === 0;
    })();
    const hasMotionFlag = document.documentElement.classList.contains("has-home-motion");
    const hasLenis = document.documentElement.classList.contains("has-lenis");
    const sections = [...document.querySelectorAll("[data-motion]")].map((el) =>
      el.getAttribute("data-motion"),
    );
    return {
      overflow: scrollWidth > clientWidth + 2,
      scrollWidth,
      clientWidth,
      blankHero,
      hasMotionFlag,
      hasLenis,
      sections,
      title: document.title,
    };
  });

  if (metrics.overflow) {
    throw new Error(
      `${label}: horizontal overflow (${metrics.scrollWidth} > ${metrics.clientWidth})`,
    );
  }
  if (metrics.blankHero) {
    throw new Error(`${label}: hero appears blank`);
  }

  await page.evaluate(async () => {
    const total = document.body.scrollHeight;
    const step = Math.max(320, window.innerHeight * 0.65);
    for (let y = 0; y < total; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 100));
    }
    window.scrollTo(0, total);
    await new Promise((r) => setTimeout(r, 180));
  });

  const after = await page.evaluate(() => {
    const errors = [];
    const main = document.getElementById("main");
    if (!main || main.clientHeight < 200) errors.push("main too short");
    const footer = document.querySelector(".site-footer, .bf-footer");
    if (!footer) errors.push("missing footer");
    return { errors, scrollY: window.scrollY };
  });

  if (after.errors.length) {
    throw new Error(`${label}: ${after.errors.join(", ")}`);
  }

  return metrics;
}

async function run() {
  const browser = await chromium.launch({ headless: true });
  const results = [];

  try {
    for (const vp of viewports) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        reducedMotion: "no-preference",
      });
      const page = await context.newPage();
      page.setDefaultTimeout(45000);

      const home = await assertPage(page, "/", `${vp.name}/home`);
      if (
        vp.name === "desktop" &&
        !home.hasMotionFlag &&
        !home.sections.includes("hero")
      ) {
        throw new Error("desktop home missing motion markers");
      }

      await assertPage(page, "/services/", `${vp.name}/services`);
      await assertPage(page, "/blog/", `${vp.name}/blog`);
      await assertPage(page, "/quote/", `${vp.name}/quote`);

      results.push({ viewport: vp.name, ok: true, sections: home.sections });
      await context.close();
    }

    // Reduced motion should still render fully
    const reduced = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      reducedMotion: "reduce",
    });
    const page = await reduced.newPage();
    await assertPage(page, "/", "reduced-motion/home");
    await reduced.close();

    console.log(JSON.stringify({ ok: true, results }, null, 2));
  } finally {
    await browser.close();
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
