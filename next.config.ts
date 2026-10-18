import type { NextConfig } from "next";

/** Old city-based corridor URLs now point to the state-level corridors. */
const LEGACY_CORRIDORS: Record<string, string> = {
  "chennai-sohar": "tamil-nadu-north-batinah",
  "bengaluru-muscat": "karnataka-muscat",
  "mundra-salalah-dar-es-salaam": "gujarat-dhofar-dar-es-salaam",
  "kochi-duqm": "kerala-al-wusta",
  "mumbai-muscat": "maharashtra-muscat",
  "salalah-dar-es-salaam": "dhofar-dar-es-salaam",
  "london-muscat": "england-muscat",
  "aberdeen-duqm": "scotland-al-wusta",
};

const nextConfig: NextConfig = {
  cacheComponents: true,
  async redirects() {
    return Object.entries(LEGACY_CORRIDORS).map(([from, to]) => ({ source: `/corridors/${from}`, destination: `/corridors/${to}`, permanent: true }));
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
