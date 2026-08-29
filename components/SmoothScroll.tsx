"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    // The assistant owns its own scroll containers. Lenis listens on the
    // window and can otherwise consume wheel/touch events before they reach
    // the chat and entry-gate scroll areas.
    if (pathname.startsWith("/asistan")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      anchors: { offset: -64 },
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });
    const update = (time: number) => lenis.raf(time * 1000);

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, [pathname]);

  return null;
}
