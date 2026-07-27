import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import type { HeroClip } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * The hero reel: student testimonials, played in sequence with sound.
 *
 * This is not `AmbientVideo` with more clips bolted on, and the difference is
 * worth stating because it drives every decision below. Ambient footage is
 * decoration — silent, looping, safe to ignore. A testimonial is *speech*: the
 * audio is the content, so the component's real job is getting sound playing
 * without either lying to the visitor or ambushing them.
 *
 * On autoplay with sound. It is refused by every current browser until the
 * visitor has interacted with the document, and no attribute changes that —
 * `autoplay` + unmuted simply does nothing. So the request is made honestly and
 * the refusal is handled:
 *
 *  1. Play is attempted unmuted. On a return visit, or once anything on the
 *     page has been clicked, this is what actually runs.
 *  2. If it rejects, the element is muted and retried — playback starts either
 *     way, and a "Tap for sound" control appears. The visitor is told the audio
 *     is there rather than being left to wonder why a talking head is silent.
 *  3. If muted playback is refused too, the poster stays with a play control.
 *
 * Once sound has been granted or explicitly declined, `wantsSound` carries that
 * choice across clip changes. A visitor who unmuted clip one does not have to
 * unmute clip two, and a visitor who muted deliberately is not overridden the
 * moment the next clip starts.
 *
 * On framing. Three of the four sources are phone-shot portrait, so the frame
 * this sits in is portrait too (see `Hero`) and every clip fills it edge to
 * edge. The first pass did the opposite — kept the old 16:9 frame and
 * letterboxed the portrait clips against a blurred copy of their own poster —
 * and it looked exactly like what it was: a tall video apologising for the
 * wrong-shaped hole. Matching the frame to the footage removes the problem
 * rather than dressing it.
 *
 * The one landscape clip is cropped to portrait by the same `object-cover`.
 * That is a hard crop, and it survives only because the speaker is centred and
 * shot close; it is not a rule that holds for arbitrary footage. Anything wider
 * than a head-and-shoulders would need re-framing before it goes in this reel.
 *
 * On motion preferences. The reel autoplays unconditionally — that is a product
 * decision, taken deliberately, and it is the one place this component does not
 * defer to `prefers-reduced-motion`. What it does still honour is WCAG 2.2.2,
 * which asks for a *mechanism* to stop motion running past five seconds rather
 * than for the motion never to start: the pause control below is always
 * present, keyboard reachable, and stays visible once used.
 *
 * Cost control: only the running clip is fetched, and playback pauses when the
 * frame leaves the viewport — nobody should hear a testimonial from a section
 * they have already scrolled past.
 */
