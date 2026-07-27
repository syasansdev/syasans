/**
 * Single source of truth for brand, navigation and contact details.
 *
 * These strings were previously duplicated across the header, the footer, the
 * Join page and the chatbot's knowledge blob, and had already drifted out of
 * sync (three different student counts, two different taglines).
 */

export const siteConfig = {
  name: "SYASAN'S",
  legalName: "Syasan's Career Analytics",
  tagline: "Career Analytics",
  description:
    "Tamil Nadu's largest AI-integrated Industry 5.0 learning ecosystem — experiential training, mentoring and placement analytics for institutions and their students.",
  url: "https://syasans.com",
} as const;

export const contact = {
  email: "askus@syasans.com",
  phones: [
    { label: "(+91) 91764 58486", href: "tel:+919176458486" },
    { label: "(+91) 95972 22661", href: "tel:+919597222661" },
    { label: "044-4282 2290", href: "tel:04442822290" },
  ],
  address: {
    lines: ["#6, Middle W Jones Rd", "West Saidapet", "Chennai - 600015", "Tamil Nadu, India"],
    mapUrl: "https://maps.google.com/?q=SYASAN'S+Career+Analytics+West+Saidapet+Chennai",
  },
  /**
   * Deep link to the Google Business listing, where the reviews live.
   *
   * `cid` is the decimal form of the listing's Maps feature id
   * `0x3a52671aed03ec61:0xf1c4ac06c1870dcf`, taken from the `#lrd=` fragment of
   * the live Google listing. This replaces a URL carrying placeholder ids
   * (`0x3a526f76b8f8c8a5:0x3a5a5a5a5a5a5a5a`) that resolved to nothing.
   *
   * Note this is a *link out*, not a data source. Review text cannot be read
   * from this page — Maps renders it client-side. Fetching the review bodies
   * requires the Places API and a Place ID; see the Reviews section of the
   * README.
   */
  reviewsUrl: "https://www.google.com/maps?cid=17421238403592555983",
} as const;

/**
 * The listing's identifiers, recorded so they are not lost again.
 *
 * `featureId` is what Google exposes in the `#lrd=` fragment. The Places API
 * wants a `ChIJ…` Place ID instead, which has to be resolved once via a
 * Find Place call and can then be pasted here.
 */
export const googleBusiness = {
  featureId: "0x3a52671aed03ec61:0xf1c4ac06c1870dcf",
  cid: "17421238403592555983",
  /** Fill in after one Find Place lookup to enable the Places API path. */
  placeId: "" as string,
} as const;

export const socials = [
  { label: "Facebook", href: "https://www.facebook.com/SYASANS/about" },
  { label: "X", href: "https://x.com/SyasansCA" },
  { label: "YouTube", href: "https://www.youtube.com/@SyasansCareerAnalytics" },
] as const;

/**
 * The hero reel — student testimonials, played one after another.
 *
 * Local files rather than a YouTube embed, because the hero plays
 * automatically: an embed cannot autoplay without shipping roughly a megabyte
 * of third-party JavaScript into the critical path, cannot have its watermark
 * removed, and cannot be given a pause control — which WCAG 2.2.2 requires for
 * motion running longer than five seconds.
 *
 * These replaced `hero-loop.mp4`, an ambient classroom loop. The trade is
 * deliberate and worth naming: the loop was silent, seamless and purely
 * atmospheric; these are people talking, so the *audio is the content*. That
 * drives two things the loop never had to handle — a sound affordance (see
 * `HeroReel`) and sequencing, because four clips cannot share one frame.
 *
 * On the sources: the originals are phone recordings, three shot in portrait
 * (360×640) and one in landscape (636×360). Portrait footage cannot be
 * centre-cropped into the hero's 16:9 frame — the crop lands on the speaker's
 * chest and takes their head off — so `HeroReel` letterboxes against a blurred
 * backdrop instead. The landscape clip leads for that reason: it fills the
 * frame natively, so the first thing a visitor sees is edge-to-edge.
 *
 * Re-encoded from `src/assets/WhatsApp Video 2026-07-20 at *.mp4` at CRF 28
 * with `+faststart` so playback can begin before the file has finished
 * downloading: 6.8 MB across four clips, against 10.8 MB of source. Only the
 * first is fetched on load; the rest are pulled in as they come up.
 *
 * `speaker` is deliberately absent — attributing a testimonial to a name we
 * have not confirmed would be inventing a quote's author. Fill it in and the
 * reel captions each clip automatically.
 */
export type HeroClip = {
  src: string;
  poster: string;
  /** Describes the footage for anyone who cannot see it. */
  label: string;
  /** e.g. `{ name: "Priya R.", context: "St. Joseph's College of Engineering" }` */
  speaker?: { name: string; context?: string };
};

export const heroReel: readonly HeroClip[] = [
  {
    src: "/assets/testimonial-1.mp4",
    poster: "/assets/testimonial-1-poster.jpg",
    label: "A Syasan's student speaking to camera about her experience of the programme",
  },
  {
    src: "/assets/testimonial-2.mp4",
    poster: "/assets/testimonial-2-poster.jpg",
    label: "A Syasan's student speaking to camera about his experience of the programme",
  },
  {
    src: "/assets/testimonial-3.mp4",
    poster: "/assets/testimonial-3-poster.jpg",
    label: "A Syasan's student speaking to camera about his experience of the programme",
  },
  {
    src: "/assets/testimonial-4.mp4",
    poster: "/assets/testimonial-4-poster.jpg",
    label: "A Syasan's student speaking to camera about her experience of the programme",
  },
];

/** The brand film, watched on demand from the Feedback page. */
export const brandFilm = {
  id: "AGfOa90l1CA",
  title: "Syasan's Career Analytics — how the learning ecosystem works",
} as const;

export type NavLeaf = { label: string; path: string; description?: string };
export type NavGroup = { label: string; items: readonly NavLeaf[] };

/**
 * Ten flat links at 12px was the previous header. Grouping them into four
 * intents makes the top level scannable and gives every destination a
 * one-line explanation of what it is.
 */
export const navigation: readonly NavGroup[] = [
  {
    label: "Platform",
    items: [
      {
        label: "Programs",
        path: "/inquiries",
        description: "Emerging-technology courses and capability tracks",
      },
      {
        label: "Products",
        path: "/products",
        description: "Assessment engine, mobile lab and aptitude handbooks",
      },
      {
        label: "Training Journey",
        path: "/training-journey",
        description: "The 14-step delivery framework, end to end",
      },
    ],
  },
  {
    label: "Proof",
    items: [
      {
        label: "Endorsements",
        path: "/endorsement",
        description: "Certifications and government recognition",
      },
      {
        label: "Partners",
        path: "/partners",
        description: "Institutions and recruiters we work with",
      },
      {
        label: "Feedback",
        path: "/feedback",
        description: "Student stories, reviews and outcomes",
      },
    ],
  },
  {
    label: "Company",
    items: [
      {
        label: "About Syasan's",
        path: "/referring-to",
        description: "Our approach, credentials and accomplishments",
      },
      {
        label: "Core Team",
        path: "/team",
        description: "The people behind the programs",
      },
    ],
  },
] as const;

/** Flattened for the footer sitemap and the mobile drawer. */
export const allNavLinks: readonly NavLeaf[] = navigation.flatMap((group) => group.items);

export const primaryCta = { label: "Join us", path: "/join" } as const;
