import { Children, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type MarqueeProps = {
  children: ReactNode;
  /** Seconds for one full pass. Longer tracks need proportionally longer. */
  duration?: number;
  reverse?: boolean;
  className?: string;
  itemClassName?: string;
};

/**
 * Horizontal auto-scrolling track.
 *
 * Replaces three separate implementations (two inline `<style jsx>` blocks
 * and one Framer `animate` loop) that each re-derived the same -50% translate
 * trick with different timings.
 *
 * Accessibility notes:
 *  - The duplicated half is `aria-hidden`, so assistive tech reads the list
 *    once rather than twice.
 *  - `marquee-group` pauses the animation on hover *and* on focus-within, so a
 *    keyboard user tabbing into a card can actually read it.
 *  - The animation is disabled entirely under `prefers-reduced-motion`
 *    (handled globally in `index.css`), leaving a normal scrollable row.
 */
export const Marquee = ({
  children,
  duration = 60,
  reverse = false,
  className,
  itemClassName,
}: MarqueeProps) => {
  const items = Children.toArray(children);

  const track = (hidden: boolean) => (
    <div
      aria-hidden={hidden || undefined}
      className={cn("flex shrink-0 items-center", itemClassName)}
    >
      {items}
    </div>
  );

  return (
    <div className={cn("marquee-group fade-edges-x group flex w-full overflow-hidden", className)}>
      <div
        className={cn("animate-marquee flex w-max", reverse && "[animation-direction:reverse]")}
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        {track(false)}
        {track(true)}
      </div>
    </div>
  );
};
