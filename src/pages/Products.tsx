import {
  Award,
  BarChart3,
  BookOpen,
  Check,
  ClipboardList,
  Cpu,
  FileBarChart,
  FlaskConical,
  Lock,
  Monitor,
  Server,
  Shield,
  Timer,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { ClosingCta } from "@/components/layout/ClosingCta";
import { PageHero } from "@/components/layout/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { CodeKrackCard } from "@/components/products/CodeKrackCard";
import { Seo } from "@/components/Seo";
import { Card } from "@/components/ui/card";
import { IconTile } from "@/components/ui/icon-tile";
import { MediaFrame } from "@/components/ui/media-frame";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import {
  AmbientBackdrop,
  Container,
  Section,
  SectionHeader,
} from "@/components/ui/section";
import QuantumServerImage from "@/assets/Quantum_Server.jpg";
import UrNotedImage from "@/assets/WhatsApp Image 2026-08-01 at 23.06.53.jpeg";

type Highlight = { title: string; description: string; icon: LucideIcon };

const quantumHighlights: Highlight[] = [
  {
    title: "Real-time assessment",
    description:
      "Instant feedback and detailed analytics the moment a candidate submits, rather than a report a fortnight later.",
    icon: Zap,
  },
  {
    title: "Built for the whole campus",
    description:
      "Thousands of candidates can sit the same paper simultaneously without the engine slowing down or dropping a submission.",
    icon: Server,
  },
  {
    title: "Secure and private",
    description:
      "Candidate data is encrypted in transit and at rest, with access scoped to the institution that owns it.",
    icon: Shield,
  },
];

const mobileLabFeatures: Highlight[] = [
  {
    title: "Reaches the last mile",
    description:
      "Villages and small towns that no training provider services, on a route planned with the district administration.",
    icon: Users,
  },
  {
    title: "A working lab on board",
    description:
      "Local servers, coding sandboxes and interactive displays — the same environment as a campus lab, parked in the village.",
    icon: Cpu,
  },
  {
    title: "Government endorsed",
    description:
      "Run as a flagship skill development project with the Ministry of Rural Industries, Government of Tamil Nadu.",
    icon: Award,
  },
];

const handbookFeatures = [
  "Customised handbook for aspirants targeting campus placements",
  "400+ core concepts with examples, twists, tricks, choices and diluted solutions",
  "Graded problems with lateral solutions focused on dream and super-dream offers",
  "Exam focus: Bank PO, UPSC, GATE, CAT, TANSET and TNPSC",
  "Industry 5.0 specific concepts for quantitative, reasoning and logical ability",
  "3,500+ actual questions with answers",
];

const skillBillHighlights: Highlight[] = [
  {
    title: "Company-specific aptitude assessments",
    description:
      "Institutions can configure and run tests tailored to each recruiting company's syllabus and format, so students prepare for exactly the right paper.",
    icon: FlaskConical,
  },
  {
    title: "Real-time online examinations",
    description:
      "Secure, browser-based test delivery with a live proctoring layer — every submission is timestamped and locked the moment time expires.",
    icon: Monitor,
  },
  {
    title: "Performance analytics and reports",
    description:
      "Detailed score breakdowns, topic-level heat maps and batch comparison charts generated automatically after every test.",
    icon: FileBarChart,
  },
  {
    title: "Engineering placement preparation",
    description:
      "Curated question banks aligned to top engineering recruiters, with difficulty tiers that match each company's interview bar.",
    icon: BookOpen,
  },
  {
    title: "Secure and scalable platform",
    description:
      "Role-based access for coordinators, faculty and students keeps data in the right hands while the engine scales to the whole batch simultaneously.",
    icon: Lock,
  },
];

const urNotedHighlights: Highlight[] = [
  {
    title: "Digital attendance recording",
    description:
      "Replace paper registers entirely — trainers mark attendance on any device and the record is saved instantly to a centralised log.",
    icon: ClipboardList,
  },
  {
    title: "Fast and accurate session tracking",
    description:
      "Bulk mark, individual override and late-entry corrections take seconds, so the register is always correct before the session ends.",
    icon: Timer,
  },
  {
    title: "Real-time attendance reports",
    description:
      "Cumulative percentage, session-by-session breakdown and absentee alerts available the moment a session is closed.",
    icon: BarChart3,
  },
  {
    title: "Trainer-friendly interface",
    description:
      "A minimal, tap-first design means trainers can take attendance while speaking — no extra cognitive load or training required.",
    icon: Users,
  },
  {
    title: "Reliable attendance management",
    description:
      "Offline-capable data layer syncs to the cloud as soon as connectivity is restored, so no session is ever lost due to a dropped signal.",
    icon: Server,
  },
];

/** Shared icon + copy row used by both product sections. */
const HighlightList = ({ items }: { items: Highlight[] }) => (
  <Stagger className="flex flex-col gap-6" step={0.08}>
    {items.map(({ title, description, icon: Icon }) => (
      <StaggerItem key={title} className="flex gap-4">
        <IconTile icon={<Icon />} />
        <div>
          <h3 className="text-h4 text-foreground">{title}</h3>
          <p className="mt-1.5 max-w-measure-sm text-caption leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
      </StaggerItem>
    ))}
  </Stagger>
);

export default function Products() {
  return (
    <PageLayout>
      <Seo
        title="Products — CodeKrack, D'LAN Quantum Server & the Mobile Training Institute"
        description="CodeKrack, our coding practice platform; the D'LAN Quantum Server assessment engine; India's first Mobile Training Institute under the Rural Connect Programme; and handcrafted aptitude material for institutions."
      />

      <PageHero
        title="Built to measure"
        highlight="capability at scale"
        description="A coding platform, an assessment engine, a mobile laboratory and the material that runs on all three."
      />

      {/* CodeKrack — the one product a visitor can use immediately, so it
          leads. */}
      <CodeKrackCard />

      {/* Quantum Server */}
      <Section tone="surface" aria-labelledby="quantum-heading">
        <Container className="flex flex-col gap-14">
          <SectionHeader
            id="quantum-heading"
            title="D'LAN Quantum Server"
            description="One test engine, sat by a whole campus at once, scored as it happens."
          />

          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal variant="scale-in">
              <MediaFrame>
                <img
                  src={QuantumServerImage}
                  alt="The D'LAN Quantum Server hardware"
                  width={840}
                  height={630}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover"
                />
              </MediaFrame>
            </Reveal>

            <HighlightList items={quantumHighlights} />
          </div>
        </Container>
      </Section>

      {/* Mobile Training Institute */}
      <Section tone="default" aria-labelledby="mobile-heading">
        <AmbientBackdrop />

        <Container className="flex flex-col gap-14">
          <SectionHeader
            id="mobile-heading"
            title="Mobile Training Institute"
            description="India's first mobile training institute, run with the Ministry of Rural Industries, Government of Tamil Nadu."
          />

          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col gap-8">
              <Reveal>
                <p className="max-w-measure text-lead text-foreground">
                  Rural students should not have to travel to reach a computer lab, so the lab
                  travels instead &mdash; carrying career coaching, computational facilities and
                  employability programmes to where the students already are.
                </p>
              </Reveal>

              <HighlightList items={mobileLabFeatures} />
            </div>

            <Reveal variant="scale-in" className="lg:order-first">
              <MediaFrame>
                <img
                  src="/assets/mobile.jpg"
                  alt="The Syasan's mobile training laboratory vehicle"
                  width={1000}
                  height={750}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover"
                />
              </MediaFrame>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Skill Bill */}
      <Section tone="surface" aria-labelledby="skillbill-heading">
        <Container className="flex flex-col gap-14">
          <SectionHeader
            id="skillbill-heading"
            title="Skill Bill"
            description="Online aptitude assessment platform designed for engineering students — enabling institutions to run company-specific tests, evaluate performance and generate analytical reports."
          />

          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal variant="scale-in">
              <MediaFrame>
                {/* Placeholder: branded gradient with aptitude-themed iconography */}
                <div className="aspect-[4/3] w-full flex flex-col items-center justify-center gap-6 bg-gradient-to-br from-primary/10 via-surface-strong to-accent/10">
                  <div className="flex items-center justify-center h-20 w-20 rounded-2xl bg-gradient-to-br from-primary to-accent shadow-lg">
                    <FlaskConical className="h-10 w-10 text-white" strokeWidth={1.5} />
                  </div>
                  <div className="text-center px-8">
                    <p className="text-h4 font-semibold text-foreground">Skill Bill</p>
                    <p className="mt-1 text-caption text-muted-foreground">Aptitude Assessment Platform</p>
                  </div>
                  <div className="flex gap-3">
                    {[Monitor, FileBarChart, BarChart3].map((Icon, i) => (
                      <div key={i} className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-4 w-4" strokeWidth={1.75} />
                      </div>
                    ))}
                  </div>
                </div>
              </MediaFrame>
            </Reveal>

            <HighlightList items={skillBillHighlights} />
          </div>
        </Container>
      </Section>

      {/* UrNoted */}
      <Section tone="default" aria-labelledby="urnoted-heading">
        <AmbientBackdrop />

        <Container className="flex flex-col gap-14">
          <SectionHeader
            id="urnoted-heading"
            title="UrNoted"
            description="Intelligent attendance management solution that simplifies attendance recording during training sessions, workshops, seminars, and classrooms with minimal effort."
          />

          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col gap-8">
              <Reveal>
                <p className="max-w-measure text-lead text-foreground">
                  Paper registers and spreadsheet workarounds slow trainers down and introduce errors.
                  UrNoted turns attendance into a two-tap action &mdash; leaving more time for the
                  session itself.
                </p>
              </Reveal>

              <HighlightList items={urNotedHighlights} />
            </div>

            <Reveal variant="scale-in" className="lg:order-first">
              <MediaFrame>
                <img
                  src={UrNotedImage}
                  alt="UrNoted — Smart Attendance. Seamless Records. Official product visual by Syasan's Career Analytics"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-contain block"
                />
              </MediaFrame>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Aptitude handbooks */}
      <Section tone="surface" aria-labelledby="handbook-heading">
        <Container className="flex flex-col gap-14">
          <SectionHeader
            id="handbook-heading"
            title="Handcrafted aptitude for institutions"
            description="Customised material that raises aptitude scores for campus placements and competitive exams."
          />

          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal variant="scale-in">
              <MediaFrame>
                <img
                  src="/assets/Books.jpg"
                  alt="Syasan's printed aptitude handbooks"
                  width={840}
                  height={630}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover"
                />
              </MediaFrame>
            </Reveal>

            <Reveal>
              <Card className="p-8 sm:p-10">
                <h3 className="text-h3 text-foreground">What&rsquo;s inside</h3>
                <ul className="mt-6 flex flex-col gap-4">
                  {handbookFeatures.map((feature) => (
                    <li key={feature} className="flex gap-3">
                      <Check
                        aria-hidden
                        className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                        strokeWidth={1.75}
                      />
                      <span className="text-caption leading-relaxed text-muted-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          </div>
        </Container>
      </Section>

      <ClosingCta
        title="Put these to work on your campus"
        description="Assessment engine, mobile lab or course material — tell us what your cohort needs and we'll scope it."
      />
    </PageLayout>
  );
}
