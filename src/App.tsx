import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ThemeProvider } from "@/components/ThemeProvider";

/**
 * The homepage is the overwhelmingly common entry point, so it ships in the
 * initial chunk. Every other route is split, which took the entry bundle from
 * one 646 KB file to a small shell plus per-route chunks fetched on demand.
 */
import Index from "@/pages/Index";

const ReferringTo = lazy(() => import("@/pages/ReferringTo"));
const Inquiries = lazy(() => import("@/pages/Inquiries"));
const Partners = lazy(() => import("@/pages/Partners"));
const TrainingJourney = lazy(() => import("@/pages/TrainingJourney"));
const Endorsement = lazy(() => import("@/pages/Endorsement"));
const Team = lazy(() => import("@/pages/Team"));
const Feedback = lazy(() => import("@/pages/Feedback"));
const Join = lazy(() => import("@/pages/Join"));
const Products = lazy(() => import("@/pages/Products"));
const NotFound = lazy(() => import("@/pages/NotFound"));

/**
 * Route-transition fallback.
 *
 * Deliberately minimal and full-height: a spinner that appears for 80ms is
 * more distracting than empty space, but a zero-height fallback collapses the
 * footer up the page mid-navigation.
 */
const RouteFallback = () => <div className="min-h-screen" aria-hidden />;

const App = () => (
  <ErrorBoundary>
    <ThemeProvider>
        <BrowserRouter>
          <ScrollToTop />

          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/referring-to" element={<ReferringTo />} />
              <Route path="/inquiries" element={<Inquiries />} />
              <Route path="/partners" element={<Partners />} />
              <Route path="/training-journey" element={<TrainingJourney />} />
              <Route path="/endorsement" element={<Endorsement />} />
              <Route path="/team" element={<Team />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/join" element={<Join />} />
              <Route path="/products" element={<Products />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
    </ThemeProvider>
  </ErrorBoundary>
);

export default App;
