import { ArrowUpRight, Youtube } from "lucide-react";

import { Seo } from "@/components/Seo";
import { TestimonialWall } from "@/components/TestimonialWall";
import { VideoEmbed } from "@/components/VideoEmbed";
import { ClosingCta } from "@/components/layout/ClosingCta";
import { PageHero } from "@/components/layout/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MediaFrame } from "@/components/ui/media-frame";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { Container, Section, SectionHeader } from "@/components/ui/section";
import { brandFilm } from "@/config/site";

/**
 * Student success stories.
 *
 * The brand film leads the page. It briefly sat in the homepage hero, but that
 * hero now autoplays a silent loop — and a narrated film playing muted, on a
 * loop, with no controls served nobody. Here it gets the treatment a film
 * needs: click to play, with sound, at size.
 *
 * It stays a facade embed rather than a live iframe, so the page never pays
 * for the YouTube player unless someone chooses to watch.
 */
const successStories = [
  { id: "f7OxoEDQmiQ", title: "Inspiring journey", caption: "A student on what changed, in their own words" },
  { id: "hszXCLp_yeg", title: "Finding a direction", caption: "How mentoring shaped a professional path" },
  { id: "jsUQ5bexqAg", title: "Achieving dreams", caption: "From aspiration to offer letter" },
  { id: "qBvyJ9dHdnU", title: "Personal growth", caption: "Beyond academics — confidence and communication" },
  { id: "J8-ECI3AG4Q", title: "Breaking barriers", caption: "Overcoming a difficult start to succeed" },
  { id: "gK9xjNtbvew", title: "Success compilation", caption: "Highlights from across our cohorts" },
] as const;

export default function Feedback() {
  return (
    <PageLayout>
      <Seo
        title="Student feedback & success stories — Syasan's Career Analytics"
        description="Watch student success stories and read unedited feedback from cohorts across our partner campuses in Tamil Nadu."
      />

      <PageHero
        title="Hear what people"
        highlight="say about us"
        description="Unedited feedback and filmed stories from the students and institutions we work with."
      />

      {/* The film */}
      <Section tone="default" aria-labelledby="film-heading">
        <Container className="flex flex-col gap-12">
          <SectionHeader
            id="film-heading"
            title="How the learning ecosystem works"
            description="Filmed across our partner campuses — what we do, and what it looks like from inside a cohort."
          />

          <Reveal variant="scale-in">
            <MediaFrame emphasis="hero" className="mx-auto w-full max-w-4xl">
              <VideoEmbed videoId={brandFilm.id} title={brandFilm.title} />
            </MediaFrame>
          </Reveal>
        </Container>
      </Section>

      {/* Success stories */}
      <Section tone="surface" aria-labelledby="stories-heading">
        <Container className="flex flex-col gap-14">
          <SectionHeader
            id="stories-heading"
            title="Success stories"
            description="Six students on what changed between the first assessment and the final offer."
          />

          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {successStories.map(({ id, title, caption }) => (
              <StaggerItem key={id} className="h-full">
                <Card interactive className="flex h-full flex-col overflow-hidden">
                  {/*
                    Six raw iframes meant six YouTube players — several
                    megabytes of third-party script — booting on page load.
                    Each is now a poster-plus-play facade that mounts the real
                    player only when someone chooses to watch.
                  */}
                  <VideoEmbed videoId={id} title={title} aspect="aspect-video" />

                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <h3 className="text-h4 text-foreground">{title}</h3>
                    <p className="text-caption leading-relaxed text-muted-foreground">{caption}</p>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal className="flex justify-center">
            <Button asChild variant="outline" size="lg">
              <a
                href="https://www.youtube.com/@SyasansCareerAnalytics"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube aria-hidden />
                More on our YouTube channel
                <ArrowUpRight aria-hidden />
              </a>
            </Button>
          </Reveal>
        </Container>
      </Section>

      {/* Written feedback */}
      <Section tone="default" aria-labelledby="wall-heading">
        <Container className="flex flex-col gap-14">
          <SectionHeader
            id="wall-heading"
            title="What our learners say"
            description="Thirty-one verified reviews from students across our partner campuses."
          />

          <Reveal>
            <TestimonialWall />
          </Reveal>
        </Container>
      </Section>

      <ClosingCta
        title="Give your students the same experience"
        description="Tell us about your cohort and we'll come back with a training-need analysis and a delivery plan built for it."
      />
    </PageLayout>
  );
}
