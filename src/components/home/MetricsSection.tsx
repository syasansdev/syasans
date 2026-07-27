import { Counter } from "@/components/ui/counter";
import { Stagger, StaggerItem } from "@/components/ui/reveal";
import { AmbientBackdrop, Container, Section, SectionHeader } from "@/components/ui/section";
import { primaryMetrics, secondaryMetrics } from "@/content/home";

/**
 * Benefits, expressed as outcomes.
 *
 * The previous version rendered thirteen equally weighted tiles, each in a
 * different hue, each with its own micro-glow dot — so nothing was primary and
 * the eye had nowhere to land. The same thirteen figures are all still here:
 * four are promoted to headline scale, the rest support them quietly in a
 * single accent, and the malformed "88K / Rated 4.5/5.0" tile has been
 * reunited into a real rating and moved up into the hero where it does work.
 */
export const MetricsSection = () => (
  <Section tone="surface" aria-labelledby="metrics-heading">
    <AmbientBackdrop />

    <Container className="flex flex-col gap-14">
      <SectionHeader
        id="metrics-heading"
        title="A decade of measurable outcomes"
        description="Numbers from ten years of career analytics, training pedagogy and student achievement across Tamil Nadu and beyond."
      />

      {/* Headline four. */}
      <Stagger className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
        {primaryMetrics.map(({ value, suffix, label }) => (
          <StaggerItem key={label} className="text-center">
            <Counter
              value={value}
              suffix={suffix}
              className="block text-display font-semibold tracking-tight text-gradient"
            />
            <p className="mt-2 text-caption font-medium text-muted-foreground">{label}</p>
          </StaggerItem>
        ))}
      </Stagger>

      {/* Supporting eight. */}
      <Stagger
        step={0.04}
        className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4"
      >
        {secondaryMetrics.map(({ value, suffix, label }) => (
          <StaggerItem
            key={label}
            className="flex flex-col items-center justify-center gap-1 bg-card px-4 py-7 text-center"
          >
            <Counter
              value={value}
              suffix={suffix}
              className="text-h3 font-semibold text-foreground"
            />
            <p className="text-caption text-muted-foreground">{label}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </Container>
  </Section>
);
