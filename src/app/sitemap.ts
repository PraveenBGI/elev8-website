import type { MetadataRoute } from "next";
import { corridors } from "@/content/corridors";
import { cities, countries, regions } from "@/content/places";
import { pillars } from "@/content/pillars";
import { audiences, SITE_URL } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/explore",
    "/countries",
    "/corridors",
    "/solutions",
    "/opportunities",
    ...countries.map((c) => `/countries/${c.slug}`),
    ...regions.map((r) => `/countries/${r.country}/${r.slug}`),
    ...cities.map((x) => `/countries/${x.country}/${x.region}/${x.slug}`),
    ...corridors.map((k) => `/corridors/${k.slug}`),
    ...pillars.map((p) => `/solutions/${p.id}`),
    ...audiences.map((a) => `/for/${a.slug}`),
  ];
  return paths.map((p) => ({ url: `${SITE_URL}${p === "/" ? "" : p}`, priority: p === "/" ? 1 : p.split("/").length <= 2 ? 0.8 : 0.6 }));
}
