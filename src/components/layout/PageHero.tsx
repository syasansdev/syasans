import type { ReactNode } from "react";

import { Reveal } from "@/components/ui/reveal";
import { Container, Section } from "@/components/ui/section";

type PageHeroProps = {
  title: ReactNode;
  /** Rendered in the brand gradient, continuing the same headline. */
  highlight?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
};

/**
 * The standard interior-page header.
 *
 * Replaces the old `HeroSection`, which exposed a `highlightColor` prop that
 * every caller set to a different value — the mechanism by which five pages
 * ended up with five different heading accent colours. The accent is now the
 * brand gradient, always, and is not configurable.
 */
export const PageHero = ({ title, highlight, description, children }: PageHeroProps) => (
  <Section tone="surface" size="md" className="pt-28 sm:pt-32">
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute inset-x-0 top-0 h-80 bg-[radial-gradient(ellipse_70%_70%_at_50%_0%,hsl(var(--primary)/0.11),transparent_70%)]" />
    </div>

    <Container className="flex flex-col items-center text-center">
      <Reveal immediate>
        <h1 className="mx-auto max-w-4xl text-h1 text-foreground">
          {title}
          {highlight ? (
            <>
              {" "}
              <span className="text-gradient">{highlight}</span>
            </>
          ) : null}
        </h1>
      </Reveal>

      {description ? (
        <Reveal immediate delay={0.06} className="mt-5">
          <p className="mx-auto max-w-measure text-lead text-muted-foreground">{description}</p>
        </Reveal>
      ) : null}

      {children ? (
        <Reveal immediate delay={0.12} className="mt-8">
          {children}
        </Reveal>
      ) : null}
    </Container>
  </Section>
);
