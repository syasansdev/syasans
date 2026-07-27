import {
  Activity,
  Award,
  BarChart,
  BookOpen,
  BookOpenCheck,
  Calendar,
  CheckCircle,
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  Compass,
  FileText,
  Lightbulb,
  MessageSquare,
  Search,
  Sliders,
  Target,
  Trophy,
  Briefcase,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

import { AmbientVideo } from "@/components/AmbientVideo";
import { Seo } from "@/components/Seo";
import { ClosingCta } from "@/components/layout/ClosingCta";
import { PageHero } from "@/components/layout/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IconTile } from "@/components/ui/icon-tile";
import { MediaFrame } from "@/components/ui/media-frame";
import { Reveal } from "@/components/ui/reveal";
import { AmbientBackdrop, Container, Section } from "@/components/ui/section";
import { DURATION, EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Step = {
  number: string;
  title: string;
  summary: string;
  detail: string;
  icon: LucideIcon;
  /** Which of the four delivery phases this step belongs to. */
  phase: "Analyse" | "Plan" | "Deliver" | "Prove";
};

const steps: Step[] = [
  {
    number: "01",
    title: "Conducting training-need analysis",
    summary: "Assessing skill gaps against organisational goals.",
    detail:
      "We evaluate participants' current skill levels, strengths and weaknesses, and align the findings with the organisation's business goals so the training delivers measurable value.",
    icon: Search,
    phase: "Analyse",
  },
  {
    number: "02",
    title: "Identifying major areas of improvement",
    summary: "Determining technical and behavioural focus areas.",
    detail:
      "From the needs analysis we isolate the areas requiring development: specific technical domains, core analytical capability, and the interpersonal or leadership skills needed for peak performance.",
    icon: Target,
    phase: "Analyse",
  },
  {
    number: "03",
    title: "Customising the course",
    summary: "Tailoring curriculum modules to your requirements.",
    detail:
      "The syllabus is written for this cohort, not pulled off a shelf: learning paths, projects and hands-on modules built around the work your students are actually doing.",
    icon: Sliders,
    phase: "Analyse",
  },
  {
    number: "04",
    title: "Briefing you on the customised course",
    summary: "Sharing the curriculum roadmap for feedback.",
    detail:
      "We walk stakeholders through every learning objective, project milestone and evaluation method, then incorporate final adjustments before anything is committed.",
    icon: Briefcase,
    phase: "Plan",
  },
  {
    number: "05",
    title: "Finalising the training dates",
    summary: "Scheduling sessions and milestones.",
    detail:
      "We coordinate with your operations and academic teams to lock in schedules — intensive bootcamps, weekend batches or distributed weekly sessions, whichever minimises disruption.",
    icon: Calendar,
    phase: "Plan",
  },
  {
    number: "06",
    title: "Sharing the training delivery plan",
    summary: "Distributing the detailed daily agenda.",
    detail:
      "Every stakeholder gets the same document: the day-by-day sequence of topics, labs, projects, mentor check-ins and assessment checkpoints.",
    icon: FileText,
    phase: "Plan",
  },
  {
    number: "07",
    title: "Addressing the prerequisites",
    summary: "Ensuring setups, installations and systems are ready.",
    detail:
      "The learning environment is configured before day one — prep materials distributed, sandbox servers provisioned, licences configured and hardware compatibility verified.",
    icon: CheckSquare,
    phase: "Plan",
  },
  {
    number: "08",
    title: "Syasan's experiential learning process",
    summary: "Implementing our research-backed core pedagogy.",
    detail:
      "The heart of the programme. Our four-step experiential pedagogy is designed to maximise retention and engagement, and to translate concepts directly into daily productivity.",
    icon: BookOpen,
    phase: "Deliver",
  },
  {
    number: "09",
    title: "Conducting post-training assessment",
    summary: "Evaluating retention and technical growth.",
    detail:
      "Examinations, project reviews and live coding challenges measure skill progression and conceptual understanding against the original baseline.",
    icon: CheckCircle,
    phase: "Deliver",
  },
  {
    number: "10",
    title: "Feedback on the training programme",
    summary: "Gathering evaluations from participants and clients.",
    detail:
      "Detailed feedback on pace, mentor performance, laboratory setup and curriculum utility, collected anonymously so it is honest and used to refine our standards.",
    icon: MessageSquare,
    phase: "Prove",
  },
  {
    number: "11",
    title: "Submitting the performance analysis report",
    summary: "Sharing diagnostic growth data with management.",
    detail:
      "A detailed dossier for management: diagnostic graphs, individual progress charts, domain competency scores and action plans for continued learning.",
    icon: BarChart,
    phase: "Prove",
  },
  {
    number: "12",
    title: "Recognising overall performers",
    summary: "Celebrating high achievers to incentivise excellence.",
    detail:
      "High achievers, top contributors and outstanding project teams are awarded trophies and accolades — momentum matters, and recognition builds it.",
    icon: Trophy,
    phase: "Prove",
  },
  {
    number: "13",
    title: "Providing e-certificates",
    summary: "Issuing digital credentials and achievement badges.",
    detail:
      "Participants clearing the final assessments receive a verified digital certificate — formal verification of new skills, ready to attach to an HR profile.",
    icon: Award,
    phase: "Prove",
  },
  {
    number: "14",
    title: "Post-training follow-up",
    summary: "Ongoing mentoring and placement assistance.",
    detail:
      "Learning does not end when the class does. Scheduled mentoring catch-ups, advanced learning assets and continuous career-path support carry it forward.",
    icon: Activity,
    phase: "Prove",
  },
];

const pedagogySteps = [
  {
    step: "Step 01",
    title: "Learning through research-based pedagogy",
    description: "Rigorous frameworks built on active academic and professional research.",
    icon: Compass,
  },
  {
    step: "Step 02",
    title: "Facilitated interactive classroom discussion",
    description: "Active engagement, peer discourse and collaborative problem-solving.",
    icon: MessageSquare,
  },
  {
    step: "Step 03",
    title: "Linking core concepts to real-time case studies",
    description: "Hands-on application of theory to memorable real-world business cases.",
    icon: Lightbulb,
  },
  {
    step: "Step 04",
    title: "Implementing the learning daily",
    description: "Action plans and tracking that apply new knowledge directly to work.",
    icon: Workflow,
  },
];

const PEDAGOGY_STEP_INDEX = 7;

export default function TrainingJourney() {
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const active = steps[activeIndex];
  const showsPedagogy = activeIndex === PEDAGOGY_STEP_INDEX;

  const go = (delta: number) =>
    setActiveIndex((current) => (current + delta + steps.length) % steps.length);

  return (
    <PageLayout>
      <Seo
        title="Training journey — the 14-step delivery framework | Syasan's"
        description="How every Syasan's engagement runs, from training-need analysis through experiential delivery to performance reporting and post-training mentoring."
      />

      <PageHero
        title="The 14-step"
        highlight="delivery framework"
        description="An end-to-end methodology built on research-driven training, practical application, continuous assessment and measurable outcomes."
      />

      <Section tone="default" aria-labelledby="framework-heading">
        <AmbientBackdrop grid />

        <Container>
          <h2 id="framework-heading" className="sr-only">
            The fourteen steps
          </h2>

          {/*
            The previous version drew these steps on a crescent arc using hard
            pixel coordinates (a 900px circle at cx=745, cy=410 inside a
            fixed 820px box) plus a resize listener and an SVG whose path data
            was recomputed from `getBoundingClientRect`. It only lined up at
            one viewport width and overflowed its column at every other.

            A two-pane layout — index on the left, detail on the right,
            stacking on small screens — carries exactly the same information,
            works at every width, and is navigable with a keyboard because the
            steps are real buttons in a real list.
          */}
          <div className="grid gap-8 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-12">
            {/* Step index */}
            <nav aria-label="Framework steps" className="lg:sticky lg:top-28 lg:self-start">
              <ol className="flex max-h-none flex-col gap-1 overflow-y-auto lg:max-h-[calc(100vh-9rem)] lg:pr-2">
                {steps.map((step, index) => {
                  const isActive = index === activeIndex;
                  const startsPhase = index === 0 || steps[index - 1].phase !== step.phase;

                  return (
                    <li key={step.number}>
                      {startsPhase ? (
                        <p className="px-3 pb-2 pt-5 text-overline uppercase text-muted-foreground first:pt-0">
                          {step.phase}
                        </p>
                      ) : null}

                      <button
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        aria-current={isActive ? "step" : undefined}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors duration-base ease-out",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                          isActive
                            ? "bg-primary-soft text-primary"
                            : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                        )}
                      >
                        <span
                          aria-hidden
                          className={cn(
                            "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg font-mono text-micro font-bold transition-colors duration-base",
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-muted-foreground",
                          )}
                        >
                          {step.number}
                        </span>
                        <span className="text-caption font-medium leading-snug">{step.title}</span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </nav>

            {/* Detail */}
            <div className="flex flex-col gap-8">
              <Card elevation="raised" className="overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeIndex}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
                    transition={{ duration: DURATION.base, ease: EASE.out }}
                    className="p-8 sm:p-10"
                  >
                    <div className="flex items-start gap-4">
                      <IconTile icon={<active.icon />} tone="solid" />

                      <div>
                        <p className="text-overline uppercase text-muted-foreground">
                          Step {active.number} of 14 &middot; {active.phase}
                        </p>
                        <h3 className="mt-2 text-h3 text-foreground">{active.title}</h3>
                      </div>
                    </div>

                    <p className="mt-6 max-w-measure text-body leading-relaxed text-muted-foreground">
                      {active.detail}
                    </p>

                    {showsPedagogy ? (
                      <div className="mt-8 border-t border-border pt-7">
                        <h4 className="flex items-center gap-2 text-caption font-semibold text-foreground">
                          <BookOpenCheck aria-hidden className="h-4 w-4 text-primary" />
                          The four-step pedagogy framework
                        </h4>

                        <ol className="mt-5 grid gap-4 sm:grid-cols-2">
                          {pedagogySteps.map(({ step, title, description, icon: Icon }) => (
                            <li
                              key={step}
                              className="flex gap-3 rounded-xl border border-border bg-surface p-4"
                            >
                              <span
                                aria-hidden
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary"
                              >
                                <Icon className="h-4 w-4" strokeWidth={1.75} />
                              </span>
                              <div>
                                <p className="text-overline uppercase text-primary">{step}</p>
                                <p className="mt-1.5 text-caption font-semibold leading-snug text-foreground">
                                  {title}
                                </p>
                                <p className="mt-1 text-caption leading-relaxed text-muted-foreground">
                                  {description}
                                </p>
                              </div>
                            </li>
                          ))}
                        </ol>
                      </div>
                    ) : null}
                  </motion.div>
                </AnimatePresence>

                <div className="flex items-center justify-between gap-3 border-t border-border bg-surface px-8 py-4 sm:px-10">
                  <Button variant="ghost" onClick={() => go(-1)}>
                    <ChevronLeft aria-hidden />
                    Previous
                  </Button>

                  <span
                    aria-live="polite"
                    className="font-mono text-caption text-muted-foreground"
                  >
                    {active.number} / 14
                  </span>

                  <Button variant="ghost" onClick={() => go(1)}>
                    Next
                    <ChevronRight aria-hidden />
                  </Button>
                </div>
              </Card>

              <Reveal variant="scale-in">
                <MediaFrame>
                  {/* The source is 1280x720, so the box matches it exactly
                      rather than cropping to 16:10. */}
                  <div className="aspect-video w-full">
                    <AmbientVideo
                      src="/assets/f_d_c_b_a_d_a_c_fmp_.mp4"
                      poster="/assets/framework-poster.jpg"
                      label="Animated overview of the Syasan's delivery framework"
                    />
                  </div>
                </MediaFrame>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <ClosingCta
        title="Start at step one"
        description="Every engagement opens with a training-need analysis. Tell us about your cohort and we'll run it."
      />
    </PageLayout>
  );
}
