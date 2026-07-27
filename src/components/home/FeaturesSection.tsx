import { Card } from "@/components/ui/card";
import { Stagger, StaggerItem } from "@/components/ui/reveal";
import { Container, Section, SectionHeader } from "@/components/ui/section";
import { features } from "@/content/home";

/**
 * Features.
 *
 * One card treatment, one image ratio, one icon size, one hover response.
 * The previous version of this content (an array in `Index.tsx` that was never
 * actually rendered) carried a per-card colour key that expanded into a
 * fourteen-branch class-name lookup table — fourteen accent colours competing
 * inside a single grid.
 */
export const FeaturesSection = () => (
  <Section tone="default" aria-labelledby="features-heading">
    <Container className="flex flex-col gap-14">
      <SectionHeader
        id="features-heading"
        title="Everything a placement cell needs, under one accountable programme"
        description="Six capabilities that operate as one system — assessment feeds training, training feeds analytics, analytics feeds the next intervention."
      />

      <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ title, description, icon: Icon, image }) => (
          <StaggerItem key={title} className="h-full">
            <Card interactive className="group h-full overflow-hidden">
              <div className="relative aspect-[16/10] overflow-hidden bg-surface-strong">
                <img
                  src={image}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-slower ease-out group-hover:scale-105"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent"
                />
                <span
                  aria-hidden
                  className="absolute bottom-4 left-5 flex h-11 w-11 items-center justify-center rounded-xl bg-background/95 text-primary shadow-md ring-1 ring-inset ring-border/60"
                >
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
              </div>

              <div className="p-5">
                <h3 className="text-h4 text-foreground transition-colors duration-base group-hover:text-primary">
                  {title}
                </h3>
                <p className="mt-2.5 text-caption leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>
            </Card>
          </StaggerItem>
        ))}
      </Stagger>
    </Container>
  </Section>
);
