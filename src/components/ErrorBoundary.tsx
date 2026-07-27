import { Component, type ErrorInfo, type ReactNode } from "react";

import { Button } from "@/components/ui/button";

type Props = { children: ReactNode };
type State = { hasError: boolean };

/**
 * Catches render-time errors so a fault in one section cannot blank the whole
 * site. Without it, any thrown error unmounts the entire React tree and the
 * visitor is left staring at an empty white document.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Replace with a real reporter (Sentry et al.) when one is wired up.
    console.error("Unhandled render error:", error, info.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="flex min-h-screen items-center justify-center bg-surface px-6">
        <div className="flex max-w-md flex-col items-center gap-5 text-center">
          <p className="text-overline uppercase text-muted-foreground">Something went wrong</p>
          <h1 className="text-h2 text-foreground">This page didn&rsquo;t load correctly</h1>
          <p className="text-body text-muted-foreground">
            Reloading usually fixes it. If it keeps happening, please let us know.
          </p>
          <Button onClick={() => window.location.reload()}>Reload the page</Button>
        </div>
      </div>
    );
  }
}
