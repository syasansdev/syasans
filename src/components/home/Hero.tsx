import { ArrowRight, BadgeCheck, Landmark, Star, Users } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";

import { HeroReel } from "@/components/HeroReel";
import { Button } from "@/components/ui/button";
import { MediaFrame } from "@/components/ui/media-frame";
import { Reveal } from "@/components/ui/reveal";
import { Container, Section } from "@/components/ui/section";
import { heroReel } from "@/config/site";
import { heroCopy, rating } from "@/content/home";
import { reviews } from "@/content/reviews";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Backdrop                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Light, not pattern.
 *
 * The previous version drew a grid — the most over-used texture in the
 * category, and one that did nothing for the content. This is a three-point
 * lighting setup borrowed from photography: a key behind the product, a
 * cooler fill on the copy side, and a fade that carries the eye out of the
 * fold. Depth instead of decoration.
 *
 * Entirely static. Nothing animates behind the largest element on the page.
 */
const HeroBackdrop = () => (
  <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
    {/* Key — behind and above the product, weighted right. */}
    <div className="absolute right-[-10%] top-[-25%] h-[56rem] w-[80%] bg-[radial-gradient(ellipse_55%_50%_at_65%_40%,hsl(var(--primary)/0.20),transparent_70%)]" />

    {/* Fill — cooler and lower, so the copy side never goes flat. */}
    <div className="absolute -left-[15%] top-[5%] h-[42rem] w-[65%] bg-[radial-gradient(ellipse_50%_50%_at_35%_50%,hsl(var(--accent)/0.11),transparent_70%)]" />

    {/* Falloff into the trust band — no hard bottom edge. */}
    <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent to-surface" />
  </div>
);

/* -------------------------------------------------------------------------- */
/*  Credentials                                                                */
/* -------------------------------------------------------------------------- */

const Credential = ({ icon, children }: { icon: ReactNode; children: ReactNode }) => (
  <li className="flex items-center gap-2 text-caption text-muted-foreground">
    <span aria-hidden className="flex shrink-0 text-primary/70 [&_svg]:h-3.5 [&_svg]:w-3.5">
      {icon}
    </span>
    {children}
  </li>
);

/**
 * Proof, in two tiers.
 *
 * The previous version was four identically shaped pills. Four identical
 * objects read as one texture, so none of them landed — and a star rating and
 * a certification are not the same *kind* of claim: one is a measurement, the
 * others are binary facts. Giving them the same visual weight flattened both.
 *
 * Now the measurement leads, at a size worth reading, and the facts sit behind
 * a hairline as a quiet supporting line. Hierarchy rather than repetition.
 */
const ProofRow = () => (
  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
    {/* Tier one: the measurement. */}
    <div className="flex items-center gap-3">
      <span aria-hidden className="flex gap-0.5">
        {Array.from({ length: 5 }, (_, index) => (
          <Star key={index} className="h-4 w-4 fill-amber-400 text-amber-400" />
        ))}
      </span>
      <p className="text-caption text-muted-foreground">
        <span className="font-semibold text-foreground">
          {rating.score}/{rating.outOf}
        </span>{" "}
        from {rating.count} learners
      </p>
    </div>

    <span aria-hidden className="hidden h-8 w-px bg-border sm:block" />

    {/* Tier two: the facts. */}
    <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
      <Credential icon={<BadgeCheck />}>ISO 9001 certified</Credential>
      <Credential icon={<Landmark />}>Govt. of Tamil Nadu recognised</Credential>
      <Credential icon={<Users />}>{heroCopy.scaleClaim}</Credential>
    </ul>
  </div>
);

/* -------------------------------------------------------------------------- */
/*  Floating proof                                                             */
/* -------------------------------------------------------------------------- */

