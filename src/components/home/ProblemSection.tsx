import { Card } from "@/components/ui/card";
import { Stagger, StaggerItem } from "@/components/ui/reveal";
import { Container, Section, SectionHeader } from "@/components/ui/section";
import { problems } from "@/content/home";

/**
 * Problem.
 *
 * Names the reader's situation before offering a solution. Deliberately the
 * quietest band on the page — no gradients, no glow, no accent colour on the
 * icons — so the Solution section that follows reads as a lift.
 */
export const ProblemSection = () => (
  <Section tone="default" aria-labelledby="problem-heading">
    <Container className="flex flex-col gap-14">
      <SectionHeader
        id="problem-heading"
        title="Placement outcomes stall for reasons a marksheet cannot show"
        description="Employers hire for behavioural maturity, digital proficiency and workplace readiness. Most institutions have no instrument that measures any of the three."
      />

      <Stagger className="grid gap-6 md:grid-cols-3">
        {problems.map(({ title, description, icon: Icon }) => (
          <StaggerItem key={title}>
            <Card elevation="flat" className="h-full bg-surface p-7">
              <Icon aria-hidden className="h-6 w-6 text-muted-foreground" strokeWidth={1.75} />
              <h3 className="mt-5 text-h4 text-foreground">{title}</h3>
              <p className="mt-3 text-caption leading-relaxed text-muted-foreground">
                {description}
              </p>
            </Card>
          </StaggerItem>
        ))}
      </Stagger>
    </Container>
  </Section>
);
