/** Map board size matched to the corridor schematic artwork (1024 × 546). */
export const MAP_W = 1024;
export const MAP_H = 546;

export function projectLonLat(lon: number, lat: number) {
  return {
    x: ((lon + 180) / 360) * MAP_W,
    y: ((90 - lat) / 180) * MAP_H,
  };
}
