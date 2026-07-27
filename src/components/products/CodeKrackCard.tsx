import { ArrowUpRight, Code2 } from "lucide-react";

import { IconTile } from "@/components/ui/icon-tile";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Container, Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";

const CODEKRACK_URL = "https://codekrack.in";

/**
 * Decorative editor mock.
 *
 * Built from tokens rather than shipped as a screenshot: it stays sharp at any
 * density, costs no bytes, adapts to the dark theme, and cannot go stale when
 * the real product's interface changes. Entirely `aria-hidden` — it carries no
 * information the copy alongside it does not already state.
 */
const EditorMock = () => (
  <div
    aria-hidden
    className="w-full overflow-hidden rounded-2xl border border-border/70 bg-surface-strong shadow-lg"
  >
    <div className="flex items-center gap-1.5 border-b border-border/70 bg-surface px-4 py-3">
      {["bg-destructive/50", "bg-amber-400/60", "bg-success/50"].map((dot) => (
        <span key={dot} className={`h-2.5 w-2.5 rounded-full ${dot}`} />
      ))}
      <span className="ml-2 font-mono text-micro text-muted-foreground">two-sum.py</span>
    </div>

    <div className="flex flex-col gap-2.5 p-5 font-mono text-micro leading-none">
      {[
        { indent: 0, width: "w-[62%]", tone: "bg-primary/45" },
        { indent: 1, width: "w-[78%]", tone: "bg-foreground/15" },
        { indent: 1, width: "w-[45%]", tone: "bg-foreground/15" },
        { indent: 2, width: "w-[68%]", tone: "bg-accent/40" },
        { indent: 2, width: "w-[52%]", tone: "bg-foreground/15" },
        { indent: 1, width: "w-[36%]", tone: "bg-primary/45" },
      ].map((line, index) => (
        <div key={index} className="flex items-center gap-3">
          <span className="w-3 shrink-0 text-right text-muted-foreground/50">{index + 1}</span>
          <span
            className={`h-2 rounded-full ${line.width} ${line.tone}`}
            style={{ marginLeft: `${line.indent * 0.875}rem` }}
          />
        </div>
      ))}

      <div className="mt-3 flex items-center gap-2 rounded-lg bg-success/10 px-3 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-success" />
        <span className="text-micro text-success">All test cases passed</span>
      </div>
    </div>
  </div>
);

/**
 * CodeKrack — Syasan's coding practice platform.
 *
 * The entire card is a single anchor, so it is one tab stop, one focus ring
 * and one 100%-sized tap target on touch — rather than a decorative panel with
 * a small link buried in it.
 *
 * NOTE ON COPY: codekrack.in renders its content client-side, so its feature
 * list could not be read at the time this was written. The description below
 * is deliberately general. Replace it with the product's real positioning.
 */
export const CodeKrackCard = () => (
  <Section tone="default" aria-labelledby="codekrack-heading">
    <Container>
      <Reveal>
        <a
          href={CODEKRACK_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open CodeKrack at codekrack.in (opens in a new tab)"
          className="group relative block overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-[transform,box-shadow,border-color] duration-base ease-out hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
        >
          {/* Brand wash. Strengthens on hover instead of appearing, so nothing
              flashes in. */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_85%_20%,hsl(var(--primary)/0.10),transparent_70%)] opacity-70 transition-opacity duration-slow ease-out group-hover:opacity-100"
          />

          <div className="relative grid items-center gap-10 p-8 sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:gap-14">
            <div className="flex flex-col items-start">
              <IconTile icon={<Code2 />} tone="solid" interactive />

              <h2 id="codekrack-heading" className="mt-6 text-h2 text-foreground">
                CodeKrack
              </h2>

              <p className="mt-4 max-w-measure text-lead text-muted-foreground">
                Syasan&rsquo;s online coding practice platform &mdash; where our learners build
                programming fluency between sessions, and where their progress feeds back into the
                analytics their institution sees.
              </p>

              {/* Styled as a button but rendered as plain text: the whole card
                  is already the link, and nesting a second interactive element
                  inside an anchor is invalid. */}
              {/*
                  Rendered from `buttonVariants` rather than a copy of its
                  classes, so it cannot drift from a real Button. It is a
                  `<span>`, not a button: the whole card is already the link,
                  and nesting an interactive element inside an anchor is
                  invalid HTML and traps keyboard users.
              */}
              <span
                className={cn(
                  buttonVariants({ size: "default" }),
                  "mt-8 group-hover:bg-primary/90 group-hover:shadow-md",
                )}
              >
                Open codekrack.in
                <ArrowUpRight
                  aria-hidden
                  className="h-4 w-4 transition-transform duration-base ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </span>
            </div>

            <div className="transition-transform duration-slow ease-out group-hover:-translate-y-1">
              <EditorMock />
            </div>
          </div>
        </a>
      </Reveal>
    </Container>
  </Section>
);
