import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

type CounterProps = {
  /** Numbers count up; strings render as-is (e.g. "4.5"). */
  value: number | string;
  suffix?: string;
  className?: string;
  durationMs?: number;
};

/**
 * Counts a metric up when it scrolls into view.
 *
 * Three things the previous implementation got wrong, fixed here:
 *  - `setInterval` at ~33ms drifts against the display refresh and produces
 *    visible stutter; this drives the tween from `requestAnimationFrame`.
 *  - The observer stayed connected and the interval kept running after the
 *    animation finished; both are now torn down.
 *  - A screen reader was read a rapidly mutating number. The animated digits
 *    are now `aria-hidden` and the final value is exposed once, as text.
 */
export const Counter = ({ value, suffix = "", className, durationMs = 1600 }: CounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isNumeric = typeof value === "number";

  /** Only meaningful while a numeric value is tweening. */
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (!isNumeric || prefersReducedMotion) return;

    const element = ref.current;
    if (!element) return;

    let frame = 0;
    let start: number | null = null;

    const tick = (timestamp: number) => {
      start ??= timestamp;
      // easeOutCubic: fast arrival, gentle settle.
      const progress = Math.min((timestamp - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setDisplayed(Math.round(eased * value));

      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [durationMs, isNumeric, prefersReducedMotion, value]);

  const settled = isNumeric ? value.toLocaleString() : value;
  // Strings and the reduced-motion path render their final value immediately.
  const visible = isNumeric && !prefersReducedMotion ? displayed.toLocaleString() : settled;

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">
        {visible}
        {suffix}
      </span>
      {/* The animated digits mutate dozens of times a second; assistive tech
          is given the settled value once instead. */}
      <span className="sr-only">
        {settled}
        {suffix}
      </span>
    </span>
  );
};
