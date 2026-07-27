import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

/**
 * The framing treatment for hero media, product shots and screenshots.
 *
 * Consolidates what were five hand-rolled treatments (varying border widths,
 * corner accents, doubled glow layers and blur radii) into one.
 *
 * `emphasis="hero"` is not the same treatment scaled up — it is a different
 * intent. A `default` frame presents an image. A `hero` frame presents an
 * *object*: it drifts, it casts a four-layer shadow, its bezel catches light,
 * and it sits in its own pool of ambient colour. Those four things together
 * are what separate "a video on a page" from "a product shot".
 */
const frameVariants = cva("relative", {
  variants: {
    emphasis: {
      default: "rounded-3xl bg-card p-1.5 shadow-2xl ring-1 ring-inset ring-border/60",
      /*
       * 24px outer, 4px bezel, 20px inner — the bezel is exactly the radius
       * difference, so the corners stay concentric.
       *
       * The bezel is translucent rather than solid card, which is what makes
       * it read as a glass edge lit from behind rather than a white border
       * drawn around a video.
       */
      hero: "rounded-[1.5rem] bg-card/60 p-1 shadow-float ring-1 ring-inset ring-border/70 backdrop-blur-md",
    },
  },
  defaultVariants: { emphasis: "default" },
});

const innerVariants = cva("relative overflow-hidden bg-surface-strong", {
  variants: {
    emphasis: {
      default: "rounded-[calc(var(--radius)+0.625rem)]",
      hero: "rounded-2xl ring-1 ring-inset ring-black/[0.06] dark:ring-white/[0.06]",
    },
  },
  defaultVariants: { emphasis: "default" },
});

export type MediaFrameProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof frameVariants> & {
    /** Set false to drop the ambient bloom behind the frame. */
    glow?: boolean;
    /** Set false to pin a hero frame in place. */
    float?: boolean;
  };

export const MediaFrame = forwardRef<HTMLDivElement, MediaFrameProps>(
  ({ emphasis = "default", glow = true, float = true, className, children, ...props }, ref) => {
    const isHero = emphasis === "hero";

    return (
      <div ref={ref} className={cn("relative", className)} {...props}>
        {glow ? (
          <div
            aria-hidden
            className={cn(
              "absolute -z-10 blur-3xl",
              isHero
                ? // Weighted below and behind, so the frame reads as lit from
                  // behind and resting on a surface rather than floating in haze.
                  "-inset-x-10 -top-6 bottom-[-3rem] rounded-[4rem] bg-[radial-gradient(ellipse_65%_60%_at_50%_65%,hsl(var(--primary)/0.30),transparent_72%)] sm:-inset-x-16"
                : "-inset-x-6 -bottom-8 -top-6 rounded-[3rem] bg-gradient-to-tr from-primary/25 via-primary/10 to-accent/25 opacity-70",
            )}
          />
        ) : null}

        <div className={cn(frameVariants({ emphasis }), isHero && float && "animate-float")}>
          <div className={cn(innerVariants({ emphasis }))}>
            {children}

            {isHero ? (
              <>
                {/* Specular edge. A one-pixel highlight along the top of the
                    glass — the single detail that most reads as a physical
                    bezel rather than a CSS border. */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent dark:via-white/25"
                />
                {/* Sheen. A wide, very low-opacity diagonal pass across the
                    surface, as light would fall across real glass. */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_38%,hsl(0_0%_100%/0.06)_47%,transparent_56%)]"
                />
              </>
            ) : null}
          </div>
        </div>
      </div>
    );
  },
);
MediaFrame.displayName = "MediaFrame";
