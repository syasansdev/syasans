import {
  Award,
  BarChart3,
  Brain,
  CheckCircle2,
  Code,
  Compass,
  FileSpreadsheet,
  GraduationCap,
  Lightbulb,
  Medal,
  School,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";

import { Seo } from "@/components/Seo";
import { Timeline } from "@/components/Timeline";
import { ClosingCta } from "@/components/layout/ClosingCta";
import { PageHero } from "@/components/layout/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card } from "@/components/ui/card";
import { IconTile } from "@/components/ui/icon-tile";
import { MediaFrame } from "@/components/ui/media-frame";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { AmbientBackdrop, Container, Section, SectionHeader } from "@/components/ui/section";

type Module = { title: string; subtitle: string; description: string; icon: LucideIcon };

const modules: Module[] = [
  {
    title: "Thinkathon",
    subtitle: "Hackathon readiness and innovation training",
    description:
      "Problem-solving frameworks, innovation methodologies, analysis of previous hackathon problems, rapid ideation, prototype strategy and team-based solution building.",
    icon: Lightbulb,
  },
  {
    title: "AlgoX",
    subtitle: "Advanced coding on global learning platforms",
    description:
      "Intensive problem-solving on HackerRank and LeetCode — programming logic, DSA mastery, coding-interview preparation and competitive programming exposure.",
    icon: Code,
  },
  {
    title: "Humaneering Skills",
    subtitle: "Campus-to-corporate behavioural transformation",
    description:
      "Communication mastery, leadership development, workplace etiquette, emotional intelligence, critical thinking, presentation skills and team collaboration.",
    icon: Users,
  },
  {
    title: "Impact Camps",
    subtitle: "Experiential outdoor leadership workshops",
    description:
      "Immersive outbound learning — leadership simulations, problem-solving missions, trust-building frameworks and real-time decision-making challenges.",
    icon: Compass,
  },
  {
    title: "FacultyEdge",
    subtitle: "AI-integrated faculty development and certification",
    description:
      "Enabling educators to integrate modern AI tools, digital teaching methodologies, outcome-based learning practice and technology-enabled pedagogy.",
    icon: GraduationCap,
  },
  {
    title: "Classroom Innovation Labs",
    subtitle: "Teacher training and certification workshops",
    description:
      "Classroom strategies, AI-assisted teaching tools, experiential methods and professional certification for educators.",
    icon: School,
  },
];

const dashboardCapabilities = [
  {
    title: "Real-time analytics",
    description: "Live tracking of participation and evaluation outcomes.",
    icon: BarChart3,
  },
  {
    title: "Performance metrics",
    description: "Analytical insight into individual and cohort benchmarks.",
    icon: TrendingUp,
  },
  {
    title: "Progress tracking",
    description: "Continuous monitoring across every learning phase.",
    icon: CheckCircle2,
  },
  {
    title: "Custom reports",
    description: "Data exports for administrative review and decision-making.",
    icon: FileSpreadsheet,
  },
];

const accomplishments: { text: string; year?: string; icon: LucideIcon }[] = [
  { text: "Quality certified by the Ministry of Higher Education", year: "2018", icon: Trophy },
  { text: "Course content approved by the TN Text Book Corporation", year: "2017", icon: CheckCircle2 },
  { text: "“Syasan's has great aspirations” — Ministry of Rural Industries", year: "2018", icon: Star },
  { text: "“The training programme is very specific” — Ministry of School Education", year: "2018", icon: Target },
  { text: "Ranked among 500 outperforming companies by Benchmark Trust and TQV", year: "2019", icon: Award },
  { text: "An ISO 9001 certified institution", icon: Medal },
  { text: "Aptitude assessment engine with 5,000+ practice questions", icon: Brain },
];

export default function ReferringTo() {
  return (
    <PageLayout>
      <Seo
        title="About Syasan's — methodology, credentials and accomplishments"
        description="How Syasan's Career Analytics builds employability: an assessment-led methodology, seven training programmes, institutional dashboards and a decade of recognition."
      />

      <PageHero
        title="A frontrunner in"
        highlight="employability training"
        description="Our credentials, methodology and the partnerships that back our standards of career training and analytics."
      />

      {/* Who we are */}
      <Section tone="default" aria-labelledby="about-heading">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col gap-6">
              <SectionHeader
                align="start"
                id="about-heading"
                title="About Syasan's"
                description="A data-driven framework that builds the skills employers actually screen for."
              />

              <Reveal delay={0.06} className="flex flex-col gap-5">
                <p className="max-w-measure text-body leading-relaxed text-muted-foreground">
                  Employers hire for behavioural maturity, digital proficiency and workplace
                  readiness. We build all three, and the programme that does it is designed
                  against evidence rather than assumption.
                </p>
                <p className="max-w-measure text-body leading-relaxed text-muted-foreground">
                  The foundation is a scientifically designed assessment methodology using
                  psychometrics, competency mapping and behavioural analysis. Institutions gain
                  deep insight into every learner&rsquo;s abilities, strengths and development
                  needs &mdash; before any teaching begins.
                </p>
              </Reveal>
            </div>

            <Reveal variant="scale-in" delay={0.08}>
              <MediaFrame>
                <img
                  src="/assets/Group.jpg"
                  alt="The Syasan's Career Analytics team with a student cohort"
                  width={900}
                  height={675}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover"
                />
              </MediaFrame>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Training ecosystem */}
      <Section tone="surface" aria-labelledby="ecosystem-heading">
        <AmbientBackdrop />

        <Container className="flex flex-col gap-14">
          <SectionHeader
            id="ecosystem-heading"
            title="Seven programmes, one system"
            description="Technical capability, behavioural maturity and cognitive readiness — each with its own programme, all reporting into the same assessment data."
          />

          <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {modules.map(({ title, subtitle, description, icon: Icon }) => (
              <StaggerItem key={title} className="h-full">
                <Card interactive className="group h-full p-7">
                  <IconTile icon={<Icon />} interactive />

                  <p className="mt-5 text-overline uppercase text-primary">{title}</p>
                  <h3 className="mt-2 text-h4 leading-snug text-foreground">{subtitle}</h3>
                  <p className="mt-3 text-caption leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>

          {/* Think With No Ink — the flagship, given its own weight. */}
          <Reveal>
            <Card
              elevation="raised"
              className="flex flex-col gap-7 p-8 sm:flex-row sm:items-start sm:p-10"
            >
              <IconTile icon={<Brain />} tone="solid" size="lg" />

              <div>
                <p className="text-overline uppercase text-primary">Think With No Ink</p>
                <h3 className="mt-2 text-h3 text-foreground">
                  Aptitude and competitive exam mastery
                </h3>
                <p className="mt-4 max-w-measure text-body leading-relaxed text-muted-foreground">
                  Our exclusive methodology trains students to solve aptitude and logical reasoning
                  problems mentally, without depending on pen-and-paper calculation. It targets
                  analytical speed, shortcut technique, accuracy, quantitative aptitude and verbal
                  ability &mdash; through high-speed cognitive training and real-time assessment.
                </p>
              </div>
            </Card>
          </Reveal>
        </Container>
      </Section>

      {/* Dashboards */}
      <Section tone="default" aria-labelledby="dashboards-heading">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col gap-8">
              <SectionHeader
                align="start"
                id="dashboards-heading"
                title="Smart institutional dashboards"
                description="Track student performance, cohort readiness, training progress and placement metrics — so decisions are data-driven at every level."
              />

              <Stagger className="grid gap-5 sm:grid-cols-2">
                {dashboardCapabilities.map(({ title, description, icon: Icon }) => (
                  <StaggerItem key={title}>
                    <Card elevation="flat" className="h-full bg-surface p-5">
                      <Icon aria-hidden className="h-5 w-5 text-primary" strokeWidth={1.75} />
                      <h3 className="mt-3.5 text-caption font-semibold text-foreground">{title}</h3>
                      <p className="mt-1.5 text-caption leading-relaxed text-muted-foreground">
                        {description}
                      </p>
                    </Card>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>

            <Reveal variant="scale-in">
              <MediaFrame>
                <img
                  src="/assets/Dashboard.jpg"
                  alt="The Syasan's institutional analytics dashboard"
                  width={1000}
                  height={750}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover object-left-top"
                />
              </MediaFrame>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Decade timeline */}
      <Timeline />

      {/* Accomplishments */}
      <Section tone="default" aria-labelledby="accomplishments-heading">
        <Container className="flex flex-col gap-14">
          <SectionHeader
            id="accomplishments-heading"
            title="Accomplishments"
            description="A decade of recognition for our work in education and training."
          />

          <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {accomplishments.map(({ text, year, icon: Icon }, index) => (
              <StaggerItem key={text} className="h-full">
                <Card interactive className="group flex h-full flex-col gap-5 p-7">
                  <div className="flex items-start justify-between gap-4">
                    <IconTile icon={<Icon />} interactive />

                    <div className="flex items-center gap-3">
                      {year ? (
                        <span className="rounded-full bg-secondary px-2.5 py-1 text-micro font-semibold text-muted-foreground">
                          {year}
                        </span>
                      ) : null}
                      <span
                        aria-hidden
                        className="font-mono text-h3 font-semibold leading-none text-border-strong transition-colors duration-base group-hover:text-primary/40"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  <p className="text-body leading-relaxed text-muted-foreground">{text}</p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      <ClosingCta
        title="See the methodology applied to your cohort"
        description="Send us your department, intake size and placement targets. We'll come back with a training-need analysis built on them."
      />
    </PageLayout>
  );
}
