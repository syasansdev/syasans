import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  BarChart3,
  Building2,
  Handshake,
  Heart,
  Network,
  Rocket,
  Server,
  Trophy,
  Users,
  Zap,
  Award,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Stagger, StaggerItem } from "@/components/ui/reveal";
import { Container, Section, SectionHeader } from "@/components/ui/section";
import type { Milestone } from "@/types";

const milestones: Milestone[] = [
  {
    year: "2015",
    title: "Establishment and vision",
    description:
      "Syasan's Career Analytics is founded with a vision to change how career guidance and employability skills are taught.",
    icon: Rocket,
    image: "/assets/syasans-logo.png",
    tags: ["Founding", "Vision"],
  },
  {
    year: "2016",
    title: "Government collaboration",
    description:
      "Partnered with the government on the Sathanai Selvangal initiative, training students for competitive exams across remote Tamil Nadu.",
    icon: Handshake,
    image: "/assets/Sathanai_selvangal.jpg",
    tags: ["Government", "Outreach"],
  },
  {
    year: "2017",
    title: "Career analytics programme",
    description:
      "Launch of an analytics-driven programme built for students targeting super-dream offers.",
    icon: BarChart3,
    image: "/assets/Assesment.jpg",
    tags: ["Launch", "Analytics"],
  },
  {
    year: "2018",
    title: "State-level endorsement",
    description: "Official state-level endorsement for supplying talent pan-India.",
    icon: Award,
    image: "/assets/state_level_endorsement.jpg",
    tags: ["Recognition", "State level"],
  },
  {
    year: "2019",
    title: "Scaling impact",
    description: "Passed 50,000 students trained across South India.",
    icon: Users,
    image: "/assets/Demographic.jpg",
    tags: ["50k students", "Scale"],
  },
  {
    year: "2020",
    title: "National startup recognition",
    description:
      "Recognised by Benchmark Trust and TQV as a national startup for innovation in EdTech.",
    icon: Trophy,
    image: "/assets/Recognition.jpg",
    tags: ["Award", "EdTech"],
  },
  {
    year: "2021",
    title: "Strategic growth",
    description: "Network expanded through partnerships with 75+ educational institutions.",
    icon: Network,
    image: "/assets/Classroom_setting.jpg",
    tags: ["75+ partners", "Growth"],
  },
  {
    year: "2022",
    title: "Integrated Learning Centres",
    description: "Integrated Learning Centres deployed across 20+ institutions.",
    icon: Building2,
    image: "/assets/Coaching_place.jpg",
    tags: ["Infrastructure", "Learning"],
  },
  {
    year: "2023",
    title: "Global tech launch",
    description:
      "Launched the D'LAN Quantum Server, an aptitude test engine built for global markets.",
    icon: Server,
    image: "/assets/Quantum_Server.jpg",
    tags: ["Technology", "Global"],
  },
  {
    year: "2024",
    title: "Social responsibility honour",
    description:
      "Honoured for social responsibility contributions in education by the Ministry of Rural Industries, Government of Tamil Nadu.",
    icon: Heart,
    image: "/assets/mobile.jpg",
    tags: ["CSR", "Impact"],
  },
  {
    year: "2025",
    title: "Record-breaking conversion",
    description: "A 91% placement conversion rate — a new benchmark for the programme.",
    icon: Zap,
    image: "/assets/Placement_rate.jpg",
    tags: ["91% success", "Milestone"],
  },
];

const SCROLL_STEP = 340;

/**
 * The decade timeline.
 *
 * Rebuilt around a two-row grid: the rail, node and year marker occupy a
 * fixed-height first row, and the card occupies the second. The previous
 * version positioned every one of those pieces with absolute pixel offsets
 * (`top-[6px]`, `top-[40px]`, `top-[48px]`, `top-[72px]`, `top-[226px]`,
 * `pt-[90px]`) that only lined up at one card height, and drove the arrow
 * buttons off the same constants.
 *
 * The 2025 entry no longer gets its own orange-and-yellow colourway, ping
 * animation and "LATEST" badge; being last on the rail already says that.
 */
