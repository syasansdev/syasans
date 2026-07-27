import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import logo from "@/assets/syasans-logo.png";

/**
 * The wordmark. Rendered as a single link so assistive tech announces one
 * "Syasan's Career Analytics, home" target rather than an image and two
 * stray text nodes.
 */
export const Brand = ({
  className,
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) => (
  <Link
    to="/"
    onClick={onNavigate}
    aria-label={`${siteConfig.legalName} — home`}
    className={cn(
      "group flex shrink-0 items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background",
      className,
    )}
  >
    <img
      src={logo}
      alt=""
      aria-hidden
      width={48}
      height={48}
      /* Explicit dimensions reserve the box before the bitmap decodes, so the
         header never reflows on first paint. */
      className="h-10 w-auto transition-transform duration-base ease-out group-hover:scale-[1.04] sm:h-11"
    />
    <span aria-hidden className="flex flex-col leading-none">
      <span className="text-gradient text-lg font-extrabold tracking-tight sm:text-xl">
        {siteConfig.name}
      </span>
      <span className="mt-1 text-micro font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {siteConfig.tagline}
      </span>
    </span>
  </Link>
);
