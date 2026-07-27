import {
  Award,
  BarChart3,
  BookOpen,
  Briefcase,
  ClipboardCheck,
  GaugeCircle,
  GraduationCap,
  LineChart,
  Map,
  Puzzle,
  Target,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Hero                                                                       */
/* -------------------------------------------------------------------------- */

/**
 * The headline.
 *
 * The positioning claim, stated directly. An earlier pass replaced it with an
 * outcome line ("Know who's ready. Build the rest.") on the reasoning that a
 * category claim describes us rather than the reader's problem; that call has
 * been reversed deliberately, and this is the line the site leads with.
 *
 * It splits across two elements rather than wrapping as one string because the
 * two halves do different work: "Tamil Nadu's Largest" is the scale claim, and
 * the accent carries what is actually being claimed to be largest. Colour marks
 * that boundary, so the eye takes the superlative and the category as two
 * beats instead of one long noun phrase.
 *
 * It is long — nine words against the previous five — so the hero balances the
 * wrap rather than forcing breaks inside the accent phrase. See `Hero`.
 */
export const heroCopy = {
  headline: "Tamil Nadu’s Largest",
  headlineAccent: "AI Integrated Industry Learning Ecosystem",
  subhead:
    "Every cohort starts with a psychometric and competency baseline, so training targets the gaps that are actually there — not a syllabus. You watch readiness move, student by student, through to the offer.",
  /** Scale as a countable fact, next to the claim it backs up. */
  scaleClaim: "300K+ students trained",
} as const;

/* -------------------------------------------------------------------------- */
/*  Trust                                                                      */
/* -------------------------------------------------------------------------- */

/**
 * Partner institutions.
 *
 * IMPORTANT — why these carry no image: the files in `public/assets` named
 * after each university (`Sathyabama.png`, `srm.png`, …) are photographs of
 * campus gates, not institutional marks. Reduced to a 40px logo-wall tile and
 * desaturated, a photograph of a building is unreadable — which is precisely
 * why the previous trust band read as noise.
 *
 * They are therefore presented as wordmarks. `logo` is optional and takes
 * precedence when present, so dropping real SVG crests into `public/assets`
 * and adding the path here is the only change needed to switch a row over.
 */
export type Institution = { name: string; location: string; logo?: string };

export const institutions: readonly Institution[] = [
  { name: "IIITDM Kancheepuram", location: "Chennai" },
  { name: "Madras Social Service Society", location: "Chennai" },
  { name: "Sathyabama University", location: "Chennai" },
  { name: "SRM University", location: "Kattankulathur" },
  { name: "BSA Crescent University", location: "Vandalur" },
  { name: "Sairam Institutions", location: "West Tambaram" },
  { name: "Kalasalingam University", location: "Virudhunagar" },
  { name: "Vels University", location: "Pallavaram" },
  { name: "LEAD College (Autonomous)", location: "Palakkad, Kerala" },
  { name: "Acharya Institute of Technology", location: "Bengaluru, Karnataka" },
  { name: "D.G. Vaishnav College", location: "Arumbakkam" },
  { name: "St. Joseph's College", location: "Chennai" },
  { name: "Jeppiaar University", location: "Chennai" },
  { name: "Velammal Colleges", location: "Chennai / Madurai" },
  { name: "Amity Global Business School", location: "Chennai" },
  { name: "Dhanalakshmi Srinivasan", location: "Trichy" },
];

/**
 * Recruiters our alumni join.
 *
 * These *are* genuine logos — but they are raster PNGs on opaque white
 * backgrounds, not transparent SVGs. That drives the presentation: each sits
 * on its own light tile so it renders correctly in both themes. Inverting
 * them for dark mode (as the first pass did) turns the white plate black and
 * destroys the mark.
 */
export type Recruiter = { src: string; name: string };

export const recruiters: readonly Recruiter[] = [
  { src: "/assets/zoho.png", name: "Zoho" },
  { src: "/assets/cognizant.png", name: "Cognizant" },
  { src: "/assets/Deloitte.png", name: "Deloitte" },
  { src: "/assets/cisco.png", name: "Cisco" },
  { src: "/assets/tata.png", name: "Tata Elxsi" },
  { src: "/assets/ey.png", name: "EY" },
  { src: "/assets/ltimindtree.png", name: "LTIMindtree" },
  { src: "/assets/thoughtworks.png", name: "Thoughtworks" },
  { src: "/assets/mahindra.png", name: "Mahindra" },
  { src: "/assets/valeo.png", name: "Valeo" },
  { src: "/assets/presidio.png", name: "Presidio" },
  { src: "/assets/mrcooper.png", name: "Mr. Cooper" },
  { src: "/assets/avasoft.png", name: "Avasoft" },
  { src: "/assets/hashedin.png", name: "HashedIn by Deloitte" },
  { src: "/assets/Blackstraw.png", name: "Blackstraw AI" },
];

export const accreditations = [
  { src: "/assets/iso_cert.png", alt: "ISO 9001:2015 certified" },
  { src: "/assets/msme.png", alt: "MSME registered" },
  { src: "/assets/tamilnadu-logo.png", alt: "Government of Tamil Nadu recognised" },
  { src: "/assets/IOE.png", alt: "Institution of Engineers (India)" },
] as const;

/* -------------------------------------------------------------------------- */
/*  Problem                                                                    */
/* -------------------------------------------------------------------------- */

export type Point = { title: string; description: string; icon: LucideIcon };

/**
 * Framing drawn from the existing "About Syasan's" copy: employers expect
 * behavioural maturity, digital proficiency and workplace readiness, and most
 * institutions have no instrument to measure any of the three.
 */
export const problems: readonly Point[] = [
  {
    title: "Skill gaps stay invisible",
    description:
      "Marks measure recall, not readiness. Without psychometric and competency data, a department only discovers who was unprepared after the offer letters stop arriving.",
    icon: Puzzle,
  },
  {
    title: "Training is generic",
    description:
      "Off-the-shelf syllabi treat a final-year CSE cohort and a first-year mechanical cohort identically, so the strongest students are bored and the weakest are lost.",
    icon: Target,
  },
  {
    title: "Outcomes go unmeasured",
    description:
      "Attendance sheets and feedback forms cannot tell a placement cell which intervention moved conversion — so next year's plan is guesswork again.",
    icon: GaugeCircle,
  },
];

/* -------------------------------------------------------------------------- */
/*  Solution                                                                   */
/* -------------------------------------------------------------------------- */

export const solutionSteps: readonly Point[] = [
  {
    title: "Measure",
    description:
      "Psychometrics, competency mapping and behavioural analysis establish a per-student baseline before a single session is scheduled.",
    icon: ClipboardCheck,
  },
  {
    title: "Tailor",
    description:
      "Curriculum designers build the cohort's learning path from that baseline — technical depth, aptitude and behaviour weighted to the gaps that are actually there.",
    icon: Puzzle,
  },
  {
    title: "Prove",
    description:
      "Institutional dashboards track participation, progression and placement conversion live, so every decision after the first is evidence-led.",
    icon: LineChart,
  },
];

/* -------------------------------------------------------------------------- */
/*  Features                                                                   */
/* -------------------------------------------------------------------------- */

export type Feature = Point & { image: string };

export const features: readonly Feature[] = [
  {
    title: "Career training",
    description:
      "Industry-designed programmes that build technical depth and market value, delivered inside your campus.",
    icon: BookOpen,
    image: "/assets/Classroom_setting.jpg",
  },
  {
    title: "Mentorship",
    description:
      "One-to-one guidance from mentors who have each oriented tens of thousands of students across India.",
    icon: Users,
    image: "/assets/mentorship.jpg",
  },
  {
    title: "Certification support",
    description:
      "Recognised certifications that validate capability to recruiters rather than restating a transcript.",
    icon: Award,
    image: "/assets/certifications_support.jpg",
  },
  {
    title: "Career analytics",
    description:
      "Progress, cohort benchmarks and readiness scores in one dashboard, exportable for academic review.",
    icon: TrendingUp,
    image: "/assets/career_analytics.jpg",
  },
  {
    title: "Placement support",
    description:
      "Dedicated placement assistance backed by our recruiter network and a decade of conversion data.",
    icon: Briefcase,
    image: "/assets/Job_offer.jpg",
  },
  {
    title: "Pool campus drives",
    description:
      "Large-scale recruitment events that bring multiple institutions and top-tier recruiters into one room.",
    icon: GraduationCap,
    image: "/assets/Discussion.jpg",
  },
];

/* -------------------------------------------------------------------------- */
/*  Benefits / metrics                                                         */
/* -------------------------------------------------------------------------- */

export type Metric = { value: number | string; suffix?: string; label: string };

/** The four headline numbers. */
export const primaryMetrics: readonly Metric[] = [
  { value: 300, suffix: "K+", label: "Students trained" },
  { value: 89, suffix: "%", label: "Career success rate" },
  { value: 100, suffix: "+", label: "Expert mentors" },
  { value: 20, suffix: "+", label: "Learning centres" },
];

/** Supporting numbers, rendered quietly so they support rather than compete. */
export const secondaryMetrics: readonly Metric[] = [
  { value: 10, suffix: "+", label: "Years' experience" },
  { value: 50, suffix: "+", label: "Corporate clients" },
  { value: 6, suffix: "K+", label: "Training batches" },
  { value: 30, suffix: "K+", label: "Training hours" },
  { value: 99, suffix: "%", label: "Project success" },
  { value: 94, suffix: "%", label: "Client retention" },
  { value: 50, suffix: "+", label: "Pool drives" },
  { value: 30, suffix: "+", label: "MoUs signed" },
];

export const rating = { score: "4.5", outOf: "5.0", count: "88K" } as const;

/* -------------------------------------------------------------------------- */
/*  Workflow                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * A four-beat summary of the fourteen-step delivery framework detailed on
 * `/training-journey`. The homepage's job is to make the shape legible, not
 * to reproduce the whole document.
 */
export const workflow: readonly (Point & { steps: string })[] = [
  {
    title: "Analyse",
    steps: "Steps 01–03",
    description:
      "Training-need analysis, gap identification and a curriculum customised to your cohort and calendar.",
    icon: BarChart3,
  },
  {
    title: "Plan",
    steps: "Steps 04–07",
    description:
      "Curriculum sign-off, scheduling, a day-by-day delivery plan and every prerequisite provisioned before day one.",
    icon: Map,
  },
  {
    title: "Deliver",
    steps: "Steps 08–09",
    description:
      "Our research-based experiential pedagogy, followed by post-training assessment of retention and technical growth.",
    icon: BookOpen,
  },
  {
    title: "Prove",
    steps: "Steps 10–14",
    description:
      "Feedback, a performance analysis report for your management, recognition for top performers and ongoing mentoring.",
    icon: Award,
  },
];

/* -------------------------------------------------------------------------- */
/*  FAQ                                                                        */
/* -------------------------------------------------------------------------- */

export const faqs: readonly { question: string; answer: string }[] = [
  {
    question: "Who do you work with — institutions or individual students?",
    answer:
      "Primarily institutions. We build Integrated Learning Centres inside partner campuses and run programmes for their cohorts, with analytics reported back to the placement cell and management. Students reach us through their college, our learning centres and our pool campus drives.",
  },
  {
    question: "How is a programme built for our cohort?",
    answer:
      "Every engagement opens with a training-need analysis: psychometrics, competency mapping and behavioural assessment establish where the cohort actually stands. The curriculum is then built against those findings and signed off with you before dates are locked. The full fourteen-step framework is documented on the Training Journey page.",
  },
  {
    question: "What do we see while a programme is running?",
    answer:
      "An institutional dashboard covering live participation, individual and cohort performance benchmarks, progression across learning phases, and exportable reports for academic and management review.",
  },
  {
    question: "Which subjects and technologies are covered?",
    answer:
      "Aptitude and competitive-exam preparation, full-stack development, machine learning, agentic AI, cybersecurity, DevOps, cloud, big data, UI/UX and more — alongside the behavioural and communication training that campus-to-corporate transitions depend on.",
  },
  {
    question: "Are you accredited?",
    answer:
      "Syasan's is an ISO 9001 certified, MSME-registered institution. Our course content is approved by the TN Text Book Corporation, and our work has been recognised by the Government of Tamil Nadu — including India's first Mobile Training Institute under the Rural Connect Programme.",
  },
  {
    question: "Do you work outside Tamil Nadu?",
    answer:
      "Yes. Our learning centres are concentrated across Tamil Nadu, and we have trained students and placed talent with organisations pan-India.",
  },
];
