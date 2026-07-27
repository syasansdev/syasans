import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/ui/reveal";
import { Container, Section, SectionHeader } from "@/components/ui/section";
import { faqs } from "@/content/home";

/**
 * FAQ.
 *
 * Built on the Radix accordion, so keyboard navigation, `aria-expanded` and
 * the disclosure relationship are handled correctly rather than reimplemented
 * with a `useState` boolean and a `<div>`.
 */
export const FaqSection = () => (
  <Section tone="default" aria-labelledby="faq-heading">
    <Container className="flex flex-col gap-14">
      <SectionHeader
        id="faq-heading"
        title="What institutions ask us first"
        description="If your question isn't here, the fastest route is a fifteen-minute call with our team."
      />

      <Reveal className="mx-auto w-full max-w-3xl">
        <Accordion type="single" collapsible className="flex flex-col gap-3">
          {faqs.map(({ question, answer }, index) => (
            <AccordionItem
              key={question}
              value={`faq-${index}`}
              className="overflow-hidden rounded-2xl border border-border bg-card px-5 transition-colors duration-base hover:border-border-strong data-[state=open]:border-primary/25"
            >
              <AccordionTrigger className="gap-4 py-5 text-left text-h4 font-medium hover:no-underline">
                {question}
              </AccordionTrigger>
              <AccordionContent className="pb-5 pr-8 text-body leading-relaxed text-muted-foreground">
                {answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </Container>
  </Section>
);
