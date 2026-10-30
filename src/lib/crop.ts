export interface Crop {
  url: string;
  zoom: number;
  x: number;
  y: number;
}

const DEFAULT = { zoom: 1, x: 50, y: 50 };

export function parseCrop(raw: unknown): Crop {
  if (!raw) return { url: "", ...DEFAULT };

  if (typeof raw === "object" && raw !== null) {
    const r = raw as Record<string, unknown>;
    return {
      url: String(r.u ?? r.url ?? ""),
      zoom: Number(r.z ?? r.zoom ?? 1) || 1,
      x: Number(r.x ?? 50),
      y: Number(r.y ?? 50),
    };
  }

  const s = String(raw).trim();
  if (!s) return { url: "", ...DEFAULT };

  if (s.startsWith("{")) {
    try {
      const p = JSON.parse(s);
      return {
        url: String(p.u ?? p.url ?? ""),
        zoom: Number(p.z ?? p.zoom ?? 1) || 1,
        x: Number(p.x ?? 50),
        y: Number(p.y ?? 50),
      };
    } catch {
      return { url: s, ...DEFAULT };
    }
  }

  return { url: s, ...DEFAULT };
}

export function serializeCrop(c: Crop): string {
  if (c.zoom === 1 && c.x === 50 && c.y === 50) return c.url;
  return JSON.stringify({ u: c.url, z: c.zoom, x: c.x, y: c.y });
}

export function parseImages(raw: unknown): Crop[] {
  let arr: unknown = raw;
  if (typeof raw === "string") {
    try {
      arr = JSON.parse(raw || "[]");
    } catch {
      return [];
    }
  }
  if (!Array.isArray(arr)) return [];
  return arr.map(parseCrop);
}
