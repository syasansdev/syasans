import { Seo } from "@/components/Seo";
import { FaqSection } from "@/components/home/FaqSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { Hero } from "@/components/home/Hero";
import { MetricsSection } from "@/components/home/MetricsSection";
import { ProblemSection } from "@/components/home/ProblemSection";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { SolutionSection } from "@/components/home/SolutionSection";
import { TrustBand } from "@/components/home/TrustBand";
import { WorkflowSection } from "@/components/home/WorkflowSection";
import { ClosingCta } from "@/components/layout/ClosingCta";
import { PageLayout } from "@/components/layout/PageLayout";
import { siteConfig } from "@/config/site";

/**
 * The homepage is a narrative, read top to bottom:
 *
 *   Hero          what this is, and see it working
 *   Trust         who already relies on it
 *   Problem       the situation you're in
 *   Solution      how we address it
 *   Features      what you actually get
 *   Benefits      the outcomes, in numbers
 *   Workflow      how an engagement runs
 *   Reviews       confirmation from people who did it
 *   FAQ           the remaining objections
 *   CTA           the one next step
 *
 * Each band alternates tone (default / surface) so the page has rhythm, and
 * the composition lives entirely here — every section owns its own file, so
 * this file stays readable as the story changes.
 */
const Index = () => (
  <PageLayout>
    <Seo
      title={`${siteConfig.name} ${siteConfig.tagline} — ${siteConfig.legalName}`}
      description={siteConfig.description}
    />

    <Hero />
    <TrustBand />
    <ProblemSection />
    <SolutionSection />
    <FeaturesSection />
    <MetricsSection />
    <WorkflowSection />
    <ReviewsSection />
    <FaqSection />
    <ClosingCta />
  </PageLayout>
);

export default Index;
