import { Bot, Send, X } from "lucide-react";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  buildSystemPrompt,
  greeting,
  offlineReplies,
  outOfScopeReply,
} from "@/config/assistant";
import { contact } from "@/config/site";
import { cn } from "@/lib/utils";
import logo from "@/assets/syasans-logo.png";

type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
};

/**
 * The assistant.
 *
 * Rebuilt for accessibility and for the design system:
 *  - It is a real labelled dialog. Previously it was an unlabelled `<div>`
 *    with no dialog semantics, no Escape handler and no focus management, so
 *    a keyboard user could open it and then have no idea where they were.
 *  - The transcript is a live region, so new replies are announced.
 *  - `onKeyPress` (deprecated, and skipped by some IMEs) is replaced by a
 *    real `<form>` submit, which also gives Enter-to-send for free.
 *  - Colours, radii and elevation come from tokens, so it now matches the
 *    rest of the product and works in dark mode.
 */
const GREETING: Message = { id: "greeting", text: greeting, sender: "bot" };

/** Conversation openers, so the panel is never a blank prompt. */
const STARTERS = [
  "What programmes do you offer?",
  "How does a training engagement work?",
  "What placement support is included?",
];

/**
 * Only the last few turns are sent upstream. Enough for the assistant to
 * follow up coherently, bounded so a long conversation cannot grow the request
 * without limit.
 */
const HISTORY_TURNS = 8;

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const titleId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  // Escape closes and hands focus back to the launcher.
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    inputRef.current?.focus();
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ block: "nearest" });
  }, [messages, isTyping]);

  /**
   * Offline answers.
   *
   * Used when no key is configured or the request fails. They never assert
   * anything commercial — fee, schedule and eligibility questions are routed
   * to a human, exactly as the system prompt requires of the model.
   */
  const offlineReply = (question: string): string =>
    offlineReplies.find(({ match }) => match.test(question))?.reply ??
    `${outOfScopeReply} You can also reach the team directly at ${contact.email}.`;

  const generateReply = async (question: string, history: Message[]): Promise<string> => {
    const apiKey = import.meta.env.VITE_GROQ_API_KEY;
    if (!apiKey) return offlineReply(question);

    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          // Low temperature: this assistant quotes an institution's
          // commitments. Inventive phrasing is a liability, not a feature.
          temperature: 0.3,
          max_tokens: 512,
          messages: [
            { role: "system", content: buildSystemPrompt() },
            // Prior turns, so "one follow-up question at a time" can actually
            // resolve — without them the assistant re-asks what it just asked.
            ...history
              .filter((message) => message.id !== "greeting")
              .slice(-HISTORY_TURNS)
              .map((message) => ({
                role: message.sender === "user" ? ("user" as const) : ("assistant" as const),
                content: message.text,
              })),
            { role: "user", content: question },
          ],
        }),
      });

      if (!response.ok) throw new Error(`Assistant request failed: ${response.status}`);

      const data = await response.json();
      const reply: unknown = data?.choices?.[0]?.message?.content;

      return typeof reply === "string" && reply.trim() ? reply.trim() : offlineReply(question);
    } catch (error) {
      // The previous implementation logged the API key's length and the full
      // response body on every message, exposing configuration detail to
      // anyone with devtools open.
      console.error("Assistant unavailable; answering from the offline set.", error);
      return offlineReply(question);
    }
  };

  const ask = async (question: string) => {
    const trimmed = question.trim();
    if (!trimmed || isTyping) return;

    const history = messages;
    setMessages((current) => [
      ...current,
      { id: `u-${current.length}`, text: trimmed, sender: "user" },
    ]);
    setInput("");
    setIsTyping(true);

    const reply = await generateReply(trimmed, history);

    setMessages((current) => [...current, { id: `b-${current.length}`, text: reply, sender: "bot" }]);
    setIsTyping(false);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    void ask(input);
  };

  if (!isOpen) {
    return (
      <Button
        ref={triggerRef}
        onClick={() => setIsOpen(true)}
        size="icon"
        className="fixed bottom-5 right-5 z-40 h-14 w-14 rounded-full shadow-xl [&_svg]:size-6"
        aria-label="Open the Syasan's assistant"
      >
        <Bot aria-hidden />
      </Button>
    );
  }

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      className="fixed bottom-5 right-5 z-40 flex h-[min(34rem,calc(100vh-2.5rem))] w-[min(23rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
    >
      <header className="flex items-center justify-between gap-3 border-b border-border bg-surface px-4 py-3">
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt=""
            aria-hidden
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-contain"
          />
          <div>
            <p id={titleId} className="text-caption font-semibold text-foreground">
              Syasan&rsquo;s assistant
            </p>
            <p className="flex items-center gap-1.5 text-micro text-muted-foreground">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-success" />
              Online
            </p>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            setIsOpen(false);
            triggerRef.current?.focus();
          }}
          aria-label="Close the assistant"
        >
          <X aria-hidden />
        </Button>
      </header>

      <div
        role="log"
        aria-live="polite"
        aria-label="Conversation"
        className="flex-1 space-y-3 overflow-y-auto bg-background p-4"
      >
        {messages.map(({ id, text, sender }) => (
          <div
            key={id}
            className={cn("flex", sender === "user" ? "justify-end" : "justify-start")}
          >
            <p
              className={cn(
                "max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-caption leading-relaxed",
                sender === "user"
                  ? "rounded-br-md bg-primary text-primary-foreground"
                  : "rounded-bl-md bg-secondary text-foreground",
              )}
            >
              {text}
            </p>
          </div>
        ))}

        {/* Openers, shown only until the visitor has said something. */}
        {messages.length === 1 && !isTyping ? (
          <ul className="flex flex-col items-start gap-2 pt-1">
            {STARTERS.map((starter) => (
              <li key={starter}>
                <button
                  type="button"
                  onClick={() => void ask(starter)}
                  className="min-h-11 rounded-full border border-border bg-card px-4 py-2.5 text-left text-caption text-muted-foreground transition-colors duration-base ease-out hover:border-primary/30 hover:bg-primary-soft hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {starter}
                </button>
              </li>
            ))}
          </ul>
        ) : null}

        {isTyping ? (
          <p className="flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-secondary px-3.5 py-3 text-caption text-muted-foreground">
            <span className="sr-only">The assistant is typing</span>
            {[0, 1, 2].map((dot) => (
              <span
                key={dot}
                aria-hidden
                className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground"
                style={{ animationDelay: `${dot * 120}ms` }}
              />
            ))}
          </p>
        ) : null}

        <div ref={transcriptEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-border p-3">
        <label htmlFor={`${titleId}-input`} className="sr-only">
          Your message
        </label>
        <Input
          ref={inputRef}
          id={`${titleId}-input`}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask a question…"
          autoComplete="off"
          disabled={isTyping}
        />
        <Button type="submit" size="icon" disabled={!input.trim() || isTyping} aria-label="Send">
          <Send aria-hidden />
        </Button>
      </form>
    </div>
  );
};

export default ChatBot;
