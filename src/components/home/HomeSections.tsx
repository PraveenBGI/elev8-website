import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRightIcon,
  BellAlertIcon,
  CheckBadgeIcon,
  ChevronDownIcon,
  GlobeEuropeAfricaIcon,
  LanguageIcon,
  MagnifyingGlassIcon,
  ScaleIcon,
  SparklesIcon,
  ArrowsRightLeftIcon,
  LightBulbIcon,
  MapIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { corridors } from "@/content/corridors";
import { audienceHeadline, audiencesCopy, faq, finalCta, gatewai, hero, howItWorks, marketsCopy, solutionsCopy, statement, trustCopy } from "@/content/home";
import { img } from "@/content/images";
import { citiesOf, countries, regionsOf } from "@/content/places";
import { audiences, site } from "@/content/site";
import { SolutionTabs } from "@/components/home/HomeTabs";
import { ButtonGlass, ButtonSecondary, Flag, IconTile, SectionHeading, Tagline } from "@/components/ui";

const wrap = "mx-auto w-full max-w-[1290px] px-4 sm:px-6 lg:px-8";
const section = "py-20 md:py-24 lg:py-32";

/* ------------------------------------------------------------------ hero */

/** Stock photo strip under the hero headline, in the NextSaaS framed style. */
function HeroPhotos() {
  const [a, b, c] = (["business-meeting", "hero-port-containers", "investor-charts"] as const).map(img);
  return (
    <div className="grid grid-cols-2 gap-2 rounded-[28px] bg-white/15 p-2 ring-1 ring-white/30 backdrop-blur-md sm:grid-cols-[1fr_1.6fr_1fr] sm:p-3">
      <div className="relative hidden aspect-[4/5] overflow-hidden rounded-[20px] bg-primary-800 sm:block">
        <Image src={a.src} alt={a.alt} fill sizes="25vw" className="object-cover" />
      </div>
      <div className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-[20px] bg-primary-800 sm:col-span-1 sm:aspect-auto">
        <Image src={b.src} alt={b.alt} fill priority sizes="(min-width: 640px) 45vw, 100vw" className="object-cover" />
      </div>
      <div className="relative hidden aspect-[4/5] overflow-hidden rounded-[20px] bg-primary-800 sm:block">
        <Image src={c.src} alt={c.alt} fill sizes="25vw" className="object-cover" />
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="px-2 pt-2">
      <div className="panel-gradient overflow-hidden rounded-3xl md:rounded-[40px] xl:rounded-[56px]">
        <div className={`${wrap} pt-36 text-center lg:pt-48`}>
          <div className="rise">
            <Tagline invert>{hero.markets}</Tagline>
          </div>
          <h1 id="hero-title" className="rise rise-2 mx-auto mt-7 max-w-4xl whitespace-pre-line text-5xl/[1.04] font-normal tracking-[-0.035em] text-white sm:text-7xl/[1.04] lg:text-[6.25rem]/[1]">
            {hero.title}
          </h1>
          <p className="rise rise-3 mx-auto mt-7 max-w-2xl text-lg text-white/80 sm:text-xl">{hero.subtitle}</p>
          <div className="rise rise-3 mt-10 flex flex-wrap justify-center gap-3">
            <ButtonSecondary href={site.links.register}>{hero.primary}</ButtonSecondary>
            <ButtonGlass href="#how">{hero.secondary}</ButtonGlass>
          </div>
          <div className="rise rise-3 mx-auto mt-16 max-w-6xl pb-8 lg:mt-20 lg:pb-14">
            <HeroPhotos />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ statement */

export function Statement() {
  return (
    <section aria-label="Why elev8" className={`${wrap} ${section}`}>
      <p className="mx-auto max-w-5xl text-center text-3xl/[1.2] font-normal tracking-[-0.025em] text-balance text-ink/35 sm:text-h3 lg:text-h2">
        {statement.lead} <span className="text-ink">{statement.punch}</span>
      </p>
    </section>
  );
}

/* ---------------------------------------------------------- how it works */

const stepIcons = [UserCircleIcon, MapIcon, SparklesIcon];

export function HowItWorks() {
  return (
    <section id="how" aria-labelledby="how-title" className={`${wrap} pb-20 md:pb-24 lg:pb-32`}>
      <SectionHeading id="how-title" eyebrow={howItWorks.eyebrow} title={howItWorks.title} align="center" />
      <ol className="mt-14 grid gap-2 rounded-[28px] bg-bg-3 p-2 lg:grid-cols-3">
        {howItWorks.steps.map((s, i) => (
          <li key={s.title} className="flex flex-col gap-14 rounded-[22px] bg-bg-1 p-7 ring-1 ring-stroke-2/60 sm:p-9">
            <div className="flex items-center justify-between">
              <IconTile icon={stepIcons[i]} />
              <span className="text-5xl font-light tracking-tight text-ink/10">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <div>
              <h3 className="text-h5 font-normal tracking-[-0.01em] text-ink sm:text-[1.75rem]">{s.title}</h3>
              <p className="mt-3 text-ink/60">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ------------------------------------------------------------ solutions */

export function SolutionsSection() {
  return (
    <section aria-labelledby="solutions-title" className={`${wrap} pb-20 md:pb-24 lg:pb-32`}>
      <SectionHeading id="solutions-title" eyebrow={solutionsCopy.eyebrow} title={solutionsCopy.title} description={solutionsCopy.description} align="center" />
      <div className="mt-14">
        <SolutionTabs />
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- gatewAI */

const gwIcons = [MagnifyingGlassIcon, ArrowsRightLeftIcon, BellAlertIcon, LightBulbIcon];

export function Gatewai() {
  const gwPic = img("hero-team-laptops");
  return (
    <section id="gatewai" aria-labelledby="gw-title" className="px-2">
      <div className="panel-deep overflow-hidden rounded-3xl md:rounded-[40px] xl:rounded-[56px]">
        <div className={`${wrap} ${section}`}>
          <SectionHeading id="gw-title" eyebrow={gatewai.eyebrow} title={gatewai.title} description={gatewai.description} align="center" invert />
          <div className="mt-14 grid gap-3 lg:grid-cols-[1fr_1.1fr]">
            <ul className="grid gap-3 sm:grid-cols-2">
              {gatewai.features.map((f, i) => {
                const I = gwIcons[i];
                return (
                  <li key={f.title} className="flex flex-col justify-between gap-10 rounded-[22px] bg-white/10 p-6 ring-1 ring-white/20 backdrop-blur-md">
                    <span className="grid size-11 place-items-center rounded-xl bg-white text-primary-900">
                      <I className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-h6 font-normal text-white">{f.title}</h3>
                      <p className="mt-1.5 text-[15px] text-white/70">{f.text}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="rounded-[28px] bg-white/15 p-2 ring-1 ring-white/30 backdrop-blur-md">
              <div className="relative h-full min-h-[22rem] overflow-hidden rounded-[22px] bg-primary-800">
                <Image src={gwPic.src} alt={gwPic.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- trust */

const trustIcons = [CheckBadgeIcon, ScaleIcon, GlobeEuropeAfricaIcon, LanguageIcon];

export function TrustSection() {
  const pic = img("business-meeting");
  const [first, ...rest] = trustCopy.items;
  return (
    <section aria-labelledby="trust-title" className={`${wrap} ${section}`}>
      <SectionHeading id="trust-title" eyebrow={trustCopy.eyebrow} title={trustCopy.title} description={trustCopy.description} />
      <div className="mt-14 grid gap-2 rounded-[28px] bg-bg-3 p-2 lg:grid-cols-3 lg:grid-rows-2">
        <div className="relative min-h-[26rem] overflow-hidden rounded-[22px] bg-primary-900 lg:row-span-2">
          <Image src={pic.src} alt={pic.alt} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-900/40 to-transparent" aria-hidden="true" />
          <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
            <CheckBadgeIcon className="size-9 text-white" aria-hidden="true" />
            <h3 className="mt-5 text-h4 font-normal text-white">{first.title}</h3>
            <p className="mt-2 text-white/75">{first.text}</p>
          </div>
        </div>
        {rest.map((t, i) => {
          const I = trustIcons[i + 1];
          return (
            <div key={t.title} className={`flex flex-col justify-between gap-10 rounded-[22px] bg-white p-7 sm:p-9 ${i === 2 ? "lg:col-span-2" : ""}`}>
              <IconTile icon={I} />
              <div>
                <h3 className="text-h5 font-normal text-ink">{t.title}</h3>
                <p className="mt-2 max-w-xl text-ink/60">{t.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- markets */

export function MarketsSection() {
  const popular = corridors.filter((c) => c.featured).slice(0, 6);
  return (
    <section aria-labelledby="markets-title" className={`${wrap} pb-20 md:pb-24 lg:pb-32`}>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading id="markets-title" eyebrow={marketsCopy.eyebrow} title={marketsCopy.title} description={marketsCopy.description} />
        <ButtonSecondary href="/explore">Open the map</ButtonSecondary>
      </div>
      <p className="mt-14 text-[15px] text-ink/50">{marketsCopy.firstLabel}</p>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {countries.map((c) => {
          const pic = img(c.image);
          const rs = regionsOf(c.slug).length;
          return (
            <li key={c.slug}>
              <Link href={`/countries/${c.slug}`} className="group relative block aspect-[4/5] overflow-hidden rounded-[22px] bg-primary-900">
                <Image src={pic.src} alt={pic.alt} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" aria-hidden="true" />
                <span className="absolute end-4 top-4 grid size-10 place-items-center rounded-xl bg-white/90 text-ink transition duration-500 group-hover:rotate-45">
                  <ArrowUpRightIcon className="size-4" strokeWidth={2} aria-hidden="true" />
                </span>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <Flag code={c.flag} className="h-4 w-6" />
                  <p className="mt-3 text-h5 font-normal text-white">{c.name}</p>
                  <p className="mt-1 text-sm text-white/75">
                    {rs} {rs === 1 ? c.regionTerm.toLowerCase() : c.regionTermPlural.toLowerCase()} · {citiesOf(c.slug).length} trade cities
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="mt-2 flex flex-col gap-6 rounded-[22px] bg-bg-3 p-7 ring-1 ring-stroke-2 sm:p-9 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-5">
          <IconTile icon={GlobeEuropeAfricaIcon} />
          <div>
            <h3 className="text-h5 font-normal text-ink">{marketsCopy.next.title}</h3>
            <p className="mt-1.5 max-w-2xl text-ink/60">{marketsCopy.next.text}</p>
          </div>
        </div>
        <ButtonSecondary href="/for/governments" className="shrink-0">{marketsCopy.next.cta}</ButtonSecondary>
      </div>
      <div className="mt-8 flex flex-wrap items-center gap-2">
        <span className="me-2 text-[15px] text-ink/50">Popular corridors</span>
        {popular.map((k) => (
          <Link key={k.slug} href={`/corridors/${k.slug}`} className="rounded-full bg-bg-3 px-4 py-2 text-[15px] text-ink/80 ring-1 ring-stroke-2 transition hover:bg-white hover:text-ink">
            {k.name}
          </Link>
        ))}
        <Link href="/corridors" className="rounded-full px-4 py-2 text-[15px] font-medium text-ink underline-offset-4 hover:underline">
          All corridors
        </Link>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- audiences */

export function AudienceSection() {
  return (
    <section aria-labelledby="aud-title" className={`${wrap} pb-20 md:pb-24 lg:pb-32`}>
      <SectionHeading id="aud-title" eyebrow={audiencesCopy.eyebrow} title={audiencesCopy.title} align="center" />
      <ul className="mt-14 grid gap-2 rounded-[28px] bg-bg-3 p-2 md:grid-cols-3">
        {audiences.map((a) => {
          const pic = img(a.image);
          const h = audienceHeadline[a.slug];
          return (
            <li key={a.slug}>
              <Link href={`/for/${a.slug}`} className="group flex h-full flex-col rounded-[22px] bg-white p-2 transition hover:shadow-[0_20px_50px_-24px_rgba(11,35,80,0.35)]">
                <div className="relative aspect-[16/11] overflow-hidden rounded-[16px] bg-bg-4">
                  <Image src={pic.src} alt={pic.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <p className="text-[15px] text-ink/50">For {a.label.toLowerCase()}</p>
                  <h3 className="mt-2 text-h5 font-normal text-ink">{h.title}</h3>
                  <p className="mt-2 text-ink/60">{h.text}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-medium text-ink">
                    Learn more <ArrowUpRightIcon className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/* ------------------------------------------------------------------- FAQ */

export function FaqSection() {
  return (
    <section aria-labelledby="faq-title" className={`${wrap} pb-20 md:pb-24 lg:pb-32`}>
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <SectionHeading id="faq-title" eyebrow={faq.eyebrow} title={faq.title} />
          <p className="mt-4 max-w-sm text-lg text-ink/60">Something else on your mind? We’re happy to talk.</p>
          <ButtonSecondary href={site.links.briefing} className="mt-8">
            Talk to us
          </ButtonSecondary>
        </div>
        <ul className="flex flex-col gap-2">
          {faq.items.map((f, i) => (
            <li key={f.q}>
              <details className="group rounded-[20px] bg-bg-3 px-6 py-5 ring-1 ring-stroke-2 open:bg-white sm:px-7" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg text-ink [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <ChevronDownIcon className="size-5 shrink-0 text-ink/50 transition group-open:rotate-180" aria-hidden="true" />
                </summary>
                <p className="mt-3 max-w-2xl text-ink/60">{f.a}</p>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- final CTA */

export function FinalCta() {
  return (
    <section aria-labelledby="final-title" className="px-2 pb-2">
      <div className="panel-deep overflow-hidden rounded-3xl md:rounded-[40px] xl:rounded-[56px]">
        <div className={`${wrap} py-24 text-center lg:py-36`}>
          <Tagline invert>{finalCta.eyebrow}</Tagline>
          <h2 id="final-title" className="mx-auto mt-6 max-w-4xl whitespace-pre-line text-4xl font-normal tracking-[-0.03em] text-white sm:text-6xl/[1.08]">
            {finalCta.title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/80">{finalCta.text}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <ButtonSecondary href={site.links.register}>{finalCta.cta}</ButtonSecondary>
            <ButtonGlass href={site.links.briefing}>{finalCta.secondary}</ButtonGlass>
          </div>
        </div>
      </div>
    </section>
  );
}

