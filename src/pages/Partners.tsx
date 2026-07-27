import { MapPin, Maximize2, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { Seo } from "@/components/Seo";
import { ClosingCta } from "@/components/layout/ClosingCta";
import { PageHero } from "@/components/layout/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MediaFrame } from "@/components/ui/media-frame";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { AmbientBackdrop, Container, Section, SectionHeader } from "@/components/ui/section";
import { recruiters } from "@/content/home";
import { DURATION, EASE } from "@/lib/motion";

/**
 * `image` is optional: campus photographs exist for the longer-standing
 * partners, but not for every institution on the list. Rather than ship a
 * broken `<img>` or hold a partner off the page until a photograph arrives,
 * an imageless entry falls back to a monogram plate (see the card below).
 */
type Partner = { name: string; location: string; image?: string };

const institutions: readonly Partner[] = [
  { name: "IIITDM Kancheepuram", location: "Kancheepuram, Chennai" },
  { name: "Madras Social Service Society", location: "Chennai" },
  { name: "Sathyabama University", location: "Chennai", image: "/assets/Sathyabama.png" },
  { name: "Dhanalakshmi Srinivasan University", location: "Trichy", image: "/assets/Dhanalakshmi.png" },
  { name: "BSA Abdur Rahman Crescent University", location: "Vandalur, Chennai", image: "/assets/Crescent_college.png" },
  { name: "Jeppiaar University", location: "Chennai", image: "/assets/jeppiarcollege.png" },
  { name: "Amity Global Business School", location: "Chennai", image: "/assets/amity.png" },
  { name: "Sairam Group of Institutions", location: "West Tambaram, Chennai", image: "/assets/Sairam.png" },
  { name: "St. Joseph's College of Engineering", location: "Chennai", image: "/assets/StJosephscollege.png" },
  { name: "D.G. Vaishnav College", location: "Arumbakkam, Chennai" },
  { name: "Vels University", location: "Pallavaram, Chennai", image: "/assets/vels.png" },
  { name: "SRM University", location: "Kattankulathur, Chennai", image: "/assets/srm.png" },
  { name: "LEAD College of Management (Autonomous)", location: "Palakkad, Kerala" },
  { name: "Acharya Institute of Technology", location: "Bengaluru, Karnataka" },
  { name: "Velammal Group of Engineering Colleges", location: "Chennai / Madurai", image: "/assets/vellamal.png" },
  { name: "Kalasalingam University", location: "Virudhunagar", image: "/assets/kalasalingam.png" },
];

/** Initials, capped at three letters so the plate never crowds. */
const monogram = (name: string) =>
  name
    .replace(/\(.*?\)/g, "")
    .split(/\s+/)
    .filter((word) => /^[A-Z]/.test(word))
    .slice(0, 3)
    .map((word) => word[0])
    .join("");

const MAP_IMAGE = "/assets/image.png";
const MAP_ALT = "Map of Tamil Nadu showing the locations of Syasan's Integrated Learning Centres";

export default function Partners() {
  const [isMapZoomed, setIsMapZoomed] = useState(false);

  // The lightbox is a modal surface: Escape must dismiss it, and the page
  // behind it must not scroll away underneath.
  useEffect(() => {
    if (!isMapZoomed) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMapZoomed(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isMapZoomed]);

  return (
    <PageLayout>
      <Seo
        title="Partner institutions & recruiters — Syasan's Career Analytics"
        description="Universities and engineering colleges running Syasan's Integrated Learning Centres, and the organizations hiring their graduates."
      />

      <PageHero
        title="Trusted inside"
        highlight="leading campuses"
        description="Universities, engineering colleges and business schools across South India — and the recruiters their graduates go on to join."
      />

      {/* Institutions */}
      <Section tone="default" aria-labelledby="institutions-heading">
        <AmbientBackdrop grid />

        <Container className="flex flex-col gap-14">
          <SectionHeader
            id="institutions-heading"
            title="Where we operate"
            description="Sixteen campuses running Syasan's programmes and Integrated Learning Centres."
          />

          <Stagger
            step={0.04}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {institutions.map(({ name, location, image }) => (
              <StaggerItem key={name} className="h-full">
                <Card interactive className="group flex h-full flex-col overflow-hidden">
                  <div className="relative aspect-[16/10] overflow-hidden bg-surface-strong">
                    {image ? (
                      <img
                        src={image}
                        alt=""
                        aria-hidden
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-slower ease-out group-hover:scale-105"
                      />
                    ) : (
                      <span
                        aria-hidden
                        className="flex h-full w-full items-center justify-center bg-primary-soft/50 font-display text-3xl font-semibold tracking-wide text-primary/70 transition-transform duration-slower ease-out group-hover:scale-105"
                      >
                        {monogram(name)}
                      </span>
                    )}
                    <span
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-card/95 via-card/10 to-transparent"
                    />
                  </div>

                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <h3 className="text-caption font-semibold leading-snug text-foreground transition-colors duration-base group-hover:text-primary sm:text-base">
                      {name}
                    </h3>
                    <p className="mt-auto flex items-center gap-1.5 text-caption text-muted-foreground">
                      <MapPin aria-hidden className="h-3.5 w-3.5 shrink-0 text-primary" />
                      {location}
                    </p>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* Learning centres map */}
      <Section tone="surface" aria-labelledby="centres-heading">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col items-start gap-6">
              <SectionHeader
                align="start"
                id="centres-heading"
                title="Integrated Learning Centres"
                description="High-tech centres built inside partner campuses — aptitude servers, computer classrooms, evaluation dashboards and dedicated mentoring clinics, all on site."
              />

              <Button variant="outline" onClick={() => setIsMapZoomed(true)}>
                <Maximize2 aria-hidden />
                View the map in detail
              </Button>
            </div>

            <Reveal variant="scale-in">
              <MediaFrame className="mx-auto w-full max-w-md">
                <button
                  type="button"
                  onClick={() => setIsMapZoomed(true)}
                  className="group block w-full cursor-zoom-in bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                  aria-label="Enlarge the learning centres map"
                >
                  <img
                    src={MAP_IMAGE}
                    alt={MAP_ALT}
                    loading="lazy"
                    decoding="async"
                    className="aspect-square w-full object-contain p-4 transition-transform duration-slower ease-out group-hover:scale-[1.03]"
                  />
                </button>
              </MediaFrame>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Map lightbox */}
      <AnimatePresence>
        {isMapZoomed ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={MAP_ALT}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION.base, ease: EASE.out }}
            onClick={() => setIsMapZoomed(false)}
            className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-foreground/85 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: DURATION.slow, ease: EASE.out }}
              onClick={(event) => event.stopPropagation()}
              className="relative max-h-[90vh] cursor-default overflow-hidden rounded-3xl border border-border bg-card p-2 shadow-2xl"
            >
              <Button
                variant="secondary"
                size="icon"
                onClick={() => setIsMapZoomed(false)}
                className="absolute right-4 top-4 z-10"
                aria-label="Close the map"
                autoFocus
              >
                <X aria-hidden />
              </Button>

              <img
                src={MAP_IMAGE}
                alt={MAP_ALT}
                className="max-h-[85vh] w-auto rounded-2xl object-contain"
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Recruiters */}
      <Section tone="default" aria-labelledby="recruiters-heading">
        <Container className="flex flex-col gap-14">
          <SectionHeader
            id="recruiters-heading"
            title="Building careers at global organizations"
          />

          {/* Same tile treatment as the homepage trust band: these marks are
              raster PNGs with an opaque white plate, so they need a light
              surface in both themes. */}
          <Stagger
            step={0.03}
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
          >
            {recruiters.map(({ src, name }) => (
              <StaggerItem
                key={src}
                className="group flex h-24 items-center justify-center rounded-xl bg-white px-6 ring-1 ring-inset ring-border/70 transition-[transform,box-shadow] duration-base ease-out hover:-translate-y-0.5 hover:shadow-sm"
              >
                <img
                  src={src}
                  alt={name}
                  loading="lazy"
                  decoding="async"
                  className="max-h-12 max-w-full object-contain opacity-75 grayscale transition-[opacity,filter,transform] duration-base ease-out group-hover:scale-[1.03] group-hover:opacity-100 group-hover:grayscale-0"
                />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      <ClosingCta
        title="Add your campus to this list"
        description="We build Integrated Learning Centres inside partner institutions. Tell us about yours and we'll show you what that looks like."
      />
    </PageLayout>
  );
}
