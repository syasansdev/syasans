import { testimonials } from "@/content/testimonials";

/**
 * A single review.
 *
 * The shape deliberately mirrors the Google Places API `review` object, so
 * switching the source over is a change to `reviews` below and nothing else —
 * no component touches Places-specific field names.
 *
 *   Places field                  ->  here
 *   author_name                   ->  author
 *   text                          ->  quote
 *   rating                        ->  rating
 *   relative_time_description     ->  postedAt
 *   profile_photo_url             ->  avatarUrl
 */
export type Review = {
  author: string;
  quote: string;
  /** 1–5. */
  rating: number;
  /** e.g. "2 months ago". Present on Places data, absent on ours. */
  postedAt?: string;
  avatarUrl?: string;
  /**
   * Provenance. Drives the attribution line under each card, because a review
   * collected by us and a review published on Google are not the same claim
   * and must not be presented as though they were.
   */
  source: "verified" | "google";
};

/**
 * The reviews on display.
 *
 * These are the institution's own verified student reviews — the set that has
 * always been in this repo — not Google review bodies. That distinction is
 * load-bearing and is why every card carries a "Verified student" attribution
 * rather than a Google mark.
 *
 * Google review text is not obtainable from the public listing: Maps renders it
 * client-side, and scraping it would breach Google's terms. Reading it properly
 * needs a Places API key and a Place ID, called from a server so the key is not
 * published — see the Reviews section of the README, which has the endpoint and
 * the mapping ready to go. Once that exists, replace this array with its
 * response and set `source: "google"`; the section below renders either without
 * modification.
 *
 * ---------------------------------------------------------------------------
 * A caveat on `rating`, because it is the one field here that is not real.
 *
 * Every entry in the original data was a 5. The displayed rating is now a 4 or
 * a 5 derived from the author's name — an explicit product decision, taken to
 * avoid an unbroken wall of five-star cards, which reads as manufactured even
 * when it is accurate. The consequence is that a named student can be shown
 * giving four stars when they gave five.
 *
 * It is derived rather than random on purpose. `Math.random()` would reshuffle
 * on every render, so the hero's rotating cards would flicker between ratings
 * for the same person, and the same review would disagree with itself between
 * the hero and the reviews wall. Hashing the name gives one stable answer per
 * person everywhere it appears.
 *
 * To go back to the source data, return `5` from `displayRating`.
 * ---------------------------------------------------------------------------
 */
const displayRating = (author: string) => {
  /*
   * FNV-1a, not the usual `hash * 31 + char`. On a set this small the choice
   * is not academic: the multiply-by-31 variant put only one four-star review
   * among the twelve the hero cycles through, because short names that share a
   * final letter land in the same residue class. FNV's avalanche spreads them —
   * four in twelve, twelve in thirty-one.
   */
  let hash = 0x811c9dc5;
  for (let index = 0; index < author.length; index += 1) {
    hash ^= author.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  // Roughly one in three, so five stars stays clearly the norm.
  return hash % 3 === 0 ? 4 : 5;
};

export const reviews: readonly Review[] = testimonials.map((testimonial) => ({
  ...testimonial,
  rating: displayRating(testimonial.author),
  source: "verified" as const,
}));

/** Splits the set into N columns for the parallax wall. */
export const toColumns = (items: readonly Review[], columns: number): Review[][] =>
  Array.from({ length: columns }, (_, column) =>
    items.filter((_item, index) => index % columns === column),
  );
