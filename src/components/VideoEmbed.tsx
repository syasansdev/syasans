import { Play } from "lucide-react";
import { useCallback, useState } from "react";

import { cn } from "@/lib/utils";

type VideoEmbedProps = {
  /** YouTube video id. */
  videoId: string;
  /** Used for the iframe title and the play control's accessible name. */
  title: string;
  /** Tailwind aspect utility. Defaults to widescreen. */
  aspect?: string;
  className?: string;
};

const posterSources = (videoId: string) => [
  `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
  `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
];

/**
 * A facade ("lite") YouTube embed, for films the visitor chooses to watch.
 *
 * A live `<iframe>` costs roughly a megabyte of YouTube JavaScript, several
 * cross-origin connections and a set of cookies before anyone has expressed
 * intent. This renders a poster and a play control, and mounts the real player
 * only on activation.
 *
 * Degradation is layered:
 *  1. `maxresdefault`, falling back to `hqdefault` for videos with no
 *     high-resolution thumbnail — a common cause of black poster frames.
 *  2. If both fail, a branded gradient remains behind the control, so the
 *     button is always legible.
 *  3. Until the poster decodes, a shimmering placeholder holds the frame, so
 *     the box never collapses and nothing shifts.
 *  4. Connections are warmed on hover/focus, so activation feels instant
 *     without paying that cost on load.
 *
 * For always-on, silent, looping footage use `AmbientVideo` instead — an embed
 * cannot autoplay without putting that megabyte in the critical path.
 */
export const VideoEmbed = ({ videoId, title, aspect = "aspect-video", className }: VideoEmbedProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [posterIndex, setPosterIndex] = useState(0);
  const [posterLoaded, setPosterLoaded] = useState(false);
  const [warmed, setWarmed] = useState(false);

  const poster = posterSources(videoId)[posterIndex];

  const warmConnections = useCallback(() => {
    if (warmed) return;
    setWarmed(true);

    for (const href of ["https://www.youtube-nocookie.com", "https://i.ytimg.com"]) {
      const link = document.createElement("link");
      link.rel = "preconnect";
      link.href = href;
      document.head.append(link);
    }
  }, [warmed]);

  return (
    <div className={cn("relative w-full overflow-hidden bg-surface-strong", aspect, className)}>
      {isPlaying ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setIsPlaying(true)}
          onMouseEnter={warmConnections}
          onFocus={warmConnections}
          className="group absolute inset-0 flex h-full w-full items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
          aria-label={`Play video: ${title}`}
        >
          {!posterLoaded ? (
            <span
              aria-hidden
              className="animate-shimmer absolute inset-0 bg-[linear-gradient(100deg,transparent_20%,hsl(var(--foreground)/0.06)_50%,transparent_80%)] bg-[length:200%_100%]"
            />
          ) : null}

          {poster ? (
            <img
              src={poster}
              alt=""
              aria-hidden
              width={1280}
              height={720}
              loading="lazy"
              decoding="async"
              onLoad={() => setPosterLoaded(true)}
              onError={() => setPosterIndex((index) => index + 1)}
              className={cn(
                "absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-slower ease-out group-hover:scale-[1.02]",
                posterLoaded ? "opacity-100" : "opacity-0",
              )}
            />
          ) : null}

          {/* Scrim: keeps the control legible over any thumbnail. */}
          <span
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-black/25 transition-opacity duration-base group-hover:opacity-90"
          />

          {/* The ring expands on hover rather than the button growing, so
              nothing around it shifts. */}
          <span aria-hidden className="relative flex items-center justify-center">
            <span className="absolute h-20 w-20 rounded-full bg-background/25 opacity-0 transition-[transform,opacity] duration-slow ease-out group-hover:scale-125 group-hover:opacity-100 sm:h-24 sm:w-24" />
            <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-background shadow-2xl ring-1 ring-inset ring-white/40 transition-transform duration-base ease-spring group-hover:scale-105 group-active:scale-95 sm:h-20 sm:w-20">
              <Play className="ml-1 h-6 w-6 fill-primary text-primary sm:h-7 sm:w-7" />
            </span>
          </span>
        </button>
      )}
    </div>
  );
};
