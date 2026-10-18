import { geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import type { FeatureCollection, Geometry } from "geojson";
import world from "world-atlas/countries-110m.json";
import { corridors, gatewayFor, type Corridor, type PlaceRef } from "@/content/corridors";
import { cities, citiesOf, cityHref, countries, type City } from "@/content/places";

/** ISO 3166 numeric ids used by world-atlas for countries on the platform. */
const ISO: Record<string, string> = { oman: "512", india: "356", tanzania: "834", "united-kingdom": "826" };

/** Label nudges so close cities stay readable. */
const LABEL: Record<string, [number, number, "start" | "end"]> = {
  muscat: [6, 16, "start"],
  sohar: [-8, -6, "end"],
  salalah: [-8, 4, "end"],
  duqm: [8, 4, "start"],
  "dar-es-salaam": [8, 10, "start"],
  "zanzibar-city": [8, -10, "start"],
  arusha: [-8, 4, "end"],
  london: [8, 8, "start"],
  manchester: [-8, 2, "end"],
  aberdeen: [8, 0, "start"],
  mumbai: [-8, 4, "end"],
  mundra: [8, -4, "start"],
  chennai: [8, 4, "start"],
  bengaluru: [-8, -4, "end"],
  kochi: [-8, 8, "end"],
};

const W = 1000;
const H = 600;

function cityFor(ref: PlaceRef, k?: Corridor): City | undefined {
  const g = k ? gatewayFor(k, ref) : undefined;
  const r = g ?? ref;
  if (r.city) return cities.find((c) => c.country === r.c && c.slug === r.city);
  return citiesOf(r.c, r.r)[0];
}

export function NetworkMap({ only, className = "", id = "network-map" }: { only?: Corridor[]; className?: string; id?: string }) {
  const topo = world as unknown as Topology<{ countries: GeometryCollection }>;
  const all = feature(topo, topo.objects.countries) as unknown as FeatureCollection<Geometry, { name: string }>;

  // Zoom to the corridor when one is given, otherwise show the whole network.
  const focus = only?.length === 1 ? only[0].stops.map((s) => cityFor(s, only[0])).filter(Boolean) as City[] : [];
  let bounds: [number, number][] = [[-10, 60], [88, 60], [88, -12], [-10, -12]];
  if (focus.length) {
    const lngs = focus.map((c) => c.lng);
    const lats = focus.map((c) => c.lat);
    const pad = Math.max(6, (Math.max(...lngs) - Math.min(...lngs)) * 0.25);
    bounds = [
      [Math.min(...lngs) - pad, Math.max(...lats) + pad],
      [Math.max(...lngs) + pad, Math.min(...lats) - pad],
    ];
  }
  const projection = geoNaturalEarth1().fitExtent(
    [
      [20, 20],
      [W - 20, H - 20],
    ],
    { type: "MultiPoint", coordinates: bounds },
  );
  const path = geoPath(projection);
  const onPlatform = new Set(Object.values(ISO));

  const list = only ?? corridors;
  const arcs = list.flatMap((k) =>
    k.stops.slice(1).map((s, i) => {
      const a = cityFor(k.stops[i], k);
      const b = cityFor(s, k);
      if (!a || !b) return null;
      const [x1, y1] = projection([a.lng, a.lat])!;
      const [x2, y2] = projection([b.lng, b.lat])!;
      const mx = (x1 + x2) / 2;
      const my = (y1 + y2) / 2;
      const dx = x2 - x1;
      const dy = y2 - y1;
      const bend = Math.min(0.28, 40 / Math.hypot(dx, dy) + 0.12);
      const cx = mx - dy * bend;
      const cy = my + dx * bend;
      return { key: `${k.slug}-${i}`, d: `M${x1},${y1} Q${cx},${cy} ${x2},${y2}`, domestic: k.scope === "domestic" };
    }),
  ).filter(Boolean) as { key: string; d: string; domestic: boolean }[];

  const endpoints = new Set(list.flatMap((k) => k.stops.map((s) => cityFor(s, k)?.slug)));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby={`${id}-title`} className={`h-auto w-full ${className}`}>
      <title id={`${id}-title`}>{`Map of ${countries.map((c) => c.name).join(", ")} with ${list.length} ${list.length === 1 ? "corridor" : "corridors"} between their cities`}</title>
      <g>
        {all.features.map((f, i) => (
          <path
            key={i}
            d={path(f) ?? ""}
            className={onPlatform.has(String(f.id)) ? "fill-primary-100 stroke-primary-300" : "fill-neutral-200/70 stroke-white"}
            strokeWidth={0.6}
          />
        ))}
      </g>
      <g fill="none" strokeLinecap="round">
        {arcs.map((a) => (
          <path key={a.key} d={a.d} className={a.domestic ? "stroke-accent-600" : "stroke-primary-600"} strokeWidth={a.domestic ? 1.6 : 2} strokeDasharray={a.domestic ? "4 4" : undefined} opacity={0.85} />
        ))}
      </g>
      <g>
        {cities.map((c) => {
          const [x, y] = projection([c.lng, c.lat])!;
          const big = endpoints.has(c.slug);
          const [lx, ly, anchor] = LABEL[c.slug] ?? [7, 4, "start"];
          return (
            <a key={`${c.country}-${c.slug}`} href={cityHref(c.country, c.region, c.slug)} aria-label={`${c.name}, ${countries.find((k) => k.slug === c.country)!.name}`}>
              <circle cx={x} cy={y} r={big ? 5 : 3} className={big ? "fill-white stroke-primary-700" : "fill-primary-400"} strokeWidth={big ? 2.5 : 0} />
              {big && (
                <text x={x + lx} y={y + ly} textAnchor={anchor} className="fill-ink text-[13px] font-semibold" style={{ paintOrder: "stroke", stroke: "white", strokeWidth: 3 }}>
                  {c.name}
                </text>
              )}
            </a>
          );
        })}
      </g>
    </svg>
  );
}
