import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const ThemeToggle = ({ className }: { className?: string }) => {
  const { resolvedTheme, toggleTheme } = useTheme();
  const nextTheme = resolvedTheme === "dark" ? "light" : "dark";

  return (
    <Button
      variant="ghost"
      /* 44px, not 36px: this is a primary header control and on touch it has
         to clear the minimum target size. */
      size="icon"
      onClick={toggleTheme}
      className={cn("text-muted-foreground hover:text-foreground", className)}
      aria-label={`Switch to ${nextTheme} theme`}
      title={`Switch to ${nextTheme} theme`}
    >
      {/* Both icons are always mounted and cross-faded, so the control never
          changes size and there is no layout shift on toggle. */}
      <Sun
        aria-hidden
        className="absolute rotate-0 scale-100 transition-transform duration-base ease-out dark:-rotate-90 dark:scale-0"
      />
      <Moon
        aria-hidden
        className="absolute rotate-90 scale-0 transition-transform duration-base ease-out dark:rotate-0 dark:scale-100"
      />
    </Button>
  );
};
