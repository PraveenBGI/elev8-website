import { AudienceSection, FaqSection, FinalCta, Gatewai, Hero, HowItWorks, MarketsSection, SolutionsSection, Statement, TrustSection } from "@/components/home/HomeSections";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Statement />
      <HowItWorks />
      <SolutionsSection />
      <Gatewai />
      <TrustSection />
      <MarketsSection />
      <AudienceSection />
      <FaqSection />
      <FinalCta />
    </>
  );
}
