import { lazy, Suspense, type ReactNode } from "react";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { cn } from "@/lib/utils";

/**
 * The assistant is a leaf feature that talks to a third-party API. Deferring
 * it keeps its code and network layer out of the initial route chunk; it
 * mounts after hydration, in a corner, where nobody is waiting for it.
 */
const ChatBot = lazy(() => import("@/components/ChatBot"));

type PageLayoutProps = {
  children: ReactNode;
  className?: string;
};

/**
 * The shell every page renders inside.
 *
 * Previously each of the eleven pages hand-assembled `<Navigation />`, a
 * `<main>` (or, on four of them, no `<main>` at all), `<Footer />` and
 * sometimes `<ChatBot />`, with five different combinations of top padding to
 * clear the fixed header. Centralising it means the landmark structure and the
 * skip-link target are correct by construction.
 *
 * Top spacing is deliberately *not* applied here. Every page opens with a
 * `Hero` or `PageHero`, both of which run their backdrop up underneath the
 * translucent header and therefore own their own header clearance. Adding
 * padding here as well would double it.
 */
export const PageLayout = ({ children, className }: PageLayoutProps) => (
  <div className="flex min-h-screen flex-col bg-background text-foreground">
    <SiteHeader />

    <main id="main" className={cn("flex-1", className)}>
      {children}
    </main>

    <SiteFooter />

    <Suspense fallback={null}>
      <ChatBot />
    </Suspense>
  </div>
);
