import { Stagger, StaggerItem } from "@/components/ui/reveal";
import { Container, Section, SectionHeader } from "@/components/ui/section";
import { institutions, recruiters } from "@/content/home";

/**
 * Group label. Quiet by design — these separate the two proofs without
 * competing with the section heading above them.
 */
const GroupLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-center text-overline uppercase text-muted-foreground">{children}</p>
);

/**
 * Trust.
 *
 * Two distinct proofs, in narrative order: where we teach, then where those
 * students end up. Mixing universities and employers into one undifferentiated
 * strip — as the previous version did — asked the visitor to work out which
 * was which, and answered neither question.
 *
 * Layout is a grid rather than a marquee. With this many marks a marquee never
 * shows the full set, can't be scanned, and puts perpetual motion directly
 * under the hero. A grid is calm, every mark is legible, and the alignment is
 * exact because each cell is the same size.
 *
 * Optical sizing note: constraining height alone is not enough when the set
 * mixes wide wordmarks (Deloitte, Thoughtworks) with near-square marks (Zoho,
 * EY). Each mark is bounded on *both* axes inside an identical cell, so wide
 * marks are limited by width and square marks by height, and every logo ends
 * up with comparable visual weight instead of comparable pixel height.
 */
export const TrustBand = () => (
  <Section tone="surface" size="md" aria-labelledby="trust-heading">
    <Container className="flex flex-col gap-14">
      <SectionHeader
        id="trust-heading"
        title="Trusted by leading institutions"
        description="A growing network of universities and global employers that rely on our training ecosystem."
      />

      {/* Institutions */}
      <div className="flex flex-col gap-6">
        <GroupLabel>Partner campuses</GroupLabel>

        <Stagger
          step={0.03}
          className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3 lg:grid-cols-4"
        >
          {institutions.map(({ name, location, logo }) => (
            <StaggerItem
              key={name}
              /* `bg-primary-soft/40` rather than `bg-background`: card and
                 background are the same white on the light theme, so hovering
                 would have produced no feedback at all. */
              className="group flex min-h-[6.5rem] flex-col items-center justify-center gap-1 bg-card px-4 py-6 text-center transition-[transform,background-color] duration-base ease-out hover:-translate-y-0.5 hover:bg-primary-soft/40"
            >
              {logo ? (
                <img
                  src={logo}
                  alt={name}
                  loading="lazy"
                  decoding="async"
                  className="max-h-9 max-w-[8rem] object-contain opacity-75 grayscale transition-[opacity,filter] duration-base ease-out group-hover:opacity-100 group-hover:grayscale-0"
                />
              ) : (
                <span className="font-display text-caption font-semibold leading-snug text-foreground/70 transition-colors duration-base ease-out group-hover:text-foreground sm:text-base">
                  {name}
                </span>
              )}
              <span className="text-micro text-muted-foreground">{location}</span>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      {/* Recruiters */}
      <div className="flex flex-col gap-6">
        <GroupLabel>Alumni hired at</GroupLabel>

        <Stagger
          step={0.03}
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        >
          {recruiters.map(({ src, name }) => (
            <StaggerItem
              key={src}
              /*
               * A light tile, in both themes. These marks ship as PNGs with an
               * opaque white plate baked in, so they cannot sit directly on a
               * dark surface — and inverting them would recolour the artwork.
               */
              className="group flex h-20 items-center justify-center rounded-xl bg-white px-5 ring-1 ring-inset ring-border/70 transition-[transform,box-shadow] duration-base ease-out hover:-translate-y-0.5 hover:shadow-sm"
            >
              <img
                src={src}
                alt={name}
                loading="lazy"
                decoding="async"
                className="max-h-10 max-w-full object-contain opacity-75 grayscale transition-[opacity,filter,transform] duration-base ease-out group-hover:scale-[1.03] group-hover:opacity-100 group-hover:grayscale-0"
              />
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      {/* Trust must survive images failing to load, so the claim is also
          stated in text. */}
      <p className="text-center text-caption text-muted-foreground">
        16 partner campuses across South India &middot; 50+ corporate clients &middot; 30+ MoUs
        signed
      </p>
    </Container>
  </Section>
);
