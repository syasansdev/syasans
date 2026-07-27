import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Restores scroll position on navigation.
 *
 * React Router does not do this for you: without it, following a link from
 * halfway down a long page lands the visitor halfway down the *next* page.
 *
 * Uses `instant` rather than the document's `scroll-behavior: smooth`, since
 * smoothly scrolling several thousand pixels on every route change reads as a
 * bug. In-page anchors keep the smooth behaviour.
 */
export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Let the browser handle deep links to an anchor on the target page.
    if (hash) return;

    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);

  return null;
};
