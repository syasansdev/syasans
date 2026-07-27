import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { siteConfig } from "@/config/site";

type SeoProps = {
  title: string;
  description: string;
  /** Absolute or root-relative path to the social share image. */
  image?: string;
  /** Keeps a page out of search results (e.g. the 404). */
  noIndex?: boolean;
};

const upsertMeta = (selector: string, attribute: "name" | "property", key: string, content: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.append(element);
  }

  element.setAttribute("content", content);
};

/**
 * Per-route document metadata.
 *
 * Every route previously inherited one static `<title>` and one static
 * description from `index.html`, so every page in search results and every
 * shared link looked identical.
 *
 * Implemented directly against the DOM rather than by adding a helmet library:
 * this is a single-purpose effect, it costs no bundle weight, and there is no
 * server render to reconcile with.
 */
export const Seo = ({ title, description, image = "/assets/Logo.png", noIndex }: SeoProps) => {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = title;

    const canonicalUrl = `${siteConfig.url}${pathname}`;
    const imageUrl = image.startsWith("http") ? image : `${siteConfig.url}${image}`;

    upsertMeta('meta[name="description"]', "name", "description", description);
    upsertMeta('meta[name="robots"]', "name", "robots", noIndex ? "noindex, nofollow" : "index, follow");

    upsertMeta('meta[property="og:title"]', "property", "og:title", title);
    upsertMeta('meta[property="og:description"]', "property", "og:description", description);
    upsertMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl);
    upsertMeta('meta[property="og:image"]', "property", "og:image", imageUrl);
    upsertMeta('meta[property="og:type"]', "property", "og:type", "website");
    upsertMeta('meta[property="og:site_name"]', "property", "og:site_name", siteConfig.legalName);

    upsertMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    upsertMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    upsertMeta('meta[name="twitter:image"]', "name", "twitter:image", imageUrl);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.append(canonical);
    }
    canonical.href = canonicalUrl;
  }, [title, description, image, noIndex, pathname]);

  return null;
};
