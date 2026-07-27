import { ArrowRight, ArrowUpRight, Award, Briefcase, Mail, MapPin, Phone, Users } from "lucide-react";
import { useId, useState, type ChangeEvent, type FormEvent } from "react";

import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/layout/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IconTile } from "@/components/ui/icon-tile";
import { Input } from "@/components/ui/input";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { Container, Section, SectionHeader } from "@/components/ui/section";
import { Textarea } from "@/components/ui/textarea";
import { contact } from "@/config/site";
import { cn } from "@/lib/utils";

const benefits = [
  {
    title: "Career growth",
    description: "Opportunities for professional development and advancement, not just a syllabus.",
    icon: Briefcase,
  },
  {
    title: "Industry experts",
    description: "Learn from practitioners who still ship, teach and hire in their field.",
    icon: Award,
  },
  {
    title: "Supportive community",
    description: "A network of peers and mentors who stay reachable after the programme ends.",
    icon: Users,
  },
];

type Field = "name" | "email" | "phone" | "message";
type FormState = Record<Field, string>;
type Errors = Partial<Record<Field, string>>;

type FieldConfig = {
  type?: "text" | "email" | "tel";
  autoComplete?: string;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  optional?: boolean;
};

const EMPTY: FormState = { name: "", email: "", phone: "", message: "" };

/**
 * Client-side validation.
 *
 * The previous form relied entirely on the `required` attribute and then
 * handed off to `mailto:`, so a typo'd address produced a silently
 * undeliverable message with no feedback. Validating here means the visitor
 * finds out before their mail client opens.
 */
const validate = ({ name, email, phone, message }: FormState): Errors => {
  const errors: Errors = {};

  if (name.trim().length < 2) errors.name = "Please enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()))
    errors.email = "Please enter a valid email address.";
  if (phone.trim() && !/^[+\d][\d\s()-]{6,19}$/.test(phone.trim()))
    errors.phone = "Please enter a valid phone number, or leave this blank.";
  if (message.trim().length < 10)
    errors.message = "Please tell us a little more — at least a sentence.";

  return errors;
};

