import { cva, type VariantProps } from "class-variance-authority";
import { cloneElement, isValidElement, type ReactElement } from "react";

import { cn } from "@/lib/utils";

/**
 * The rounded square an icon sits in.
 *
 * This markup was repeated ten times across five files, and had drifted into
 * five different box sizes (40, 44, 48, 56 and 64px) for what is visually the
 * same element. Two sizes now cover every use, and the icon inside is scaled
 * and stroked by the tile rather than by each call site — which is what stops
 * a 16px icon turning up in a 48px box.
 */
const tileVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-xl transition-[transform,background-color,color] duration-base ease-out",
  {
    variants: {
      tone: {
        /** Default. Tinted background, brand-coloured glyph. */
        soft: "bg-primary-soft text-primary",
        /** For the one flagship item in a group. */
        solid: "bg-primary text-primary-foreground shadow-sm",
        /** Sits on a coloured or photographic surface and needs its own edge. */
        outline: "border border-border bg-background text-primary shadow-sm",
      },
      size: {
        md: "h-11 w-11 [&_svg]:h-5 [&_svg]:w-5",
        lg: "h-14 w-14 [&_svg]:h-6 [&_svg]:w-6",
      },
      /** Opt in where the tile lives inside a `group` that should react. */
      interactive: {
        true: "group-hover:scale-105",
        false: "",
      },
    },
    defaultVariants: { tone: "soft", size: "md", interactive: false },
  },
);

export type IconTileProps = Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> &
  VariantProps<typeof tileVariants> & {
    icon: ReactElement;
  };

export const IconTile = ({ icon, tone, size, interactive, className, ...props }: IconTileProps) => (
  <span aria-hidden className={cn(tileVariants({ tone, size, interactive }), className)} {...props}>
    {/* Stroke weight is set here so every icon on the site shares one optical
        weight, rather than each call site remembering to pass it. */}
    {isValidElement<{ strokeWidth?: number }>(icon)
      ? cloneElement(icon, { strokeWidth: 1.75 })
      : icon}
  </span>
);