export const Timeline = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [progress, setProgress] = useState(0);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const { scrollLeft, scrollWidth, clientWidth } = track;
    const maxScroll = scrollWidth - clientWidth;

    setCanScrollLeft(scrollLeft > 8);
    setCanScrollRight(maxScroll - scrollLeft > 8);
    setProgress(maxScroll > 0 ? scrollLeft / maxScroll : 0);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    measure();
    track.addEventListener("scroll", measure, { passive: true });

    // Also re-measure on resize: whether the track overflows at all depends
    // on the viewport, and the arrows must not linger when it no longer does.
    const observer = new ResizeObserver(measure);
    observer.observe(track);

    return () => {
      track.removeEventListener("scroll", measure);
      observer.disconnect();
    };
  }, [measure]);

  const scrollBy = (direction: -1 | 1) =>
    trackRef.current?.scrollBy({ left: direction * SCROLL_STEP, behavior: "smooth" });

  return (
    <Section tone="surface" aria-labelledby="timeline-heading">
      <Container className="flex flex-col gap-14">
        <SectionHeader
          id="timeline-heading"
          title="A decade of impact and innovation"
          description="Key milestones and placement breakthroughs between 2015 and 2025."
        />

        <div className="relative">
          {/* Rail */}
          <div aria-hidden className="absolute inset-x-0 top-[1.375rem] h-px bg-border" />
          <div
            aria-hidden
            className="absolute left-0 top-[1.375rem] h-px origin-left bg-gradient-to-r from-primary to-accent transition-transform duration-base ease-out"
            style={{ width: "100%", transform: `scaleX(${Math.max(progress, 0.02)})` }}
          />

          <div
            ref={trackRef}
            className="scrollbar-none flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2"
            tabIndex={0}
            role="group"
            aria-label="Timeline of milestones — scroll horizontally to browse"
          >
            <Stagger step={0.04} className="flex gap-6">
              {milestones.map(({ year, title, description, icon: Icon, image, tags }) => (
                <StaggerItem
                  key={year}
                  className="group flex w-[17rem] shrink-0 snap-start flex-col sm:w-[19rem]"
                >
                  {/* Marker row — fixed height so every node sits on the rail. */}
                  <div className="flex h-11 items-center justify-center">
                    <span className="rounded-full border border-border bg-background px-3 py-1 font-mono text-caption font-semibold text-foreground shadow-sm transition-colors duration-base ease-out group-hover:border-primary/40 group-hover:text-primary">
                      {year}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-[box-shadow,border-color,transform] duration-base ease-out group-hover:-translate-y-1 group-hover:border-primary/25 group-hover:shadow-lg">
                    <div className="relative aspect-[16/10] overflow-hidden bg-surface-strong">
                      <img
                        src={image}
                        alt=""
                        aria-hidden
                        loading="lazy"
                        decoding="async"
                        className={
                          year === "2015"
                            ? "h-full w-full object-contain p-8"
                            : "h-full w-full object-cover transition-transform duration-slower ease-out group-hover:scale-105"
                        }
                      />
                      <span
                        aria-hidden
                        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-background/90 text-primary shadow-sm"
                      >
                        <Icon className="h-4 w-4" strokeWidth={1.75} />
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col gap-3 p-5">
                      <h3 className="text-h4 leading-snug text-foreground">{title}</h3>
                      <p className="text-caption leading-relaxed text-muted-foreground">
                        {description}
                      </p>

                      {tags ? (
                        <ul className="mt-auto flex flex-wrap gap-1.5 pt-2">
                          {tags.map((tag) => (
                            <li
                              key={tag}
                              className="rounded-md bg-secondary px-2 py-0.5 text-micro font-semibold uppercase tracking-wide text-muted-foreground"
                            >
                              {tag}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          {/* Controls. Hidden from assistive tech: the track itself is
              focusable and scrollable with the arrow keys, so these are a
              pointer convenience, not the only route. */}
          <div aria-hidden className="mt-6 flex justify-end gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scrollBy(-1)}
              disabled={!canScrollLeft}
              tabIndex={-1}
            >
              <ChevronLeft />
              <span className="sr-only">Scroll left</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scrollBy(1)}
              disabled={!canScrollRight}
              tabIndex={-1}
            >
              <ChevronRight />
              <span className="sr-only">Scroll right</span>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
};
