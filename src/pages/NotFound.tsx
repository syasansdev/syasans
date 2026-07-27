import { ArrowLeft, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { Seo } from "@/components/Seo";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/section";
import { allNavLinks } from "@/config/site";

const NotFound = () => {
  const { pathname } = useLocation();

  return (
    <PageLayout>
      <Seo
        title="Page not found — Syasan's Career Analytics"
        description="The page you were looking for doesn't exist."
        noIndex
      />

      <Section tone="surface" size="lg" className="flex min-h-[70vh] items-center pt-28 sm:pt-32">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid" />

        <Container className="flex flex-col items-center text-center">
          <p className="font-mono text-overline uppercase text-muted-foreground">404</p>

          <h1 className="mt-5 max-w-2xl text-h1 text-foreground">
            We couldn&rsquo;t find that page
          </h1>

          <p className="mt-5 max-w-measure text-lead text-muted-foreground">
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-caption text-foreground">
              {pathname}
            </code>{" "}
            doesn&rsquo;t exist &mdash; it may have moved, or the link may be out of date.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link to="/">
                <Home aria-hidden />
                Back to the homepage
              </Link>
            </Button>
            <Button size="lg" variant="outline" onClick={() => window.history.back()}>
              <ArrowLeft aria-hidden />
              Go back
            </Button>
          </div>

          {/* A dead end is the worst possible outcome here; offer every real
              destination rather than a single "home" link. */}
          <nav aria-label="Site pages" className="mt-14 w-full max-w-2xl">
            <h2 className="text-overline uppercase text-muted-foreground">
              Or try one of these
            </h2>
            <ul className="mt-5 flex flex-wrap justify-center gap-2">
              {allNavLinks.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="inline-flex rounded-full border border-border bg-card px-4 py-2 text-caption text-muted-foreground transition-colors duration-base ease-out hover:border-primary/30 hover:bg-primary-soft hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </Section>
    </PageLayout>
  );
};

export default NotFound;
