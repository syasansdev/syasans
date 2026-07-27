import {
  Award,
  BarChart2,
  BookOpen,
  Brain,
  Cloud,
  Code,
  Cpu,
  Database,
  FileCode,
  Figma,
  GraduationCap,
  Server,
  Settings,
  Shield,
  Smartphone,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { Seo } from "@/components/Seo";
import { ClosingCta } from "@/components/layout/ClosingCta";
import { PageHero } from "@/components/layout/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card } from "@/components/ui/card";
import { IconTile } from "@/components/ui/icon-tile";
import { MediaFrame } from "@/components/ui/media-frame";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { AmbientBackdrop, Container, Section, SectionHeader } from "@/components/ui/section";

type Course = { title: string; description: string; icon: LucideIcon };

const courses: Course[] = [
  {
    title: "Full-stack development",
    icon: Code,
    description:
      "Front-end and back-end web development end to end, preparing learners for the widest range of engineering roles.",
  },
  {
    title: "Machine learning",
    icon: Brain,
    description:
      "Learning from data — identifying patterns and building systems that make decisions with minimal human intervention.",
  },
  {
    title: "Agentic AI",
    icon: Cpu,
    description:
      "Autonomous systems that perceive their environment, reason about goals and act independently to achieve them.",
  },
  {
    title: "Cybersecurity",
    icon: Shield,
    description:
      "Protecting systems, networks and data from attack, unauthorised access and damage.",
  },
  {
    title: "DevOps",
    icon: Settings,
    description:
      "Practices that shorten the development lifecycle and sustain high-quality continuous delivery.",
  },
  {
    title: "UI/UX design (Figma)",
    icon: Figma,
    description:
      "Collaborative interface design, prototyping and hand-off in a shared design file.",
  },
  {
    title: "Angular",
    icon: Zap,
    description:
      "The Ivy compiler and runtime — smaller bundles, faster testing, better debugging and improved internationalisation.",
  },
  {
    title: "React",
    icon: Code,
    description:
      "Building user interfaces from reusable components and managing application state efficiently.",
  },
  {
    title: "Cloud",
    icon: Cloud,
    description:
      "Cloud technologies, architectures and services — designing, deploying and operating applications in the cloud.",
  },
  {
    title: "Android",
    icon: Smartphone,
    description:
      "Android app development with Java, Android Studio and the Android SDK.",
  },
  {
    title: "Big data analytics",
    icon: Database,
    description:
      "Collecting, processing and analysing large datasets to extract insight and support decisions.",
  },
  {
    title: "C & Java",
    icon: FileCode,
    description:
      "Hands-on coding challenges on HackerRank across both languages, geared to technical interviews.",
  },
  {
    title: "Advanced Python",
    icon: BookOpen,
    description:
      "Complex problem-solving on LeetCode — advanced data structures, algorithms and interview technique.",
  },
  {
    title: "Digital marketing",
    icon: BarChart2,
    description:
      "SEO, social, content and analytics — how an audience is found, reached and measured.",
  },
  {
    title: "Blockchain",
    icon: Server,
    description:
      "Decentralised application development, smart contracts and the industry applications of the technology.",
  },
  {
    title: "Power BI",
    icon: BarChart2,
    description:
      "Importing, transforming and analysing data into interactive reports and dashboards.",
  },
];

const commitments: Course[] = [
  {
    title: "20+ learning centres",
    icon: GraduationCap,
    description:
      "A network of centres delivering personalised training and development wherever your students are.",
  },
  {
    title: "94% client retention",
    icon: Users,
    description:
      "Institutions renew because outcomes hold up — tailored solutions and expert guidance, engagement after engagement.",
  },
  {
    title: "99% project success",
    icon: Award,
    description:
      "Every programme we take on is scoped against what the cohort needs, then run by people who have delivered it before.",
  },
];

const CourseGrid = ({ items, columns }: { items: Course[]; columns: string }) => (
  <Stagger step={0.04} className={`grid gap-6 ${columns}`}>
    {items.map(({ title, description, icon: Icon }) => (
      <StaggerItem key={title} className="h-full">
        <Card interactive className="group h-full p-7">
          <IconTile icon={<Icon />} interactive />
          <h3 className="mt-5 text-h4 text-foreground transition-colors duration-base group-hover:text-primary">
            {title}
          </h3>
          <p className="mt-2.5 text-caption leading-relaxed text-muted-foreground">{description}</p>
        </Card>
      </StaggerItem>
    ))}
  </Stagger>
);

export default function Inquiries() {
  return (
    <PageLayout>
      <Seo
        title="Programs — Centre for Emerging Technologies | Syasan's Career Analytics"
        description="Sixteen emerging-technology tracks from full-stack and machine learning to cybersecurity, cloud and Power BI, delivered inside partner campuses."
      />

      <PageHero
        title="Explore our"
        highlight="programmes"
        description="Sixteen emerging-technology tracks, delivered by practitioners and mapped to what recruiters are actually hiring for."
      />

      {/* Courses */}
      <Section tone="default" aria-labelledby="courses-heading">
        <AmbientBackdrop grid />

        <Container className="flex flex-col gap-14">
          <SectionHeader
            id="courses-heading"
            title="Centre for Emerging Technologies"
            description="Each track combines core theory, platform-based practice and placement-oriented assessment."
          />

          <CourseGrid items={courses} columns="sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" />
        </Container>
      </Section>

      {/* Software services */}
      <Section tone="surface" aria-labelledby="services-heading">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col items-start gap-6">
              <SectionHeader
                align="start"
                id="services-heading"
                title="Delivering excellence in software development"
                description="Alongside training, our engineering team builds production software — the same practitioners who then teach it, which is why the curriculum stays current."
              />
            </div>

            <Reveal variant="scale-in">
              <MediaFrame>
                <img
                  src="/assets/Discussion.jpg"
                  alt="Syasan's engineers in a software development working session"
                  width={900}
                  height={600}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[3/2] w-full object-cover"
                />
              </MediaFrame>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Commitments */}
      <Section tone="default" aria-labelledby="commitments-heading">
        <Container className="flex flex-col gap-14">
          <SectionHeader
            id="commitments-heading"
            title="What we commit to"
            description="The standards every engagement is held against."
          />

          <CourseGrid items={commitments} columns="md:grid-cols-3" />
        </Container>
      </Section>

      <ClosingCta
        title="Build a programme around your cohort"
        description="Tell us which tracks matter to your students and we'll come back with a curriculum and a schedule."
      />
    </PageLayout>
  );
}
