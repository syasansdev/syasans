import { Facebook, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

import { Brand } from "@/components/layout/Brand";
import { Container } from "@/components/ui/section";
import { contact, navigation, primaryCta, siteConfig } from "@/config/site";

const socialIcons = {
  Facebook,
  X: Twitter,
  YouTube: Youtube,
} as const;

const socialLinks = [
  { label: "Facebook" as const, href: "https://www.facebook.com/SYASANS/about" },
  { label: "X" as const, href: "https://x.com/SyasansCA" },
  { label: "YouTube" as const, href: "https://www.youtube.com/@SyasansCareerAnalytics" },
];

/**
 * The site footer.
 *
 * Replaces a three-icon strip and a copyright line. A footer is the second
 * navigation surface of a marketing site — it is where visitors who did not
 * find what they wanted in the header go next — so it carries the full
 * sitemap, real contact details and the legal line.
 */
export const SiteFooter = () => (
  <footer className="border-t border-border bg-surface">
    <Container className="py-14 sm:py-16">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))] lg:gap-8">
        {/* Identity + contact */}
        <div className="flex flex-col gap-6">
          <Brand />

          <p className="max-w-measure-sm text-caption leading-relaxed text-muted-foreground">
            {siteConfig.description}
          </p>

          <ul className="flex flex-col gap-3 text-caption">
            <li className="flex items-start gap-2.5">
              <MapPin aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <address className="not-italic text-muted-foreground">
                {contact.address.lines.join(", ")}
              </address>
            </li>
            <li className="flex items-start gap-2.5">
              <Phone aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span className="flex flex-wrap gap-x-3 gap-y-1">
                {contact.phones.map((phone) => (
                  <a
                    key={phone.href}
                    href={phone.href}
                    className="text-muted-foreground transition-colors duration-base hover:text-primary"
                  >
                    {phone.label}
                  </a>
                ))}
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <a
                href={`mailto:${contact.email}`}
                className="text-muted-foreground transition-colors duration-base hover:text-primary"
              >
                {contact.email}
              </a>
            </li>
          </ul>

          <ul className="flex items-center gap-2">
            {socialLinks.map(({ label, href }) => {
              const Icon = socialIcons[label];
              return (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${siteConfig.name} on ${label}`}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors duration-base ease-out hover:border-primary/30 hover:bg-primary-soft hover:text-primary"
                  >
                    <Icon aria-hidden className="h-4 w-4" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Sitemap — mirrors the header groups exactly. */}
        {navigation.map((group) => (
          <nav key={group.label} aria-label={group.label} className="flex flex-col gap-4">
            <h2 className="text-overline uppercase text-foreground">{group.label}</h2>
            <ul className="flex flex-col gap-2.5">
              {group.items.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-caption text-muted-foreground transition-colors duration-base hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              {group.label === "Company" ? (
                <li>
                  <Link
                    to={primaryCta.path}
                    className="text-caption text-muted-foreground transition-colors duration-base hover:text-primary"
                  >
                    {primaryCta.label}
                  </Link>
                </li>
              ) : null}
            </ul>
          </nav>
        ))}
      </div>

      <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-caption text-muted-foreground sm:flex-row">
        <p className="flex flex-wrap items-center justify-center gap-1">
          <span>&copy; {new Date().getFullYear()}</span>
          <span className="inline-flex items-center font-semibold text-foreground">
            {siteConfig.name}
            <span
              title="Registered trademark"
              className="ml-1 inline-flex h-3.5 w-3.5 select-none items-center justify-center rounded-full border border-border-strong text-[0.5rem] font-black leading-none"
            >
              R
            </span>
          </span>
          <span>{siteConfig.tagline}. All rights reserved.</span>
        </p>

        <p>An ISO 9001 certified, MSME-registered institution.</p>
      </div>
    </Container>
  </footer>
);
