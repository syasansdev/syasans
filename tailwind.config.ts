import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

/**
 * The design system.
 *
 * Rules of engagement:
 *  - Colour comes from a semantic token (`bg-card`, `text-muted-foreground`),
 *    never a raw palette step, so light and dark stay in sync for free.
 *  - Type comes from the named scale (`text-h2`, `text-lead`), never an
 *    ad-hoc `text-3xl md:text-4xl lg:text-5xl` stack — the scale is already
 *    fluid, so responsive size variants are unnecessary.
 *  - Radius, elevation and duration are closed sets. If a value isn't here,
 *    it doesn't belong in the product.
 */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Poppins", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        display: ["Playfair Display", "Georgia", "serif"],
        // `font-serif` in existing markup should mean the brand display face,
        // not the browser default stack.
        serif: ["Playfair Display", "Georgia", "serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },

      /**
       * Fluid scale. Each step interpolates between its mobile and desktop
       * size, which removes the need for per-breakpoint overrides and
       * eliminates the size "jumps" at breakpoint boundaries.
       */
      fontSize: {
        /**
         * The smallest step. Exists because `text-[0.6875rem]` was being
         * hand-written in a dozen places — an unnamed scale step is still a
         * scale step, it just isn't enforceable.
         */
        micro: ["0.6875rem", { lineHeight: "1.45" }],
        overline: ["0.75rem", { lineHeight: "1", letterSpacing: "0.14em", fontWeight: "700" }],
        caption: ["0.8125rem", { lineHeight: "1.5" }],
        body: ["1rem", { lineHeight: "1.65" }],
        lead: ["clamp(1.0625rem, 1rem + 0.35vw, 1.25rem)", { lineHeight: "1.6" }],
        h4: ["clamp(1.125rem, 1.05rem + 0.35vw, 1.3125rem)", { lineHeight: "1.35", letterSpacing: "-0.01em" }],
        h3: ["clamp(1.375rem, 1.2rem + 0.75vw, 1.75rem)", { lineHeight: "1.25", letterSpacing: "-0.015em" }],
        h2: ["clamp(1.75rem, 1.35rem + 1.7vw, 2.5rem)", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        h1: ["clamp(2.125rem, 1.55rem + 2.4vw, 3.25rem)", { lineHeight: "1.08", letterSpacing: "-0.025em" }],
        // The mobile end is deliberately restrained: the hero headline is nine
        // words, and at 2.5rem on a 360px screen it ran to nine lines.
        display: ["clamp(2rem, 1.35rem + 3.1vw, 4.25rem)", { lineHeight: "1.06", letterSpacing: "-0.03em" }],
      },

      colors: {
        border: "hsl(var(--border))",
        "border-strong": "hsl(var(--border-strong))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        surface: {
          DEFAULT: "hsl(var(--surface))",
          strong: "hsl(var(--surface-strong))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          soft: "hsl(var(--primary-soft))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          soft: "hsl(var(--accent-soft))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },

      /** One radius system. `--radius` (0.75rem) is the anchor. */
      borderRadius: {
        none: "0",
        sm: "calc(var(--radius) - 0.375rem)", // 0.375rem
        DEFAULT: "calc(var(--radius) - 0.25rem)", // 0.5rem
        md: "calc(var(--radius) - 0.125rem)", // 0.625rem
        lg: "var(--radius)", // 0.75rem
        xl: "calc(var(--radius) + 0.25rem)", // 1rem
        "2xl": "calc(var(--radius) + 0.5rem)", // 1.25rem
        "3xl": "calc(var(--radius) + 1rem)", // 1.75rem
        full: "9999px",
      },

      /** One elevation system, driven by tokens so dark mode adapts. */
      boxShadow: {
        xs: "var(--shadow-xs)",
        sm: "var(--shadow-sm)",
        DEFAULT: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        "2xl": "var(--shadow-2xl)",
        /** Four stacked layers. For objects that should read as lifted. */
        float: "var(--shadow-float)",
        ring: "var(--shadow-ring)",
        none: "none",
      },

      spacing: {
        /** Vertical rhythm for page sections — the only section padding. */
        section: "clamp(4rem, 7vw, 7rem)",
        "section-lg": "clamp(5.5rem, 9vw, 9rem)",
      },

      maxWidth: {
        /** Comfortable reading measures. */
        measure: "68ch",
        "measure-sm": "54ch",
        content: "1280px",
      },

      transitionTimingFunction: {
        out: "var(--ease-out)",
        "in-out": "var(--ease-in-out)",
        spring: "var(--ease-spring)",
      },

      transitionDuration: {
        fast: "var(--duration-fast)",
        base: "var(--duration-base)",
        slow: "var(--duration-slow)",
        slower: "var(--duration-slower)",
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translate3d(0, 12px, 0)" },
          to: { opacity: "1", transform: "translate3d(0, 0, 0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },

      animation: {
        "accordion-down": "accordion-down var(--duration-base) var(--ease-out)",
        "accordion-up": "accordion-up var(--duration-base) var(--ease-out)",
        "fade-up": "fade-up var(--duration-slow) var(--ease-out) both",
        "fade-in": "fade-in var(--duration-base) var(--ease-out) both",
      },
    },
  },
  plugins: [animate],
} satisfies Config;
