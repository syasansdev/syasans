import {
  Activity,
  ArrowRight,
  BarChart2,
  Briefcase,
  Code2,
  Eye,
  FileText,
  Github,
  LayoutDashboard,
  LineChart,
  Linkedin,
  Rocket,
  ShieldCheck,
  Target,
  Terminal,
  TrendingUp,
  Trophy,
  UserPlus,
  Gift
} from "lucide-react";

import CodeKrackDashboardImg from "@/assets/Screenshot 2026-08-01 002358.png";
import { buttonVariants } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { Container, Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";

const CODEKRACK_URL = "https://codekrack.in";

// ----------------------------------------------------------------------
// 1. MAC OS IMAGE FRAME
// ----------------------------------------------------------------------
const ImageFrame = ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
  <div
    className={cn(
      "relative w-full overflow-hidden rounded-2xl border border-border/50 bg-surface-strong shadow-2xl transition-transform hover:-translate-y-1 duration-500",
      className
    )}
  >
    {/* Mac OS Window Title Bar */}
    <div className="relative z-10 flex items-center gap-1.5 border-b border-border/30 bg-surface-strong px-4 py-3">
      {["bg-destructive", "bg-amber-400", "bg-success"].map((dot) => (
        <span key={dot} className={`h-2.5 w-2.5 rounded-full ${dot} shadow-sm`} />
      ))}
    </div>

    {/* Image container: sized to the image, no clipping */}
    <div className="w-full bg-surface">
      <img
        src={src}
        alt={alt}
        className="block w-full h-auto object-contain"
        loading="lazy"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.opacity = "0.1";
          target.parentElement?.classList.add("bg-gradient-to-br", "from-primary/5", "to-accent/5");
        }}
      />
    </div>
  </div>
);

// ----------------------------------------------------------------------
// 2. FEATURE GRID
// ----------------------------------------------------------------------
const features = [
  { icon: UserPlus, title: "Single Registration", desc: "One unified profile for everything." },
  { icon: Activity, title: "Lifetime Tracking", desc: "Your progress stays with you forever." },
  { icon: Code2, title: "Live LeetCode Tracking", desc: "Auto-sync your solved problems." },
  { icon: Terminal, title: "HackerRank Monitoring", desc: "Keep track of badges & stars." },
  { icon: Github, title: "GitHub Showcase", desc: "Highlight your repos and commits." },
  { icon: LineChart, title: "Real-Time Analytics", desc: "Instant performance feedback." },
  { icon: Trophy, title: "Peer Benchmarking", desc: "See where you stand in the cohort." },
  { icon: FileText, title: "Visual Coding Reports", desc: "Beautiful charts of your stats." },
  { icon: Briefcase, title: "Placement Ready Profile", desc: "Tailored for tech recruiters." },
  { icon: Linkedin, title: "LinkedIn Achievement Sharing", desc: "Export wins directly." },
  { icon: Eye, title: "Recruiter Visibility", desc: "Get noticed by top product companies." },
  { icon: TrendingUp, title: "Skill Growth Analytics", desc: "Measure improvement over time." },
  { icon: LayoutDashboard, title: "Unified Dashboard", desc: "All platforms in one place." },
  { icon: ShieldCheck, title: "Secure Records", desc: "Enterprise-grade privacy." },
  { icon: Gift, title: "Free Access", desc: "Zero cost for participating students." },
];

const FeatureGrid = () => (
  <Stagger className="mt-20 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5" step={0.05}>
    {features.map(({ icon: Icon, title, desc }) => (
      <StaggerItem
        key={title}
        className="group relative flex flex-col items-start gap-4 overflow-hidden rounded-2xl border border-border bg-card/30 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-card hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:hover:shadow-[0_8px_30px_hsl(var(--primary)/0.1)]"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-lg bg-surface-strong text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground shadow-sm">
          <Icon className="h-5 w-5" />
        </div>
        <div className="relative z-10">
          <h4 className="text-small font-semibold text-foreground">{title}</h4>
          <p className="mt-1 text-micro text-muted-foreground">{desc}</p>
        </div>
      </StaggerItem>
    ))}
  </Stagger>
);

// ----------------------------------------------------------------------
// 3. BENEFITS
// ----------------------------------------------------------------------
const benefits = [
  { icon: Rocket, text: "Crack Product Company Interviews" },
  { icon: LineChart, text: "Understand Your Growth" },
  { icon: Trophy, text: "Showcase Coding Journey" },
  { icon: Briefcase, text: "Build Placement Portfolio" },
  { icon: Target, text: "Stay Consistent" },
  { icon: BarChart2, text: "Measure Improvement" },
];

const BenefitsSection = () => (
  <div className="mt-32">
    <Reveal>
      <div className="text-center">
        <h3 className="text-h3 text-foreground">Why Students Love CodeKrack</h3>
        <p className="mt-3 text-lead text-muted-foreground">Shift from aimless practicing to targeted preparation.</p>
      </div>
    </Reveal>
    <Stagger className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" step={0.1}>
      {benefits.map(({ icon: Icon, text }) => (
        <StaggerItem
          key={text}
          className="flex items-center gap-4 rounded-full border border-border/60 bg-surface px-6 py-4 shadow-sm"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </div>
          <span className="font-medium text-foreground">{text}</span>
        </StaggerItem>
      ))}
    </Stagger>
  </div>
);

