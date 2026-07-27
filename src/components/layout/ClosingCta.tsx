import { ArrowRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Container, Section } from "@/components/ui/section";
import { contact } from "@/config/site";

type ClosingCtaProps = {
  /** Defaults to the general invitation; override to answer the page. */
  title?: string;
  description?: string;
};

/**
 * The closing call to action.
 *
 * Every content page ends here. Previously only the homepage did, so a visitor
 * who read the whole of Products or Partners reached the footer with nothing
 * asked of them — the page simply stopped.
 *
 * It is the only `inverted` band on any page, which is what lets it terminate
 * the scroll decisively rather than blending into the footer beneath it. The
 * copy is overridable so the ask can follow from what the visitor has just
 * read, while the shape stays identical site-wide.
 */
export const ClosingCta = ({
  title = "Bring career analytics to your campus",
  description = "Tell us about your cohort and we'll come back with a training-need analysis and a delivery plan built for it — usually within a working day.",
}: ClosingCtaProps) => (
  <Section tone="inverted" size="lg" aria-labelledby="closing-cta-heading">
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_70%_at_50%_0%,hsl(var(--primary)/0.35),transparent_70%)]"
    />

    <Container className="flex flex-col items-center text-center">
      <Reveal>
        <h2 id="closing-cta-heading" className="max-w-3xl text-h1">
          {title}
        </h2>
      </Reveal>

      <Reveal delay={0.06} className="mt-5">
        <p className="max-w-measure text-lead text-background/75">{description}</p>
      </Reveal>

      <Reveal
        delay={0.12}
        className="mt-9 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row"
      >
        <Button asChild size="lg" variant="inverse" className="group w-full sm:w-auto">
          <Link to="/join">
            Start a conversation
            <ArrowRight
              aria-hidden
              className="transition-transform duration-base ease-out group-hover:translate-x-1"
            />
          </Link>
        </Button>
        <Button
          asChild
          size="lg"
          variant="ghost"
          className="w-full text-background/80 hover:bg-background/10 hover:text-background sm:w-auto"
        >
          <a href={`mailto:${contact.email}`}>
            <Mail aria-hidden />
            {contact.email}
          </a>
        </Button>
      </Reveal>
    </Container>
  </Section>
);
