"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

/**
 * A thin horizontal progress bar pinned just below the sticky header.
 * It fills from 0% to 100% as the page is scrolled, standing in for the
 * hidden vertical scrollbar.
 */
export function ScrollProgress() {
  const pathname = usePathname();
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const update = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // The landing terminal has no header, so there is no progress bar there.
  if (pathname === "/") return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-16 z-30 h-[3px]"
    >
      <div
        className="h-full bg-brand transition-[width] duration-75 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
