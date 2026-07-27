import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { IconTile } from "@/components/ui/icon-tile";
import { MediaFrame } from "@/components/ui/media-frame";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { AmbientBackdrop, Container, Section } from "@/components/ui/section";
import { solutionSteps } from "@/content/home";

/**
 * Solution.
 *
 * Answers the Problem section point for point, and shows the artefact that
 * makes the claim credible — the institutional dashboard — rather than
 * describing it.
 */
export const SolutionSection = () => (
  <Section tone="surface" aria-labelledby="solution-heading">
    <AmbientBackdrop />

    <Container>
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Copy */}
        <div className="flex flex-col items-start gap-6">
          <Reveal>
            <h2 id="solution-heading" className="text-h2 text-foreground">
              Measure first. Then teach what the data asks for.
            </h2>
          </Reveal>

          <Reveal delay={0.06}>
            <p className="max-w-measure text-lead text-muted-foreground">
              Every engagement opens with a scientifically designed assessment — psychometrics,
              competency mapping and behavioural analysis — so institutions gain deep insight into
              each learner&rsquo;s abilities, strengths and development needs before a single
              session is scheduled.
            </p>
          </Reveal>

          <Stagger className="mt-2 flex flex-col gap-6" step={0.08}>
            {solutionSteps.map(({ title, description, icon: Icon }, index) => (
              <StaggerItem key={title} className="flex gap-4">
                <IconTile icon={<Icon />} />
                <div>
                  <h3 className="flex items-baseline gap-2 text-h4 text-foreground">
                    <span className="font-mono text-caption text-primary">
                      0{index + 1}
                    </span>
                    {title}
                  </h3>
                  <p className="mt-1.5 max-w-measure-sm text-caption leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.16} className="mt-2">
            <Button asChild variant="outline">
              <Link to="/referring-to">
                See the full methodology
                <ArrowRight aria-hidden />
              </Link>
            </Button>
          </Reveal>
        </div>

        {/* Evidence */}
        <Reveal variant="scale-in" delay={0.1}>
          <MediaFrame>
            <img
              src="/assets/Dashboard.jpg"
              alt="Syasan's institutional dashboard showing cohort performance and placement readiness metrics"
              loading="lazy"
              decoding="async"
              width={1200}
              height={900}
              className="aspect-[4/3] w-full object-cover object-left-top"
            />
          </MediaFrame>
        </Reveal>
      </div>
    </Container>
  </Section>
);
