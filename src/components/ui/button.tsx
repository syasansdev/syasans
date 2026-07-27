import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * One button language.
 *
 * Every variant shares the same geometry, the same focus ring, the same
 * press feedback and the same transition curve — only the surface changes.
 * Transitions are enumerated rather than `all` so hover never animates
 * layout properties by accident.
 */
const buttonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg",
    "font-medium leading-none",
    "transition-[color,background-color,border-color,box-shadow,transform,opacity]",
    "duration-base ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "active:scale-[0.98]",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow-md",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/70",
        outline:
          "border border-border-strong bg-background text-foreground shadow-xs hover:border-primary/40 hover:bg-primary-soft hover:text-primary",
        ghost: "text-foreground hover:bg-secondary",
        link: "text-primary underline-offset-4 hover:underline active:scale-100",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        /** Sits on `tone="inverted"` sections. */
        inverse:
          "bg-background text-foreground shadow-sm hover:bg-background/90 hover:shadow-md",
      },
      size: {
        /** 44px — meets the minimum touch target without extra rules. */
        default: "h-11 px-5 text-sm [&_svg]:size-4",
        sm: "h-9 px-3.5 text-caption [&_svg]:size-4",
        lg: "h-12 px-7 text-base [&_svg]:size-[1.125rem]",
        xl: "h-14 px-8 text-base [&_svg]:size-5",
        icon: "h-11 w-11 [&_svg]:size-[1.125rem]",
        "icon-sm": "h-9 w-9 [&_svg]:size-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size }), className)} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
