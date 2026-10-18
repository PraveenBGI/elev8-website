# elev8 public website

Home page for the elev8 public website. Built with Next.js 16 (App Router), TypeScript, Tailwind CSS 4 and Lucide icons. Hosted on Vercel.

## Run it locally (PowerShell, from VS Code terminal)

```powershell
# 1. Unzip into your projects folder
Expand-Archive -Path "$HOME\Downloads\elev8-website-homepage-v1.zip" -DestinationPath "$HOME\Projects" -Force
Set-Location "$HOME\Projects\elev8-website"

# 2. Install, download the placeholder images, run
npm install
powershell -ExecutionPolicy Bypass -File .\scripts\download-images.ps1
npm run dev
# open http://localhost:3000
```

Node 20.9 or newer is required (Node 22 LTS recommended).

## Checks before every push

```powershell
npm run lint
npx tsc --noEmit
npm run build
```

## Push to GitHub and deploy on Vercel

```powershell
git init
git add .
git commit -m "elev8 website: home page v1"
git branch -M main
git remote add origin https://github.com/<your-account>/elev8-website.git
git push -u origin main
```

Then in Vercel: **Add New > Project > Import** the `elev8-website` repo. Framework is detected as Next.js; no settings or environment variables are needed. Every push to `main` redeploys.

## How the site is organised

elev8 is universal: no country is "home". Every place sits in one hierarchy,
**Country → State/Region → City → Zone**, and each country names its first level
its own way (Governorate, State, Region, Nation). Corridors connect places at any
level, usually city to city.

## Pages

| URL | Page |
|---|---|
| `/` | Home: corridor finder, network map, levels, featured corridors, audiences, countries, solutions, gatewAI, opportunities |
| `/explore` | Network map and full country → state → city index |
| `/countries/<country>` | Country: facts, value, states/regions, corridors, zones, opportunities |
| `/countries/<country>/<region>` | State, governorate, region or nation |
| `/countries/<country>/<region>/<city>` | City: assets, zones, corridors, opportunities |
| `/corridors`, `/corridors/<slug>` | Corridor finder, filters, map, and one page per corridor |
| `/solutions`, `/solutions/<id>` | The 8 pillars |
| `/for/businesses`, `/for/investors`, `/for/governments` | Audience pages |
| `/opportunities` | Opportunity areas by solution and country |

## Where things live

| What | File |
|---|---|
| Countries, states/regions, cities, zones (with sources and coordinates) | `src/content/places.ts` |
| Corridors | `src/content/corridors.ts` |
| Opportunity areas | `src/content/opportunities.ts` |
| The 8 solutions | `src/content/pillars.ts` |
| Audience pages, platform links | `src/content/site.ts` |
| Home page wording | `src/content/home.ts` |
| Every image name and its source | `src/content/images.ts` |
| Map | `src/components/NetworkMap.tsx` (d3-geo + world-atlas, rendered at build time) |

### Adding a country, state or city

1. Add the country to `countries`, its states to `regions`, its cities (with `lat`/`lng`) to `cities` in `src/content/places.ts`. Add sources for every fact.
2. Add any images to `src/content/images.ts` and the flag code to `FLAGS`, then run `scripts/download-images.ps1`.
3. Add corridors in `src/content/corridors.ts`. If the country is new to the map, add its ISO numeric code to `ISO` in `NetworkMap.tsx`.

Pages, menus, the map and the corridor finder pick everything up automatically.

## Before launch

- **Images:** photos come from Unsplash and flags from flagcdn.com. To use your own, replace `public/images/<name>.jpg` with a file of the same name. The script never overwrites existing files.
- **Platform links:** `register`, `login`, `arabic` and `briefing` in `site.links` (`src/content/site.ts`) are placeholders. Set them to real URLs.
- **Facts:** every place fact is listed with its source on its page. Add new facts only with a source.
- **Legal pages:** privacy, cookie and terms pages are not included. Add them with approved text.
- **Arabic:** layout uses logical spacing so it can flip to RTL. Arabic pages are not built yet.