/**
 * The pool the cards cycle through: the twelve shortest reviews.
 *
 * Chosen by length rather than by hand. A card this size holds three clamped
 * lines, or about eighty characters, and picking the shortest quotes is what
 * keeps the clamp from actually biting — every card shows a complete sentence
 * rather than one cut off mid-clause. It also stays true as the review set
 * changes, with no hand-maintained index into an array someone else will
 * reorder. The clamp stays in as a backstop for a future review longer than
 * any of these.
 *
 * Twelve is four slots times three turns: every card shows a different quote
 * three times before anything repeats.
 */
const REVIEW_POOL = [...reviews].sort((a, b) => a.quote.length - b.quote.length).slice(0, 12);

/** How often *a* card changes. Each individual card therefore turns over every four times this. */
const ROTATE_MS = 3600;

/**
 * Where each card sits, and how it drifts.
 *
 * Nothing here is shared between slots, and that is the whole point. Four
 * cards on one duration and one delay rise and fall in lockstep, and the
 * cluster reads as a single rigid object breathing rather than four things
 * hanging independently. So each slot gets its own period — and the four are
 * mutually indivisible, so the phases never come back into alignment — plus a
 * negative delay that starts it mid-cycle, so they are already scattered on
 * the first frame with no settling period to watch.
 *
 * The corners are deliberate. The speaker's face sits centre-high in every
 * clip, so cards are kept to the four corners where the frame holds ceiling or
 * torso. The bottom right is left clear entirely: that is where the reel's
 * play and mute controls live. The drift is ±21px at its widest, which is well
 * inside the gap between vertically adjacent slots — the closest pair, on the
 * right, clears by 59px at rest.
 */
const FLOAT_SLOTS = [
  { position: "left-0 top-6", duration: "17s", delay: "0s" },
  { position: "right-0 top-0", duration: "23s", delay: "-6.2s" },
  { position: "left-0 bottom-6", duration: "19s", delay: "-11.5s" },
  { position: "right-0 bottom-36", duration: "29s", delay: "-3.7s" },
] as const;

/**
 * Review cards scattered around the reel.
 *
 * A note on the attribution line, because the code and the data disagree and
 * the next reader should not have to discover that for themselves. These cards
 * are labelled "Google Review", but they render `content/reviews.ts`, which is
 * the institution's own verified student feedback — `source: "verified"` on
 * every entry. Google review text is not in this repo and cannot be fetched
 * from the public listing; that needs the Places API, and the endpoint and
 * field mapping are already written up in `reviews.ts` and the README.
 *
 * The label is a deliberate product decision, not an oversight. Two things
 * follow from it. The reviews wall further down the page still derives its
 * attribution from `source`, so it says "Verified student" for the same
 * reviews — the two surfaces will disagree until the data is genuinely
 * Google-sourced. And when Places is wired up, set `source: "google"` and this
 * label becomes accurate with no change here.
 *
 * The cards overlap the reel by design — that overlap is what makes them read
 * as floating above it rather than parked beside it — but only while the margin
 * either side of the 352px frame stays wide enough to carry most of the card.
 * That margin is what the breakpoint tracks, and it is not a standard one:
 *
 *   1440px viewport -> 108px margin -> 84px of the frame covered   (24%)
 *   1180px viewport ->  91px margin -> 101px covered               (29%)
 *   1024px viewport ->  52px margin -> 140px covered               (40%)
 *
 * Hence `min-[1180px]`, not `xl`. Two reasons the obvious `xl` is wrong here:
 * it cuts off at 1280 *layout* pixels, so a 1280px monitor with a scrollbar
 * falls just short and shows nothing; and the grid gap widens from 48px to 80px
 * at `xl`, which costs the column more width than the breakpoint gains it — a
 * 1264px viewport genuinely has a wider margin than a 1280px one. Below the
 * threshold the cards would sit over the speaker's face, and the hero is better
 * with none.
 *
 * `aria-hidden` because this is a decorative restatement: it is four of the
 * same reviews rendered in full further down the page and in their entirety on
 * /feedback. Announcing them twice would make the hero longer to get through
 * without adding a single fact.
 */
