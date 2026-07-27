# Syasan's Career Analytics — website

Marketing site for Syasan's Career Analytics. React 18 + TypeScript + Vite, styled with
Tailwind and a small set of Radix primitives.

```bash
npm install
npm run dev        # http://localhost:8080
npm run build      # production build to dist/
npm run preview    # serve the production build
npm run typecheck
npm run lint
```

Requires Node 18+.

## Architecture

```
src/
  config/          site metadata, navigation, contact details, assistant persona
  content/         page copy and data (home sections, testimonials)
  components/
    ui/            design-system primitives — the only place styling decisions live
    layout/        the app shell: header, footer, page hero, page layout
    home/          one file per homepage section
  pages/           one file per route
  lib/             the motion language and the `cn` class helper
  types/           shared type definitions
```

Routes are code-split. Only the homepage ships in the entry chunk; everything else is
fetched on navigation.

### The design system

Everything visual is a token. There are no hardcoded colours, shadows, radii or
durations in feature code, and that constraint is what keeps the product coherent.

- **Colour** — semantic HSL custom properties in `src/index.css`, exposed to Tailwind as
  `bg-card`, `text-muted-foreground`, `border-border` and so on. Light and dark themes
  are two sets of the same names, so a component written against tokens works in both
  without a single `dark:` utility.
- **Type** — one fluid scale in `tailwind.config.ts`: `text-display`, `text-h1`…`text-h4`,
  `text-lead`, `text-body`, `text-caption`, `text-overline`. Each step interpolates
  between its mobile and desktop size, so per-breakpoint stacks (`text-3xl md:text-5xl`)
  are unnecessary and shouldn't be reintroduced.
- **Radius / elevation** — closed sets driven by `--radius` and the `--shadow-*` tokens.
  If a value isn't in the config, it doesn't belong in the product.
- **Motion** — `src/lib/motion.ts` holds the durations, easings and entrance variants.
  Components use `<Reveal>` / `<Stagger>` rather than hand-rolling springs.
  `prefers-reduced-motion` is honoured globally in `index.css` and per-component through
  Framer's `useReducedMotion`.

### Layout primitives

Pages are composed from `Section` (tone + vertical rhythm), `Container` (page gutter) and
`SectionHeader` (heading + description). Section tones alternate `default` / `surface`
down a page to give it rhythm; `inverted` is reserved for the single final CTA.

`PageLayout` owns the header, `<main>` landmark, footer and assistant. It applies no top
padding — every page opens with `Hero` or `PageHero`, and those own their header
clearance so their backdrops can run underneath the translucent header.

## Content

Copy and data live in `src/content` and `src/config`, not inside components — so the
homepage, the assistant and the footer cannot disagree about a statistic or a phone
number.

The assistant's persona, scope limits and the complete set of facts it may state live in
`src/config/assistant.ts`. It is explicitly forbidden from inventing fees, schedules,
eligibility criteria, trainer details or placement guarantees, and defers all of those to
the admissions team.

## Reviews

The homepage review wall (`src/components/home/ReviewsSection.tsx`) renders from
`src/content/reviews.ts`. Today that array is the institution's **own verified student
reviews** — the set that has always been in this repo — and each card is attributed
"Verified student" accordingly.

They are deliberately *not* labelled as Google reviews, because they aren't. Google review
bodies cannot be read from the public listing: Maps renders them client-side, and scraping
them would breach Google's Terms of Service. The aggregate shown in the heading (4.5 from
88K) is the institution's own learner rating, not a Google score. The only Google claim on
the page is the link out, and it points at the real listing.

### Switching to live Google reviews

`Review` in `src/content/reviews.ts` is already shaped like a Places API `review` object,
so no component needs to change. Three steps:

**1. Resolve the Place ID.** The listing's Maps feature id is recorded in
`googleBusiness` in `src/config/site.ts` (`0x3a52671aed03ec61:0xf1c4ac06c1870dcf`, decimal
CID `17421238403592555983`). The Places API wants a `ChIJ…` Place ID instead — one Find
Place call returns it, after which paste it into `googleBusiness.placeId`.

**2. Add a server endpoint.** The key must never reach the browser: a `VITE_`-prefixed
variable is compiled into the bundle, and a leaked Places key is billable. On Vercel,
`api/reviews.ts`:

```ts
export default async function handler(_req: Request) {
  const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
  url.searchParams.set("place_id", process.env.GOOGLE_PLACE_ID!);
  url.searchParams.set("fields", "reviews,rating,user_ratings_total");
  url.searchParams.set("reviews_sort", "newest");
  url.searchParams.set("key", process.env.GOOGLE_PLACES_KEY!);

  const { result } = await fetch(url).then((response) => response.json());

  return Response.json(
    {
      rating: result.rating,
      total: result.user_ratings_total,
      reviews: (result.reviews ?? []).map((review) => ({
        author: review.author_name,
        quote: review.text,
        rating: review.rating,
        postedAt: review.relative_time_description,
        avatarUrl: review.profile_photo_url,
        source: "google" as const,
      })),
    },
    // Places caps review retention at 30 days; an hour of edge cache keeps
    // request volume (and cost) sane without going stale.
    { headers: { "cache-control": "s-maxage=3600, stale-while-revalidate=86400" } },
  );
}
```

**3. Point the module at it** and set `source: "google"`. The cards then render the Google
attribution and relative timestamps automatically.

Two constraints worth knowing before you commit to this: Place Details returns **at most
five reviews**, and Google's terms require attribution and forbid retaining review content
for more than 30 days. If you want a large wall, the honest pattern is what's shipped now —
your own collected reviews, plus a link to the Google listing.

## Environment

| Variable | Purpose |
| --- | --- |
| `VITE_GROQ_API_KEY` | Optional. Enables the assistant's language model. Without it the assistant answers from a curated offline set — it never goes silent. |
| `GOOGLE_PLACES_KEY` | Server-side only. Needed only if you enable live Google reviews (above). |
| `GOOGLE_PLACE_ID` | Server-side only. The `ChIJ…` id for the listing. |

A `VITE_`-prefixed value is embedded in the client bundle and is therefore **public**.
For production, proxy the request through a backend endpoint that holds the key
server-side.

## Assets

`scripts/optimize-images.ps1` downscales oversized rasters in place, and
`scripts/convert-photos-to-jpeg.ps1` re-encodes photographic PNGs as JPEG. Both are
idempotent and their output is committed, so neither needs to run in CI. Re-run them
after adding large images.

Known gap: the partner-institution files in `public/assets` (`Sathyabama.png`, `srm.png`,
…) are photographs of campus gates, not institutional marks. The homepage trust band
therefore renders institutions as wordmarks. Drop a real SVG crest into `public/assets`
and set `logo` on that entry in `src/content/home.ts` to switch any of them to an image.

## License

MIT — see [LICENSE](LICENSE).