// ----------------------------------------------------------------------
// 4. PLATFORM INTEGRATION
// ----------------------------------------------------------------------
const PlatformIntegration = () => (
  <Reveal className="mt-32">
    <div className="relative rounded-3xl border border-border/50 bg-surface p-10 text-center shadow-lg overflow-hidden">
      {/* Background blobs for premium feel */}
      <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-[80px]" />
      <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-accent/10 blur-[80px]" />

      <h3 className="text-h3 text-foreground">One Dashboard for Every Platform</h3>
      <p className="mt-3 mx-auto max-w-measure-sm text-lead text-muted-foreground">
        We automatically sync your achievements across the platforms that matter most to recruiters.
      </p>

      <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-12">
        <div className="flex flex-wrap justify-center gap-4 sm:flex-col">
          <div className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-2 shadow-sm">
            <Code2 className="h-5 w-5 text-amber-500" />
            <span className="font-semibold text-foreground">LeetCode</span>
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-2 shadow-sm">
            <Github className="h-5 w-5 text-foreground" />
            <span className="font-semibold text-foreground">GitHub</span>
          </div>
        </div>

        {/* Animated connection arrows (visual only) */}
        <div className="hidden flex-col gap-2 text-border sm:flex">
          <span className="h-0.5 w-16 bg-gradient-to-r from-border to-primary" />
          <span className="h-0.5 w-16 bg-gradient-to-r from-border to-primary" />
        </div>
        <div className="flex items-center justify-center text-primary sm:hidden">
          <ArrowRight className="h-6 w-6 rotate-90 sm:rotate-0" />
        </div>

        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent shadow-xl ring-8 ring-primary/20">
          <LayoutDashboard className="h-10 w-10 text-white" />
        </div>

        <div className="hidden flex-col gap-2 text-border sm:flex">
          <span className="h-0.5 w-16 bg-gradient-to-l from-border to-primary" />
          <span className="h-0.5 w-16 bg-gradient-to-l from-border to-primary" />
        </div>
        <div className="flex items-center justify-center text-primary sm:hidden">
          <ArrowRight className="h-6 w-6 rotate-90 sm:rotate-0" />
        </div>

        <div className="flex flex-wrap justify-center gap-4 sm:flex-col">
          <div className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-2 shadow-sm">
            <Terminal className="h-5 w-5 text-green-500" />
            <span className="font-semibold text-foreground">HackerRank</span>
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-2 shadow-sm">
            <Linkedin className="h-5 w-5 text-blue-500" />
            <span className="font-semibold text-foreground">LinkedIn</span>
          </div>
        </div>
      </div>
    </div>
  </Reveal>
);

// ----------------------------------------------------------------------
// 5. MAIN COMPONENT (EXPORTED)
// ----------------------------------------------------------------------
export const CodeKrackCard = () => (
  <Section tone="default" aria-labelledby="codekrack-heading" className="overflow-hidden pb-24 pt-16 sm:pt-24">
    <Container>
      {/* 1. HERO SEGMENT */}
      <div className="relative text-center">
        {/* Soft glow in background */}
        <div className="absolute left-1/2 top-0 -z-10 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-primary/20 blur-[100px]" />

        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-micro font-medium text-primary shadow-sm backdrop-blur">
            <Rocket className="h-3.5 w-3.5" />
            A Product of Syasan's Career Analytics
          </div>
          <h2 id="codekrack-heading" className="mt-8 text-display text-foreground tracking-tight">
            CodeKrack <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">One Dashboard.</span> <br />
            All Coding Profiles.
          </h2>
          <p className="mx-auto mt-6 max-w-measure text-lead text-muted-foreground leading-relaxed">
            CodeKrack unifies coding achievements from multiple platforms into a single, intelligent, placement-focused analytics dashboard. Track progress, showcase achievements, and monitor continuous skill growth in real-time.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={CODEKRACK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ size: "lg" }),
                "group shadow-lg hover:shadow-primary/25"
              )}
            >
              Explore CodeKrack
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>

        <Reveal variant="scale-in" className="delay-150">
          <ImageFrame
            src={CodeKrackDashboardImg}
            alt="CodeKrack Dashboard — unified analytics platform"
          />
        </Reveal>
      </div>

      <FeatureGrid />
      <BenefitsSection />
      <PlatformIntegration />

      {/* 6. CTA SECTION */}
      <Reveal className="mt-32">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-foreground px-6 py-20 text-center shadow-2xl sm:px-12 sm:py-24">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_0%,hsl(var(--background)),transparent_70%)]" />
          <div className="relative z-10">
            <h2 className="text-h2 text-background">Ready to Build Your Placement Profile?</h2>
            <p className="mx-auto mt-6 max-w-measure text-lead text-muted-foreground/80">
              Join thousands of students building their tech careers with our unified coding analytics platform.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={CODEKRACK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ size: "lg", variant: "default" }),
                  "w-full sm:w-auto text-primary bg-background hover:bg-background/90"
                )}
              >
                Explore CodeKrack
              </a>
              <a
                href={CODEKRACK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "w-full sm:w-auto border-background/20 text-background hover:bg-background/10 hover:text-background"
                )}
              >
                Start Tracking Today
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </Container>
  </Section>
);