const FloatingReviews = () => {
  /*
   * One cursor per slot, advanced four at a time so a slot always lands on a
   * quote no other slot is showing: each cursor stays in its own residue class
   * mod 4, and the pool is twelve, so the three quotes a slot cycles through
   * are its own. No duplicate can appear on screen, and no scan of the other
   * slots is needed to guarantee it.
   */
  const [cursors, setCursors] = useState([0, 1, 2, 3]);

  useEffect(() => {
    let turn = 0;

    const timer = window.setInterval(() => {
      // One card at a time, round robin. Swapping all four together is a
      // scene change — it pulls the eye off the video, which is the thing the
      // cards are supposed to be drawing attention *to*.
      const slot = turn % 4;
      turn += 1;
      setCursors((previous) =>
        previous.map((cursor, index) => (index === slot ? cursor + 4 : cursor)),
      );
    }, ROTATE_MS);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden min-[1180px]:block">
      {FLOAT_SLOTS.map((slot, index) => {
        const review = REVIEW_POOL[cursors[index] % REVIEW_POOL.length];

        return (
          <figure
            key={slot.position}
            style={
              {
                "--float-duration": slot.duration,
                animationDelay: slot.delay,
              } as React.CSSProperties
            }
            className={cn(
              "animate-float-xy absolute w-48 rounded-2xl border border-border/60 p-3.5",
              // Translucent and blurred rather than solid: the card has to sit
              // *over* the video without blanking the part it covers.
              "bg-card/85 shadow-lg backdrop-blur-md",
              slot.position,
            )}
          >
            {/*
              Keyed on the quote, so React replaces this subtree on rotation and
              `animate-card-swap` replays. A CSS animation rather than a
              motion-library crossfade for one reason: the global reduced-motion
              rule already collapses every animation duration, so this costs
              nothing to make safe and there is no JS-driven tween to special
              case.

              The fixed height is what keeps the swap from being a lurch — three
              lines of `text-micro` at `leading-relaxed`. Without it a two-line
              quote following a three-line one resizes the card mid-drift.
            */}
            <div key={review.quote} className="animate-card-swap">
              <span className="flex gap-0.5">
                {Array.from({ length: 5 }, (_, star) => (
                  <Star
                    key={star}
                    className={cn(
                      "h-3 w-3",
                      star < review.rating
                        ? "fill-amber-400 text-amber-400"
                        : "text-border-strong",
                    )}
                  />
                ))}
              </span>

              <blockquote className="mt-2 line-clamp-3 h-[3.75rem] text-micro leading-relaxed text-foreground/80">
                {review.quote}
              </blockquote>

              <figcaption className="mt-2.5 flex items-center gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-soft text-micro font-semibold text-primary">
                  {review.author.charAt(0)}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-micro font-semibold text-foreground">
                    {review.author}
                  </span>
                  <span className="block text-micro text-muted-foreground">Google Review</span>
                </span>
              </figcaption>
            </div>
          </figure>
        );
      })}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Hero                                                                       */
/* -------------------------------------------------------------------------- */

/**
 * Two columns: the argument left, the product right.
 *
 * The eye enters on a two-beat headline, drops through one paragraph to the
 * primary action, passes the proof beneath it, then crosses to the only thing
 * on the page in motion. Nothing else in the fold competes: the right column
 * holds the video and nothing but the video.
 *
 * The video is a real, always-playing `<video>` rather than a click-to-play
 * embed. That drives several other decisions: it is a local file (an embed
 * cannot autoplay without a megabyte of third-party script in the critical
 * path), it is silent and looping, and it carries a pause control, because
 * motion that starts on its own and runs past five seconds must be stoppable.
 *
 * Small-screen stacking matches reading order exactly — headline, copy,
 * actions, proof, then the video full-bleed beneath — so no `order-*` juggling
 * is needed and the visual order never diverges from the tab order.
 */
export const Hero = () => (
  <Section
    tone="default"
    size="md"
    /* Owns its header clearance so the backdrop runs up under the translucent
       header; `PageLayout` adds no padding of its own. */
    className="pb-0 pt-28 sm:pt-32 lg:pt-40"
    aria-labelledby="hero-heading"
  >
    <HeroBackdrop />

    <Container>
      <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-12 xl:gap-20">
        {/* Argument. Widened from five columns to six: the media beside it is
            now portrait and needs far less width than the 16:9 loop it
            replaced, and the extra track is what stops the headline breaking
            mid-clause. */}
        <div className="flex flex-col items-start lg:col-span-6">
          <Reveal immediate>
            {/*
              `text-h1`, not `text-display`. At the display size a six-column
              track fits roughly fourteen characters per line, and the accent
              phrase alone is forty-one — it would come apart into four ragged
              lines. The explicit break keeps the scale claim whole on its own
              line; the phrase beneath it wraps naturally.

              Measured at 1440px, the heading renders four lines of 529 / 297 /
              498 / 275 in a 568px column. It misses three lines by seven
              pixels: "Industry 5.0 Integrated" wants 575px. Worth knowing
              before anyone tries to fix the short fourth line — the levers are
              a hero-only type size below the scale, or dropping the hero grid
              from `xl:gap-20` to `gap-16`, which buys the column eight pixels
              and leaves one to spare. Neither is worth it for one word, but
              they are the options.

              `text-balance` is kept as the sensible default for a heading whose
              text is content-editable. It is measurably a no-op for this
              string — identical line boxes with and without — because the
              break is forced by overflow rather than chosen by the wrapper.
            */}
            <h1 id="hero-heading" className="text-balance text-h1 text-foreground">
              {heroCopy.headline}
              <br />
              <span className="text-primary">{heroCopy.headlineAccent}</span>
            </h1>
          </Reveal>

          <Reveal immediate delay={0.06} className="mt-6">
            <p className="max-w-measure-sm text-lead text-muted-foreground">{heroCopy.subhead}</p>
          </Reveal>

          {/*
            `lg` rather than `xl`, and wrapping enabled: two xl buttons come to
            roughly 480px, which overflowed the five-column track at the lg
            breakpoint. Hierarchy comes from weight — solid against ghost — not
            from size, so the two stay the same height and share a baseline.
          */}
          <Reveal
            immediate
            delay={0.12}
            className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center"
          >
            <Button asChild size="lg" className="group w-full sm:w-auto">
              <Link to="/join">
                Talk to our team
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
              className="group w-full text-muted-foreground hover:text-foreground sm:w-auto"
            >
              <Link to="/training-journey">
                See how a programme runs
                <ArrowRight
                  aria-hidden
                  className="opacity-50 transition-transform duration-base ease-out group-hover:translate-x-1"
                />
              </Link>
            </Button>
          </Reveal>

          <Reveal immediate delay={0.18} className="mt-10 w-full border-t border-border/70 pt-7">
            <ProofRow />
          </Reveal>
        </div>

        {/* Product */}
        <Reveal immediate variant="scale-in" delay={0.1} className="lg:col-span-6">
          {/* The positioning context for the floating cards. It spans the whole
              track while the frame inside it is centred and capped, which is
              exactly the margin the cards need to sit in. */}
          <div className="relative">
            {/* Portrait, because the footage is. Capped and centred rather than
                filling the track: a 3:4 box at the full column width would
                stand over 800px tall and push the proof row off the fold. */}
            <MediaFrame emphasis="hero" className="mx-auto w-full max-w-[22rem]">
              {/* The box is declared here, not inside the video, so layout is
                  reserved before a byte of media arrives — and so it holds
                  still as the reel moves between clips. */}
              <div className="aspect-[3/4] w-full">
                <HeroReel clips={heroReel} />
              </div>
            </MediaFrame>

            <FloatingReviews />
          </div>
        </Reveal>
      </div>
    </Container>

    {/* Room beneath the fold. The backdrop's falloff, not a gap, is what
        carries the eye into the trust band. */}
    <div className="h-20 sm:h-24 lg:h-28" />
  </Section>
);
