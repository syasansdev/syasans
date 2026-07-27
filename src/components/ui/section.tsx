import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ElementType, type ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

/* -------------------------------------------------------------------------- */
/*  Section                                                                    */
/* -------------------------------------------------------------------------- */

const sectionVariants = cva("relative isolate", {
  variants: {
    /**
     * Alternating tones give the page rhythm without introducing new colours.
     * Sections should alternate `default` / `surface` down the page so each
     * band reads as a distinct beat.
     */
    tone: {
      default: "bg-background",
      surface: "bg-surface",
      strong: "bg-surface-strong",
      /** For the final CTA only — one high-contrast moment per page. */
      inverted: "bg-foreground text-background",
    },
    size: {
      sm: "py-12 sm:py-16",
      md: "py-section",
      lg: "py-section-lg",
    },
    /**
     * Keeps decorative children (blurred blobs, bleeding grids) from causing
     * scrollbars.
     *
     * `overflow: clip` rather than `overflow: hidden` on purpose: `hidden`
     * turns the section into a scroll container, which silently breaks
     * `position: sticky` for anything inside it — the Training Journey step
     * index depends on that. `clip` bounds the paint without the side effect.
     */
    clip: {
      true: "overflow-clip",
      false: "",
    },
  },
  defaultVariants: { tone: "default", size: "md", clip: true },
});

export type SectionProps = React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof sectionVariants> & {
    as?: ElementType;
  };

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ as: Component = "section", tone, size, clip, className, ...props }, ref) => (
    <Component
      ref={ref}
      className={cn(sectionVariants({ tone, size, clip }), className)}
      {...props}
    />
  ),
);
Section.displayName = "Section";

/* -------------------------------------------------------------------------- */
/*  Container                                                                  */
/* -------------------------------------------------------------------------- */

const containerVariants = cva("mx-auto w-full px-5 sm:px-6 lg:px-8", {
  variants: {
    width: {
      /** Default page gutter — everything lines up on this edge. */
      default: "max-w-content",
      /** Long-form copy and single-column forms. */
      narrow: "max-w-3xl",
      /** Full-bleed tracks (marquees) that manage their own inner padding. */
      wide: "max-w-[1600px]",
    },
  },
  defaultVariants: { width: "default" },
});

export type ContainerProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof containerVariants>;

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ width, className, ...props }, ref) => (
    <div ref={ref} className={cn(containerVariants({ width }), className)} {...props} />
  ),
);
Container.displayName = "Container";

/* -------------------------------------------------------------------------- */
/*  SectionHeader                                                              */
/* -------------------------------------------------------------------------- */

type SectionHeaderProps = {
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "start";
  /** Heading level. Sections inside a page should be h2; nested groups h3. */
  as?: "h2" | "h3";
  /** Target for the parent section's `aria-labelledby`. */
  id?: string;
  className?: string;
  children?: ReactNode;
};

/**
 * Every section headline on the site renders through this, which is what
 * makes the vertical rhythm and hierarchy identical page to page.
 */
export const SectionHeader = ({
  title,
  description,
  align = "center",
  as: Heading = "h2",
  id,
  className,
  children,
}: SectionHeaderProps) => {
  const centered = align === "center";

  return (
    <Reveal
      className={cn(
        "flex flex-col gap-5",
        centered ? "mx-auto max-w-3xl items-center text-center" : "items-start text-left",
        className,
      )}
    >
      <Heading id={id} className={cn(Heading === "h2" ? "text-h2" : "text-h3", "text-foreground")}>
        {title}
      </Heading>

      {description ? (
        <p
          className={cn(
            "max-w-measure text-lead text-muted-foreground",
            centered && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}

      {children}
    </Reveal>
  );
};

/* -------------------------------------------------------------------------- */
/*  AmbientBackdrop                                                            */
/* -------------------------------------------------------------------------- */

type AmbientBackdropProps = {
  /** Adds the masked grid texture behind the glow. */
  grid?: boolean;
  className?: string;
};

/**
 * The one decorative backdrop. Previously every page hand-rolled two or three
 * absolutely positioned blurred divs with slightly different sizes, colours
 * and animation timings; this consolidates them into a single, cheap,
 * reduced-motion-aware treatment.
 */
export const AmbientBackdrop = ({ grid = false, className }: AmbientBackdropProps) => (
  <div
    aria-hidden
    /*
     * The clipping lives here rather than on the parent section. The blobs are
     * deliberately positioned outside the box, and containing them at source
     * means no section has to become a clipping context on their behalf —
     * which is what would otherwise put `position: sticky` descendants at risk.
     */
    className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}
  >
    {grid ? <div className="absolute inset-0 bg-grid" /> : null}
    <div className="animate-drift absolute -left-24 -top-32 h-[26rem] w-[26rem] rounded-full bg-primary/10 blur-3xl" />
    <div className="animate-drift-slow absolute -bottom-32 -right-24 h-[24rem] w-[24rem] rounded-full bg-accent/10 blur-3xl" />
  </div>
);
