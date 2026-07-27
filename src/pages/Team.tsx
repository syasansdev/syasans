import { Seo } from "@/components/Seo";
import { ClosingCta } from "@/components/layout/ClosingCta";
import { PageHero } from "@/components/layout/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card } from "@/components/ui/card";
import { MediaFrame } from "@/components/ui/media-frame";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { Container, Section, SectionHeader } from "@/components/ui/section";

const teamMembers = [
  { name: "Sankar E", role: "Chairman", image: "/assets/E_Sankar.jpg" },
  { name: "Youghessh S", role: "Co-Founder & CEO", image: "/assets/Youghessh_S.jpg" },
  { name: "Devibalan M", role: "Co-Founder & Director", image: "/assets/Devibalan_M.jpg" },
  { name: "Vishnu Priyan R", role: "Chief Innovation Officer", image: "/assets/Vishnu_Priyan_R.jpg" },
  { name: "Sakthi Priya G", role: "Culture & Capability Director", image: "/assets/Sakthi_Priya_G.jpg" },
  { name: "Kanimozhi D", role: "People Operations Director", image: "/assets/Kanimozhi.jpg" },
  { name: "Parthiban M", role: "Head — Future Technologies", image: "/assets/Parthiban_M.jpg" },
  { name: "Nithya Priya G", role: "Capability Manager", image: "/assets/Nithya_Priya_G.jpg" },
  { name: "Selvaraj", role: "Learning Ecosystem Manager", image: "/assets/Selvaraj.jpeg" },
  { name: "Gokula Krishnan G", role: "Squad Lead", image: "/assets/Gokula_Krishnan.jpg" },
  { name: "Geetha V", role: "Head of English (TOEFL, IELTS)", image: "/assets/Geetha_V.jpg" },
  { name: "Kamala P", role: "Technology Specialist", image: "/assets/Kamala.jpg" },
  { name: "Vanitha Purushothaman", role: "AI & Technology Strategist", image: "/assets/Vanitha.jpg" },
  { name: "Suganya S", role: "EdTech Innovation Lead", image: "/assets/Suganya.jpg" },
];

const credentials = [
  "Alumni of NIT, BITS, IIM Trichy, Sathyabama University and MSSW.",
  "Industry experience from Deloitte, UNICEF, BNP Paribas, Symantec, Bosch, Flextronics, HTC and Electronic Arts.",
  "Mentors who have cracked SBI, IBPS, SSC, RRB, CAT, TOEFL, GMAT, GATE and BEC.",
  "Expert coders across AI, augmented reality, UI/UX, blockchain, full-stack and big data.",
  "On average, each mentor has oriented 25,000+ students across India on domain-specific modules.",
];

export default function Team() {
  return (
    <PageLayout>
      <Seo
        title="Core team — Syasan's Career Analytics"
        description="Meet the academicians, industry experts and mentors behind Syasan's Career Analytics."
      />

      <PageHero
        title="The brains of"
        highlight="Syasan's"
        description="Propelled by professionals, mentored by masters — a team of academicians and industry practitioners behind every programme."
      />

      {/* Roster */}
      <Section tone="default" aria-labelledby="team-heading">
        <Container className="flex flex-col gap-14">
          <SectionHeader
            id="team-heading"
            title="Meet the core team"
            description="Fourteen people accountable for what happens in every classroom, lab and dashboard."
          />

          <Stagger
            step={0.04}
            className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
          >
            {teamMembers.map(({ name, role, image }) => (
              <StaggerItem key={name}>
                <Card interactive className="group h-full overflow-hidden">
                  <div className="aspect-[3/4] overflow-hidden bg-surface-strong">
                    <img
                      src={image}
                      alt={`${name}, ${role}`}
                      width={300}
                      height={400}
                      loading="lazy"
                      decoding="async"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      className="h-full w-full object-cover object-top transition-transform duration-slower ease-out group-hover:scale-[1.04]"
                      onError={(event) => {
                        const target = event.currentTarget;
                        target.onerror = null;
                        target.src = `https://ui-avatars.com/api/?background=random&name=${encodeURIComponent(name)}`;
                      }}
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-caption font-semibold text-foreground">{name}</h3>
                    <p className="mt-0.5 text-micro leading-snug text-muted-foreground">
                      {role}
                    </p>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal variant="scale-in">
            <MediaFrame className="mx-auto max-w-4xl">
              <img
                src="/assets/Group_Photo.jpeg"
                alt="The Syasan's Career Analytics team"
                width={1200}
                height={675}
                loading="lazy"
                decoding="async"
                className="aspect-video w-full object-cover"
              />
            </MediaFrame>
          </Reveal>
        </Container>
      </Section>

      {/* Endorsement quote */}
      <Section tone="surface" size="sm">
        <Container width="narrow">
          <Reveal>
            <figure className="rounded-3xl border border-border bg-card p-8 text-center shadow-sm sm:p-10">
              <blockquote className="text-lead italic text-foreground">
                &ldquo;I appreciate SYASAN&rsquo;S by virtue of having quality academicians and
                providing talents of the highest calibre to various organizations pan-India.&rdquo;
              </blockquote>
              <figcaption className="mt-6 text-caption font-semibold text-muted-foreground">
                &mdash; Ministry of Higher Education, 2018
              </figcaption>
            </figure>
          </Reveal>
        </Container>
      </Section>

      {/* Who Syasanites are */}
      <Section tone="default" aria-labelledby="syasanites-heading">
        <Container className="flex flex-col gap-14">
          <SectionHeader
            id="syasanites-heading"
            title="Syasanites are"
            description="The background every mentor brings into the room."
          />

          <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {credentials.map((item) => (
              <StaggerItem key={item}>
                <Card elevation="flat" className="flex h-full gap-3.5 bg-surface p-5">
                  <span aria-hidden className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  <p className="text-caption leading-relaxed text-muted-foreground">{item}</p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      <ClosingCta
        title="Talk to the people who'd run your programme"
        description="No sales layer. You speak to the mentors and capability leads who'd be in the room."
      />
    </PageLayout>
  );
}
