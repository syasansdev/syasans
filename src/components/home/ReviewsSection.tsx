import { ArrowUpRight, Quote, Star } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Container, Section } from "@/components/ui/section";
import { contact } from "@/config/site";
import { rating } from "@/content/home";
import { reviews, toColumns, type Review } from "@/content/reviews";

/* -------------------------------------------------------------------------- */

/** How far each column drifts, in pixels, across the section's scroll range. */
const DRIFT = [56, -44, 40] as const;

/** Nine reviews: three columns of three, the third revealed at `lg`. */
const COLUMNS = toColumns(reviews.slice(0, 9), 3);

/* -------------------------------------------------------------------------- */

const ReviewCard = ({ author, quote, rating: score, postedAt, source }: Review) => (
  <figure className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-[box-shadow,border-color] duration-base ease-out hover:border-primary/25 hover:shadow-md">
    <div className="flex items-center justify-between gap-3">
      <span aria-hidden className="flex gap-0.5">
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            key={index}
            className={
              index < score
                ? "h-3.5 w-3.5 fill-amber-400 text-amber-400"
                : "h-3.5 w-3.5 text-border-strong"
            }
          />
        ))}
      </span>
      <span className="sr-only">{score} out of 5</span>
      <Quote aria-hidden className="h-4 w-4 shrink-0 text-primary/30" />
    </div>

    <blockquote className="mt-4 text-caption leading-relaxed text-foreground/85">{quote}</blockquote>

    <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
      <span
        aria-hidden
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-soft text-caption font-semibold text-primary"
      >
        {author.charAt(0)}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-caption font-semibold text-foreground">{author}</span>
        <span className="block text-micro text-muted-foreground">
          {source === "google" ? "Google review" : "Verified student"}
          {postedAt ? ` · ${postedAt}` : ""}
        </span>
      </span>
    </figcaption>
  </figure>
);

/* -------------------------------------------------------------------------- */

const ReviewColumn = ({
  items,
  y,
  className,
}: {
  items: Review[];
  y: MotionValue<number>;
  className?: string;
}) => (
  <motion.div style={{ y }} className={`flex flex-col gap-5 ${className ?? ""}`}>
    {items.map((review) => (
      <ReviewCard key={review.author} {...review} />
    ))}
  </motion.div>
);

/* -------------------------------------------------------------------------- */

/**
 * Reviews, on a parallax wall.
 *
 * The parallax is scroll-linked rather than time-based: three columns drift at
 * different rates and in alternating directions as the section crosses the
 * viewport, which is what produces an actual sense of depth. A time-based
 * animation would move whether or not the reader was looking, and would read as
 * decoration instead of dimension.
 *
 * Implementation notes:
 *  - Only `transform` is animated, so every frame stays on the compositor and
 *    nothing triggers layout or paint.
 *  - Drift is capped at 56px and the section's own vertical padding is far
 *    larger, so the columns can never expose a gap at the top or bottom edge.
 *  - Under `prefers-reduced-motion` the drift is zero. The wall still renders;
 *    it simply holds still.
 *
 * On the aggregate figure: 4.5 from 88K is the institution's own learner
 * rating, which is why it is labelled as such. It is *not* presented as a
 * Google score, and the cards are attributed to verified students rather than
 * carrying a Google mark — the link out is the only Google claim on the
 * section, and it points at the real listing.
 */
export const ReviewsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /* Each column maps the same 0→1 progress onto a different displacement.
     Halving the range when motion is reduced is not enough — it has to be
     nothing — so the output range collapses to zero. */
  const scale = prefersReducedMotion ? 0 : 1;
  const columnY = [
    useTransform(scrollYProgress, [0, 1], [DRIFT[0] * scale, -DRIFT[0] * scale]),
    useTransform(scrollYProgress, [0, 1], [DRIFT[1] * scale, -DRIFT[1] * scale]),
    useTransform(scrollYProgress, [0, 1], [DRIFT[2] * scale, -DRIFT[2] * scale]),
  ];

  return (
    <Section ref={sectionRef} tone="surface" aria-labelledby="reviews-heading">
      {/* Backdrop drifts too, at a lower rate, so the cards read as nearer to
          the reader than the light behind them. */}
      <motion.div
        aria-hidden
        style={{ y: useTransform(scrollYProgress, [0, 1], [-30 * scale, 30 * scale]) }}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-x-0 top-[-15%] h-[45rem] bg-[radial-gradient(ellipse_50%_45%_at_50%_40%,hsl(var(--primary)/0.12),transparent_70%)]" />
      </motion.div>

      <Container className="flex flex-col gap-14">
        {/* Aggregate */}
        <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_auto]">
          <Reveal className="flex flex-col gap-5">
            <h2 id="reviews-heading" className="max-w-measure-sm text-h2 text-foreground">
              Rated {rating.score} out of {rating.outOf} by {rating.count} learners
            </h2>

            <div className="flex items-center gap-3">
              <span aria-hidden className="flex gap-0.5">
                {Array.from({ length: 5 }, (_, index) => (
                  <Star key={index} className="h-5 w-5 fill-amber-400 text-amber-400" />
                ))}
              </span>
              <p className="text-caption text-muted-foreground">
                Unedited feedback from cohorts across our partner campuses.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.06} className="flex flex-wrap gap-3">
            <Button asChild variant="outline">
              <a href={contact.reviewsUrl} target="_blank" rel="noopener noreferrer">
                Read our reviews on Google
                <ArrowUpRight aria-hidden />
              </a>
            </Button>
            <Button asChild variant="ghost" className="text-muted-foreground hover:text-foreground">
              <Link to="/feedback">See all {reviews.length}</Link>
            </Button>
          </Reveal>
        </div>

        {/* The wall */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <ReviewColumn items={COLUMNS[0]} y={columnY[0]} />
          <ReviewColumn items={COLUMNS[1]} y={columnY[1]} />
          {/* Held back until there is room for a third track without cramping
              the first two. */}
          <ReviewColumn items={COLUMNS[2]} y={columnY[2]} className="hidden lg:flex" />
        </div>
      </Container>
    </Section>
  );
};
