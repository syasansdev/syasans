import { Quote } from "lucide-react";

import { Marquee } from "@/components/ui/marquee";
import { testimonials, toRows, type Testimonial } from "@/content/testimonials";

const TestimonialCard = ({ quote, author }: Testimonial) => (
  <figure className="mx-3 flex h-44 w-[19rem] shrink-0 flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-sm transition-[box-shadow,border-color] duration-base ease-out hover:border-primary/25 hover:shadow-md sm:w-[21rem]">
    <Quote aria-hidden className="h-4 w-4 shrink-0 text-primary/40" />

    <blockquote className="mt-2 flex-1 text-caption leading-relaxed text-foreground/85">
      {quote}
    </blockquote>

    <figcaption className="mt-4 flex items-center gap-3 border-t border-border pt-3.5">
      <span
        aria-hidden
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-soft text-caption font-semibold text-primary"
      >
        {author.charAt(0)}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-caption font-semibold text-foreground">{author}</span>
        <span className="block text-micro uppercase tracking-wider text-muted-foreground">
          Google Review
        </span>
      </span>
    </figcaption>
  </figure>
);

/**
 * The testimonial wall, shared by the homepage band and the Feedback page.
 *
 * Rows scroll in alternating directions at slightly different speeds, which
 * reads as texture rather than as three copies of the same animation. Hovering
 * or tabbing into the wall pauses every row (see `.marquee-group`), because a
 * quote a reader cannot finish is not a testimonial.
 */
export const TestimonialWall = ({ rows = 3 }: { rows?: number }) => {
  const grouped = toRows(testimonials, rows);

  return (
    <div className="flex flex-col gap-5">
      {grouped.map((row, index) => (
        <Marquee
          key={index}
          duration={58 + index * 9}
          reverse={index % 2 === 1}
          // Rows are wider than the viewport by design; the container clips.
          className="-mx-5 sm:-mx-6 lg:-mx-8"
        >
          {row.map((testimonial) => (
            <TestimonialCard key={testimonial.author} {...testimonial} />
          ))}
        </Marquee>
      ))}
    </div>
  );
};
