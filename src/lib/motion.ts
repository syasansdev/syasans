import type { Transition, Variants } from "framer-motion";

/**
 * The motion language.
 *
 * Mirrors the CSS tokens in `index.css` so a Framer-animated element and a
 * CSS-transitioned element next to it move identically. Components import
 * from here instead of inventing spring constants.
 *
 * Principles:
 *  - Motion explains a relationship (this came from there / this belongs to
 *    that). If it explains nothing, it is removed.
 *  - Entrances travel a short distance. 12–16px reads as "settling"; 30–50px
 *    reads as "flying in" and gets tiring over a long page.
 *  - Nothing rotates, bounces past its resting state, or delays longer than
 *    a third of a second.
 */

export const EASE = {
  out: [0.22, 1, 0.36, 1],
  inOut: [0.65, 0, 0.35, 1],
} as const;

export const DURATION = {
  fast: 0.15,
  base: 0.25,
  slow: 0.45,
  slower: 0.7,
} as const;

/** Delay between siblings in a staggered group. */
export const STAGGER_STEP = 0.06;

/**
 * Cap on total stagger delay. Without this, a 14-item grid ends up with the
 * last card arriving ~0.9s after the first — long enough that a fast
 * scroller sees it pop in late.
 */
const MAX_STAGGER_DELAY = 0.3;

/** Per-index delay for manually staggered lists (grids, marquee rows). */
export const staggerDelay = (index: number, step: number = STAGGER_STEP): number =>
  Math.min(index * step, MAX_STAGGER_DELAY);

export const transition: Transition = {
  duration: DURATION.slow,
  ease: EASE.out,
};

/**
 * Shared viewport config for scroll-triggered reveals.
 * `once` because re-animating on scroll-up is noise, and the negative bottom
 * margin fires the reveal slightly before the element is fully on screen so
 * it finishes as the reader arrives rather than starting then.
 */
export const viewport = { once: true, margin: "0px 0px -12% 0px" } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1, transition },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition },
};

export const variants = {
  "fade-up": fadeUp,
  "fade-in": fadeIn,
  "scale-in": scaleIn,
  "slide-left": slideInLeft,
  "slide-right": slideInRight,
} satisfies Record<string, Variants>;

export type MotionVariant = keyof typeof variants;

/** Parent variant that drives `staggerChildren` for its `visible` state. */
export const staggerContainer = (step: number = STAGGER_STEP): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: step, delayChildren: 0.04 },
  },
});

/**
 * Reduced-motion fallback. Content still appears — it simply arrives without
 * travelling. Returning `hidden: { opacity: 1 }` (rather than dropping the
 * animation entirely) keeps the same DOM and the same code path.
 */
export const staticVariants: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
};

/** Standard hover lift for interactive cards. */
export const hoverLift = {
  y: -4,
  transition: { duration: DURATION.base, ease: EASE.out },
} as const;
