"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { CommandMenu } from "@/components/command-menu";

const nav = [
  { label: "Home", href: "/" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/skills" },
];

function activeSegment(pathname: string) {
  if (pathname === "/") return null;
  return pathname.replace(/^\//, "").split("/")[0];
}

export function Header() {
  const pathname = usePathname();
  const segment = activeSegment(pathname);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-12">
        {/* Logo / breadcrumb */}
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-bold text-foreground"
        >
          <span className="text-brand">~</span>
          {segment && (
            <>
              <span className="text-muted-foreground">/</span>
              <span>{segment}</span>
            </>
          )}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative text-sm transition-colors hover:text-foreground",
                  isActive ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-1.5 left-0 h-0.5 w-full bg-brand" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <CommandMenu />
          </div>
          <ThemeToggle />
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground md:hidden"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="border-t border-border/60 px-4 py-3 md:hidden">
          <div className="mb-3 sm:hidden">
            <CommandMenu />
          </div>
          <ul className="flex flex-col gap-1">
            {nav.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "block rounded-md px-3 py-2 text-sm transition-colors",
                      isActive
                        ? "bg-accent text-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
