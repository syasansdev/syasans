import { ExternalLink } from "lucide-react";

import { Seo } from "@/components/Seo";
import { ClosingCta } from "@/components/layout/ClosingCta";
import { PageHero } from "@/components/layout/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card } from "@/components/ui/card";
import { Stagger, StaggerItem } from "@/components/ui/reveal";
import { AmbientBackdrop, Container, Section, SectionHeader } from "@/components/ui/section";

const associations = [
  { src: "/assets/iso_cert.png", alt: "ISO 9001:2015 certification mark", title: "ISO 9001:2015" },
  { src: "/assets/msme.png", alt: "MSME registration mark", title: "MSME registered" },
  {
    src: "/assets/tamilnadu-logo.png",
    alt: "Tamil Nadu Text Book Corporation emblem",
    title: "TN Text Book Corporation approved",
  },
  {
    src: "/assets/Government-Of-Tamil-Nadu-Logo-Vector.svg--1397x1536.png",
    alt: "Government of Tamil Nadu emblem",
    title: "Govt. of Tamil Nadu recognised",
  },
  {
    src: "/assets/IOE.png",
    alt: "Institution of Engineers (India) emblem",
    title: "Institution of Engineers (India)",
  },
];

const certificates = [
  { src: "/assets/Certificate.jpg", label: "Quality certification" },
  { src: "/assets/Picture1.jpg", label: "Government recognition" },
  { src: "/assets/Picture2.jpg", label: "Ministry commendation" },
  { src: "/assets/Picture3.jpg", label: "Programme endorsement" },
  { src: "/assets/Picture4.jpg", label: "Institutional award" },
];

export default function Endorsement() {
  return (
    <PageLayout>
      <Seo
        title="Endorsements & accreditation — Syasan's Career Analytics"
        description="ISO 9001 certification, MSME registration and Government of Tamil Nadu recognition behind Syasan's Career Analytics."
      />

      <PageHero
        title="Credentials that"
        highlight="stand up to scrutiny"
        description="The certifications, approvals and government recognitions behind every programme we deliver."
      />

      {/* Associations */}
      <Section tone="default" aria-labelledby="associations-heading">
        <AmbientBackdrop />

        <Container className="flex flex-col gap-14">
          <SectionHeader
            id="associations-heading"
            title="Our associations"
            description="Independently issued marks, not self-declared badges."
          />

          <Stagger className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5">
            {associations.map(({ src, alt, title }) => (
              <StaggerItem key={title}>
                <Card
                  interactive
                  className="flex h-full flex-col items-center justify-between gap-5 p-7 text-center"
                >
                  <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-surface p-3 sm:h-28 sm:w-28">
                    <img
                      src={src}
                      alt={alt}
                      loading="lazy"
                      decoding="async"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <p className="text-caption font-semibold leading-snug text-foreground">{title}</p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* Certificates */}
      <Section tone="surface" aria-labelledby="certificates-heading">
        <Container className="flex flex-col gap-14">
          <SectionHeader
            id="certificates-heading"
            title="Our recognitions"
            description="Trusted by government bodies for our commitment to quality in education and training."
          />

          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {certificates.map(({ src, label }) => (
              <StaggerItem key={src}>
                {/*
                  The overlay used to be the only route to the full-size scan,
                  which made it unreachable by keyboard and invisible on touch.
                  The whole card is now the link, and the overlay is a hover
                  affordance rather than the mechanism.
                */}
                <a
                  href={src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block h-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-[box-shadow,border-color,transform] duration-base ease-out hover:-translate-y-1 hover:border-primary/25 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <div className="relative overflow-hidden bg-surface-strong">
                    <img
                      src={src}
                      alt={label}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-slower ease-out group-hover:scale-[1.04]"
                    />
                    <span
                      aria-hidden
                      className="absolute inset-0 bg-foreground/45 opacity-0 transition-opacity duration-base group-hover:opacity-100"
                    />
                  </div>

                  <span className="flex items-center justify-between gap-3 p-5">
                    <span className="text-caption font-medium text-foreground">{label}</span>
                    <span className="flex items-center gap-1.5 text-caption text-primary">
                      View full size
                      <ExternalLink aria-hidden className="h-3.5 w-3.5" />
                    </span>
                  </span>
                </a>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      <ClosingCta
        title="Work with an accredited partner"
        description="Tell us about your institution and we'll show you exactly how a programme would run — and what you'd get back."
      />
    </PageLayout>
  );
}
