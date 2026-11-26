const sharp = require("sharp");
const path = require("path");

const SRC = path.join(__dirname, "..", "public", "images", "corridor-routes.jpg");
const OUT = path.join(__dirname, "..", "public", "images", "corridor-land-dots.png");
/** Match site --paper so the map board blends with the page. */
const PAPER = [245, 244, 239];
/** Cream baked into corridor-routes.jpg (for land detection). */
const SRC_CREAM = [252, 247, 243];

(async () => {
  const { data, info } = await sharp(SRC).raw().ensureAlpha().toBuffer({ resolveWithObject: true });
  const { width: w, height: h, channels: c } = info;

  const land = Buffer.alloc(w * h);
  const blocked = Buffer.alloc(w * h);

  for (let p = 0; p < w * h; p++) {
    const i = p * c;
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const dark = (SRC_CREAM[0] - r + (SRC_CREAM[1] - g) + (SRC_CREAM[2] - b)) / 3;
    const chroma = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));
    const isOrange = r > 185 && r - Math.min(g, b) > 35 && b < 165;
    if (isOrange) {
      blocked[p] = 1;
      continue;
    }
    if (dark > 9 && dark < 95 && chroma < 34) land[p] = 1;
  }

  let changed = true;
  let passes = 0;
  while (changed && passes < 14) {
    changed = false;
    passes += 1;
    const next = Buffer.from(land);
    for (let y = 2; y < h - 2; y++) {
      for (let x = 2; x < w - 2; x++) {
        const p = y * w + x;
        if (land[p] || blocked[p]) continue;
        let n = 0;
        for (let dy = -2; dy <= 2; dy++) {
          for (let dx = -2; dx <= 2; dx++) n += land[(y + dy) * w + (x + dx)];
        }
        if (n >= 11) {
          next[p] = 1;
          changed = true;
        }
      }
    }
    land.set(next);
  }

  const out = Buffer.alloc(w * h * 3);
  for (let p = 0; p < w * h; p++) {
    const o = p * 3;
    out[o] = PAPER[0];
    out[o + 1] = PAPER[1];
    out[o + 2] = PAPER[2];
  }

  const spacing = 3.1;
  let dots = 0;
  for (let y = spacing; y < h - spacing; y += spacing) {
    const rowOff = (Math.round(y / spacing) % 2) * (spacing * 0.5);
    for (let x = spacing + rowOff; x < w - spacing; x += spacing) {
      const xi = Math.round(x);
      const yi = Math.round(y);
      let n = 0;
      for (let dy = -2; dy <= 2; dy++) {
        for (let dx = -2; dx <= 2; dx++) {
          const nx = xi + dx;
          const ny = yi + dy;
          if (nx >= 0 && ny >= 0 && nx < w && ny < h) n += land[ny * w + nx];
        }
      }
      if (n < 6) continue;
      dots += 1;
      for (let dy = -2; dy <= 2; dy++) {
        for (let dx = -2; dx <= 2; dx++) {
          if (dx * dx + dy * dy > 3.2) continue;
          const nx = xi + dx;
          const ny = yi + dy;
          if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
          const o = (ny * w + nx) * 3;
          const t = Math.max(0, 1 - (dx * dx + dy * dy) / 3.8);
          out[o] = Math.round(PAPER[0] - 72 * t);
          out[o + 1] = Math.round(PAPER[1] - 68 * t);
          out[o + 2] = Math.round(PAPER[2] - 62 * t);
        }
      }
    }
  }

  await sharp(out, { raw: { width: w, height: h, channels: 3 } }).png().toFile(OUT);
  console.log({ w, h, dots, passes, out: OUT });
})();
