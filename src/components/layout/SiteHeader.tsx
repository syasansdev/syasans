import { ChevronRight, Menu } from "lucide-react";
import { forwardRef, useEffect, useState, type ComponentPropsWithoutRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import { Brand } from "@/components/layout/Brand";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navigation, primaryCta, type NavLeaf } from "@/config/site";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */

/**
 * Forwards its ref and any extra props through to the anchor.
 *
 * Required by `SheetClose asChild`: Radix's `Slot` clones this element and
 * attaches its own `onClick` and `ref`. A plain function component would
 * swallow both — the ref would warn, and tapping a link in the mobile drawer
 * would navigate without closing it.
 */
const MenuLink = forwardRef<
  HTMLAnchorElement,
  NavLeaf & Omit<ComponentPropsWithoutRef<typeof NavLink>, "to" | "className" | "children">
>(({ label, path, description, ...props }, ref) => (
  <NavLink
    ref={ref}
    to={path}
    {...props}
    className={({ isActive }) =>
      cn(
        "group/link flex flex-col gap-1 rounded-xl p-3 transition-colors duration-base ease-out",
        "hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        isActive && "bg-primary-soft",
      )
    }
  >
    {({ isActive }) => (
      <>
        <span
          className={cn(
            "flex items-center gap-1.5 text-sm font-medium",
            isActive ? "text-primary" : "text-foreground",
          )}
        >
          {label}
          <ChevronRight
            aria-hidden
            className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-base ease-out group-hover/link:translate-x-0 group-hover/link:opacity-100"
          />
        </span>
        {description ? (
          <span className="text-caption leading-snug text-muted-foreground">{description}</span>
        ) : null}
      </>
    )}
  </NavLink>
));
MenuLink.displayName = "MenuLink";

/* -------------------------------------------------------------------------- */

/**
 * The site header.
 *
 * Changes from the previous implementation, all of them behavioural rather
 * than cosmetic:
 *
 *  - Ten flat links are grouped into three labelled menus, so the top level
 *    is scannable and every destination gets an explanation.
 *  - It is a real `<header>` landmark containing a `<nav>`, and it ships the
 *    skip link that lets keyboard users jump the whole thing.
 *  - The mobile menu is a Radix dialog. Previously it was always mounted and
 *    merely translated off-screen with `pointer-events-none`, which left ten
 *    invisible links in the tab order on every page — a keyboard user tabbing
 *    from the logo fell into a menu they could not see. It now unmounts when
 *    closed, traps focus while open, closes on Escape, and returns focus to
 *    the trigger.
 *  - The scroll listener writes a boolean at most twice per page (on the way
 *    past the threshold) rather than calling `setState` on every scroll event.
 */
export const SiteHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY > 16;
      // Only re-render when the boolean actually flips.
      setIsScrolled((current) => (current === scrolled ? current : scrolled));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // A client-side navigation should never leave the drawer open behind the
  // new page.
  useEffect(() => setIsMenuOpen(false), [pathname]);

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-primary-foreground focus:shadow-lg"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color,padding] duration-base ease-out",
          isScrolled
            ? "glass border-b py-2.5 shadow-sm"
            : "border-b border-transparent bg-transparent py-4",
        )}
      >
        <div className="mx-auto flex w-full max-w-content items-center justify-between gap-4 px-5 sm:px-6 lg:px-8">
          <Brand />

          {/* Desktop navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="gap-0.5">
              {navigation.map((group) => (
                <NavigationMenuItem key={group.label}>
                  <NavigationMenuTrigger>{group.label}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[22rem] gap-1 p-2">
                      {group.items.map((item) => (
                        <li key={item.path}>
                          {/* `NavigationMenuLink` is what tells Radix a
                              selection was made, so the panel closes on click
                              instead of hanging open over the new page. */}
                          <NavigationMenuLink asChild>
                            <MenuLink {...item} />
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <ThemeToggle />

            <Button asChild className="hidden sm:inline-flex">
              <Link to={primaryCta.path}>{primaryCta.label}</Link>
            </Button>

            {/* Mobile trigger */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              {/* `SheetTrigger` supplies aria-haspopup / aria-expanded and the
                  focus-return contract, so none of it is hand-managed here. */}
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  aria-label="Open navigation menu"
                >
                  <Menu aria-hidden />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="flex w-full flex-col gap-0 overflow-y-auto p-0 sm:max-w-sm"
              >
                {/* The dialog needs a real accessible name; the visual brand
                    lock-up is decorative here and sits outside the title. */}
                <SheetTitle className="sr-only">Navigation menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Browse the site and start a conversation with our team.
                </SheetDescription>

                <div className="flex items-center border-b px-5 py-4">
                  <Brand />
                </div>

                <nav aria-label="Mobile" className="flex flex-1 flex-col gap-7 px-5 py-7">
                  {navigation.map((group) => (
                    <div key={group.label} className="flex flex-col gap-1">
                      <p className="px-3 pb-1 text-overline uppercase text-muted-foreground">
                        {group.label}
                      </p>
                      {group.items.map((item) => (
                        <SheetClose asChild key={item.path}>
                          <MenuLink {...item} />
                        </SheetClose>
                      ))}
                    </div>
                  ))}
                </nav>

                <div className="border-t p-5">
                  <SheetClose asChild>
                    <Button asChild size="lg" className="w-full">
                      <Link to={primaryCta.path}>{primaryCta.label}</Link>
                    </Button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
};
