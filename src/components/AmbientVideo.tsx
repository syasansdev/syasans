import { Pause, Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

type AmbientVideoProps = {
  src: string;
  /** Describes the footage for anyone who cannot see it. */
  label: string;
  /**
   * Still shown until the first frame is decodable, and the frame left in
   * place when motion or data preferences say not to play.
   *
   * Optional but worth supplying for anything above the fold: without it the
   * frame holds a shimmer until the video is ready, and there is nothing for
   * the browser to paint as an LCP candidate.
   */
  poster?: string;
  className?: string;
  /**
   * Above the fold. Metadata is fetched immediately rather than waiting for
   * the element to intersect.
   */
  priority?: boolean;
};

/** Respects the OS/browser data-saver setting. */
const prefersLessData = () => {
  const connection = (
    navigator as Navigator & { connection?: { saveData?: boolean } }
  ).connection;
  return Boolean(connection?.saveData);
};

/**
 * A silent, looping video that plays itself.
 *
 * Autoplay is not a property you set — it is a request the browser may refuse.
 * This handles the refusal path explicitly:
 *
 *  1. `muted` + `playsInline` are set before the first `play()`, which is what
 *     every current autoplay policy actually requires.
 *  2. If `play()` still rejects, the element is forced muted and retried once —
 *     covering the case where a browser extension or a restored session left
 *     the media unmuted.
 *  3. If it rejects again, the component degrades to a still first frame with a
 *     play control. Nothing is broken and nothing is required of the visitor.
 *
 * Accessibility: WCAG 2.2.2 requires a pause mechanism for any motion that
 * starts automatically and runs longer than five seconds — a ten-second loop
 * qualifies. The control below is that mechanism. It is reachable by keyboard
 * and stays visible whenever the video is paused, rather than being
 * hover-only decoration.
 *
 * Cost control: playback pauses when the element scrolls out of view, the
 * source is not fetched at all under a data-saver connection, and it never
 * autoplays under `prefers-reduced-motion`.
 */
export const AmbientVideo = ({
  src,
  label,
  poster,
  className,
  priority = false,
}: AmbientVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  /** Set when the visitor pauses deliberately, so scrolling back doesn't resume. */
  const pausedByUser = useRef(false);

  const holdStill = prefersReducedMotion || prefersLessData();

  const attemptPlay = useCallback(async () => {
    const video = videoRef.current;
    if (!video || pausedByUser.current) return;

    try {
      await video.play();
    } catch {
      // Retry once with mute forced on — the usual reason a muted autoplay is
      // still refused.
      video.muted = true;
      try {
        await video.play();
      } catch {
        // Give up quietly. The first frame stays on screen with a play control.
        setIsPlaying(false);
      }
    }
  }, []);

  // Start when ready; pause when off screen.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || holdStill) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void attemptPlay();
        else video.pause();
      },
      { threshold: 0.2 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [attemptPlay, holdStill]);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      pausedByUser.current = false;
      void attemptPlay();
    } else {
      pausedByUser.current = true;
      video.pause();
    }
  };

  return (
    <div className={cn("group relative h-full w-full overflow-hidden bg-surface-strong", className)}>
      {/* Loading state. A supplied poster is always better than a skeleton —
          it is real content, it gives the browser an LCP candidate, and it
          means the frame is never a grey rectangle.
          The shimmer is the fallback, and is skipped when holding still: with
          no source there is no `canplay`, so it would otherwise loop forever
          underneath an opaque panel. */}
      {!isReady && !poster && !holdStill ? (
        <div
          aria-hidden
          className="animate-shimmer absolute inset-0 bg-[linear-gradient(100deg,transparent_20%,hsl(var(--foreground)/0.06)_50%,transparent_80%)] bg-[length:200%_100%]"
        />
      ) : null}

      <video
        ref={videoRef}
        src={holdStill ? undefined : src}
        poster={poster}
        aria-label={label}
        muted
        loop
        playsInline
        // `autoPlay` alone is unreliable across browsers; `attemptPlay` above
        // is what actually starts it. This covers the happy path early.
        autoPlay={!holdStill}
        preload={priority ? "auto" : "metadata"}
        disablePictureInPicture
        onCanPlay={() => setIsReady(true)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className={cn(
          "h-full w-full object-cover transition-opacity duration-slower ease-out",
          // With a poster there is already something on screen, so the element
          // stays visible and the first frame simply replaces the still.
          isReady || poster ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Under reduced motion or data saver there is nothing to play. With a
          poster that is all that is needed; without one the frame would be
          blank, so it gets an explanation instead. */}
      {holdStill ? (
        poster ? null : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/15 to-accent/15">
            <p className="max-w-xs px-6 text-center text-caption text-muted-foreground">
              Video paused to respect your motion and data preferences.
            </p>
          </div>
        )
      ) : (
        <button
          type="button"
          onClick={toggle}
          aria-label={isPlaying ? "Pause the background video" : "Play the background video"}
          className={cn(
            "absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full",
            "bg-black/45 text-white backdrop-blur-sm",
            "transition-[opacity,background-color,transform] duration-base ease-out",
            "hover:bg-black/65 active:scale-95",
            "focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
            // Quiet while playing, permanent once paused — a control the
            // visitor has used must not vanish on them.
            isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100",
          )}
        >
          {isPlaying ? (
            <Pause aria-hidden className="h-4 w-4 fill-current" />
          ) : (
            <Play aria-hidden className="ml-0.5 h-4 w-4 fill-current" />
          )}
        </button>
      )}
    </div>
  );
};