export const HeroReel = ({
  clips,
  className,
}: {
  clips: readonly HeroClip[];
  className?: string;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  /** Playing, but muted against the visitor's wishes — the browser said no. */
  const [isSoundBlocked, setIsSoundBlocked] = useState(false);

  /** Set when the visitor pauses deliberately, so scrolling back doesn't resume. */
  const pausedByUser = useRef(false);
  /** The visitor's standing preference, not the element's current state. */
  const wantsSound = useRef(true);

  const clip = clips[index];

  const attemptPlay = useCallback(async () => {
    const video = videoRef.current;
    if (!video || pausedByUser.current) return;

    video.muted = !wantsSound.current;

    try {
      await video.play();
      setIsSoundBlocked(false);
    } catch {
      // The usual refusal: sound-on autoplay before any interaction.
      video.muted = true;
      try {
        await video.play();
        // Only "blocked" if sound was actually wanted. A visitor who muted on
        // purpose is getting exactly what they asked for.
        setIsSoundBlocked(wantsSound.current);
      } catch {
        setIsPlaying(false);
      }
    }

    setIsMuted(video.muted);
  }, []);

  /* Source changes are driven imperatively rather than through the `src`
     attribute: React would swap the attribute without reloading the element,
     and the reel would sit on the last frame of the previous clip. */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.src = clip.src;
    video.load();
    void attemptPlay();
  }, [attemptPlay, clip.src]);

  // Pause when off screen — nobody wants audio from a section they scrolled past.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void attemptPlay();
        else video.pause();
      },
      { threshold: 0.2 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [attemptPlay]);

  const togglePlay = () => {
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

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !video.muted;
    video.muted = nextMuted;
    wantsSound.current = !nextMuted;
    setIsMuted(nextMuted);
    setIsSoundBlocked(false);

    // Unmuting is itself the interaction the autoplay policy was waiting for,
    // so this is the moment a refused clip can finally start.
    if (!nextMuted) {
      pausedByUser.current = false;
      void video.play().catch(() => undefined);
    }
  };

  const select = (next: number) => {
    pausedByUser.current = false;
    setIndex(next);
  };

  return (
    <div
      className={cn(
        "group relative h-full w-full overflow-hidden bg-surface-strong",
        className,
      )}
    >
      <video
        ref={videoRef}
        poster={clip.poster}
        aria-label={clip.label}
        autoPlay
        playsInline
        preload="auto"
        disablePictureInPicture
        onEnded={() => setIndex((current) => (current + 1) % clips.length)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        /* Top-anchored, not centred. Every clip here is a person talking to
           camera, and a centred crop takes the same slice off the top of the
           head as it does off the bottom of the frame — where there is nothing
           but torso. Anchoring high spends the whole crop budget on the part
           nobody needs to see. */
        className="h-full w-full object-cover object-top"
      />

      {/* Sound. Prominent while the browser is holding audio back, quiet once
          the visitor has settled the question either way. */}
      {isSoundBlocked ? (
        <button
          type="button"
          onClick={toggleSound}
          className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-black/60 px-3.5 py-2 text-micro font-semibold text-white backdrop-blur-sm transition-[background-color,transform] duration-base ease-out hover:bg-black/75 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        >
          <Volume2 aria-hidden className="h-4 w-4" />
          Tap for sound
        </button>
      ) : null}

      {/* Which clip, and a way to reach the others. */}
      <div className="absolute bottom-4 left-4 flex items-center gap-2">
        {clips.map((item, position) => (
          <button
            key={item.src}
            type="button"
            onClick={() => select(position)}
            aria-label={`Play testimonial ${position + 1} of ${clips.length}`}
            aria-current={position === index}
            className={cn(
              "h-1.5 rounded-full transition-[width,background-color] duration-base ease-out",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
              position === index ? "w-7 bg-white" : "w-1.5 bg-white/45 hover:bg-white/70",
            )}
          />
        ))}
      </div>

      {/* Transport. The pause control is WCAG 2.2.2's required mechanism, so it
          is never conditional. */}
      <div className="absolute bottom-3 right-3 flex items-center gap-2">
        <button
          type="button"
          onClick={toggleSound}
          aria-label={isMuted ? "Unmute the testimonial" : "Mute the testimonial"}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full",
            "bg-black/45 text-white backdrop-blur-sm",
            "transition-[opacity,background-color,transform] duration-base ease-out",
            "hover:bg-black/65 active:scale-95",
            "focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
            // Muted is a state worth advertising; unmuted needs no notice.
            isMuted ? "opacity-100" : "opacity-0 group-hover:opacity-100",
          )}
        >
          {isMuted ? (
            <VolumeX aria-hidden className="h-4 w-4" />
          ) : (
            <Volume2 aria-hidden className="h-4 w-4" />
          )}
        </button>

        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause the testimonial" : "Play the testimonial"}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full",
            "bg-black/45 text-white backdrop-blur-sm",
            "transition-[opacity,background-color,transform] duration-base ease-out",
            "hover:bg-black/65 active:scale-95",
            "focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
            // A control the visitor has used must not vanish on them.
            isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100",
          )}
        >
          {isPlaying ? (
            <Pause aria-hidden className="h-4 w-4 fill-current" />
          ) : (
            <Play aria-hidden className="ml-0.5 h-4 w-4 fill-current" />
          )}
        </button>
      </div>

      {/* Attribution, when we have it. Absent by default — see `heroReel`.
          Top *right*, because top left belongs to the sound prompt. */}
      {clip.speaker ? (
        <figcaption className="pointer-events-none absolute right-4 top-4 rounded-lg bg-black/55 px-3 py-1.5 text-right backdrop-blur-sm">
          <span className="block text-micro font-semibold text-white">{clip.speaker.name}</span>
          {clip.speaker.context ? (
            <span className="block text-micro text-white/70">{clip.speaker.context}</span>
          ) : null}
        </figcaption>
      ) : null}
    </div>
  );
};
