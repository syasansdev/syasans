import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { Container, Section, SectionHeader } from "@/components/ui/section";
import { workflow } from "@/content/home";

/**
 * Workflow.
 *
 * A four-beat summary of the fourteen-step delivery framework. The connecting
 * rule is drawn once behind the row rather than as a border on each card, so
 * the sequence reads as one continuous line instead of four detached tiles.
 */
export const WorkflowSection = () => (
  <Section tone="default" aria-labelledby="workflow-heading">
    <Container className="flex flex-col gap-14">
      <SectionHeader
        id="workflow-heading"
        title="One framework, fourteen steps, nothing improvised"
        description="From the first training-need analysis to post-programme mentoring, every engagement follows the same documented path — so you always know what happens next and who owns it."
      />

      <div className="relative">
        {/* Connector. Sits behind the numbered markers, hidden while the
            cards are stacked on small screens. */}
        <div
          aria-hidden
          className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-border-strong to-transparent lg:block"
        />

        <Stagger className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8" step={0.08}>
          {workflow.map(({ title, steps, description, icon: Icon }, index) => (
            <StaggerItem key={title} className="relative flex flex-col gap-4">
              <span
                aria-hidden
                className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background text-primary shadow-sm"
              >
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </span>

              <div>
                <p className="text-overline uppercase text-muted-foreground">{steps}</p>
                <h3 className="mt-2 text-h4 text-foreground">
                  <span className="font-mono text-caption text-primary">0{index + 1}</span>{" "}
                  {title}
                </h3>
                <p className="mt-2.5 text-caption leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      <Reveal className="flex justify-center">
        <Button asChild variant="outline" size="lg">
          <Link to="/training-journey">
            Walk through all fourteen steps
            <ArrowRight aria-hidden />
          </Link>
        </Button>
      </Reveal>
    </Container>
  </Section>
);
