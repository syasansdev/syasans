import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";
import {
  STAGGER_STEP,
  staggerContainer,
  staticVariants,
  transition as baseTransition,
  variants,
  viewport,
  type MotionVariant,
} from "@/lib/motion";

type RevealProps = Omit<HTMLMotionProps<"div">, "variants" | "initial" | "whileInView"> & {
  /** Which entrance from the shared motion language. */
  variant?: MotionVariant;
  /** Seconds. Use sparingly — `Stagger` is the right tool for lists. */
  delay?: number;
  /**
   * Play on mount instead of on scroll. For above-the-fold content, where
   * waiting for an intersection callback causes a visible flash of nothing.
   */
  immediate?: boolean;
};

/**
 * The single scroll-reveal primitive.
 *
 * Replaces the previous approach of querying `.scroll-reveal` from a scroll
 * handler on every frame — that forced a layout pass per scroll event on
 * three separate pages. This uses IntersectionObserver via Framer instead.
 */
export const Reveal = forwardRef<HTMLDivElement, RevealProps>(
  ({ variant = "fade-up", delay = 0, immediate = false, className, transition, ...props }, ref) => {
    const prefersReducedMotion = useReducedMotion();
    const resolved = prefersReducedMotion ? staticVariants : variants[variant];

    const animationProps = immediate
      ? { animate: "visible" as const }
      : { whileInView: "visible" as const, viewport };

    /*
     * A `transition` prop on the element replaces the one declared inside the
     * variant rather than merging with it, so a bare `{ delay }` would silently
     * discard the shared duration and easing and fall back to Framer's
     * defaults. The base transition is spread back in explicitly.
     */
    const resolvedTransition =
      delay && !prefersReducedMotion
        ? { ...baseTransition, ...transition, delay }
        : transition;

    return (
      <motion.div
        ref={ref}
        className={cn(className)}
        initial="hidden"
        variants={resolved}
        transition={resolvedTransition}
        {...animationProps}
        {...props}
      />
    );
  },
);
Reveal.displayName = "Reveal";

type StaggerProps = Omit<HTMLMotionProps<"div">, "variants" | "initial" | "whileInView"> & {
  /** Seconds between children. */
  step?: number;
  immediate?: boolean;
};

/**
 * Wraps a list so its children reveal in sequence. Children must be
 * `<StaggerItem>` (or any motion element using the same variant names).
 */
export const Stagger = forwardRef<HTMLDivElement, StaggerProps>(
  ({ step = STAGGER_STEP, immediate = false, className, ...props }, ref) => {
    const prefersReducedMotion = useReducedMotion();

    const animationProps = immediate
      ? { animate: "visible" as const }
      : { whileInView: "visible" as const, viewport };

    return (
      <motion.div
        ref={ref}
        className={cn(className)}
        initial="hidden"
        variants={staggerContainer(prefersReducedMotion ? 0 : step)}
        {...animationProps}
        {...props}
      />
    );
  },
);
Stagger.displayName = "Stagger";

type StaggerItemProps = Omit<HTMLMotionProps<"div">, "variants"> & {
  variant?: MotionVariant;
};

export const StaggerItem = forwardRef<HTMLDivElement, StaggerItemProps>(
  ({ variant = "fade-up", className, ...props }, ref) => {
    const prefersReducedMotion = useReducedMotion();

    return (
      <motion.div
        ref={ref}
        className={cn(className)}
        variants={prefersReducedMotion ? staticVariants : variants[variant]}
        {...props}
      />
    );
  },
);
StaggerItem.displayName = "StaggerItem";