export default function Join() {
  const formId = useId();
  const [values, setValues] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const setField = (field: Field) => (value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    // Clear an error as soon as the visitor starts fixing it, rather than
    // making them submit again to find out.
    setErrors((current) => (current[field] ? { ...current, [field]: undefined } : current));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      // Move the visitor to the first thing that needs their attention.
      const firstField = (Object.keys(nextErrors) as Field[])[0];
      document.getElementById(`${formId}-${firstField}`)?.focus();
      return;
    }

    const subject = `Enquiry from ${values.name.trim()}`;
    const body = [
      `Name: ${values.name.trim()}`,
      `Email: ${values.email.trim()}`,
      `Phone: ${values.phone.trim() || "—"}`,
      "",
      values.message.trim(),
    ].join("\r\n");

    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    setSubmitted(true);
    setValues(EMPTY);
  };

  /**
   * One field renderer, so label association, error wiring, invalid styling
   * and spacing are identical across every input and cannot drift.
   */
  const renderField = (field: Field, label: string, config: FieldConfig) => {
    const id = `${formId}-${field}`;
    const errorId = `${id}-error`;
    const error = errors[field];

    const shared = {
      id,
      name: field,
      value: values[field],
      placeholder: config.placeholder,
      "aria-invalid": Boolean(error),
      "aria-describedby": error ? errorId : undefined,
      className: cn(error && "border-destructive focus-visible:ring-destructive"),
      onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setField(field)(event.target.value),
    };

    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={id} className="text-caption font-medium text-foreground">
          {label}
          {config.optional ? (
            <span className="ml-1.5 font-normal text-muted-foreground">(optional)</span>
          ) : null}
        </label>

        {config.multiline ? (
          <Textarea {...shared} rows={config.rows ?? 5} />
        ) : (
          <Input {...shared} type={config.type ?? "text"} autoComplete={config.autoComplete} />
        )}

        {error ? (
          <p id={errorId} className="text-caption text-destructive">
            {error}
          </p>
        ) : null}
      </div>
    );
  };

  return (
    <PageLayout>
      <Seo
        title="Join us — Syasan's Career Analytics"
        description="Partner with Syasan's Career Analytics, or join our team. Contact our Chennai office by phone, email or the enquiry form."
      />

      <PageHero
        title="Join our growing"
        highlight="community"
        description="Whether you run a placement cell, teach, or want to build your own career — this is where the conversation starts."
      />

      {/* Why join */}
      <Section tone="default" aria-labelledby="benefits-heading">
        <Container className="flex flex-col gap-14">
          <SectionHeader
            id="benefits-heading"
            title="Why join Syasan's"
            description="We're committed to nurturing talent and providing the best learning experience available."
          />

          <Stagger className="grid gap-6 md:grid-cols-3">
            {benefits.map(({ title, description, icon: Icon }) => (
              <StaggerItem key={title} className="h-full">
                <Card interactive className="group h-full p-7">
                  <IconTile icon={<Icon />} interactive />
                  <h3 className="mt-5 text-h4 text-foreground">{title}</h3>
                  <p className="mt-2.5 text-caption leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* Contact */}
      <Section tone="surface" aria-labelledby="contact-heading">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
            {/* Form */}
            <Reveal>
              <Card className="p-8 sm:p-10">
                <h2 id="contact-heading" className="text-h3 text-foreground">
                  Ready to start?
                </h2>
                <p className="mt-2 text-caption leading-relaxed text-muted-foreground">
                  Fill this in and our team will come back to you within one working day.
                </p>

                <form onSubmit={handleSubmit} noValidate className="mt-8 flex flex-col gap-5">
                  {renderField("name", "Full name", {
                    type: "text",
                    autoComplete: "name",
                    placeholder: "Your name",
                  })}
                  {renderField("email", "Email address", {
                    type: "email",
                    autoComplete: "email",
                    placeholder: "you@institution.edu",
                  })}
                  {renderField("phone", "Phone number", {
                    type: "tel",
                    autoComplete: "tel",
                    placeholder: "+91 98765 43210",
                    optional: true,
                  })}
                  {renderField("message", "Your message", {
                    multiline: true,
                    rows: 5,
                    placeholder: "Tell us about your institution, your cohort and what you're trying to solve.",
                  })}

                  <Button type="submit" size="lg" className="group mt-1 w-full">
                    Send your enquiry
                    <ArrowRight
                      aria-hidden
                      className="transition-transform duration-base ease-out group-hover:translate-x-0.5"
                    />
                  </Button>

                  {/*
                    `role="status"` so the confirmation is announced when it
                    appears. Previously the result was a plain div that screen
                    readers never surfaced.
                  */}
                  <p
                    role="status"
                    aria-live="polite"
                    className={cn(
                      "text-caption leading-relaxed",
                      submitted ? "text-success" : "text-muted-foreground",
                    )}
                  >
                    {submitted
                      ? "Your email client is opening with the message pre-filled — send it and we'll take it from there."
                      : "This opens your email client with the message pre-filled. Nothing is sent until you press send."}
                  </p>
                </form>
              </Card>
            </Reveal>

            {/* Direct contact */}
            <Reveal delay={0.08} className="flex flex-col gap-5">
              <Card className="p-8 sm:p-10">
                <h2 className="text-h3 text-foreground">Or reach us directly</h2>
                <p className="mt-2 text-caption leading-relaxed text-muted-foreground">
                  We&rsquo;re here to help and answer any question you have.
                </p>

                <ul className="mt-7 flex flex-col gap-6">
                  <li className="flex gap-4">
                    <IconTile icon={<Phone />} />
                    <div>
                      <h3 className="text-caption font-semibold text-foreground">Call us</h3>
                      <div className="mt-1.5 flex flex-col gap-1">
                        {contact.phones.map((phone) => (
                          <a
                            key={phone.href}
                            href={phone.href}
                            className="text-caption text-muted-foreground transition-colors duration-base hover:text-primary"
                          >
                            {phone.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </li>

                  <li className="flex gap-4">
                    <IconTile icon={<Mail />} />
                    <div>
                      <h3 className="text-caption font-semibold text-foreground">Email us</h3>
                      <a
                        href={`mailto:${contact.email}`}
                        className="mt-1.5 block text-caption text-muted-foreground transition-colors duration-base hover:text-primary"
                      >
                        {contact.email}
                      </a>
                      <p className="mt-1 text-caption text-muted-foreground">
                        We typically respond within 24 hours.
                      </p>
                    </div>
                  </li>

                  <li className="flex gap-4">
                    <IconTile icon={<MapPin />} />
                    <div>
                      <h3 className="text-caption font-semibold text-foreground">Our location</h3>
                      <address className="mt-1.5 not-italic text-caption leading-relaxed text-muted-foreground">
                        {contact.address.lines.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </address>
                      <a
                        href={contact.address.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2.5 inline-flex items-center gap-1 text-caption font-medium text-primary hover:underline"
                      >
                        View on map
                        <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </li>
                </ul>
              </Card>
            </Reveal>
          </div>
        </Container>
      </Section>
    </PageLayout>
  );
}
