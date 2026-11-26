"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { RouteFade } from "@/components/layout/RouteFade";
import { FooterMotion } from "@/components/motion/FooterMotion";
import { ScrollMotionInit } from "@/components/motion/ScrollMotionInit";

function isBareRoute(path: string) {
  const clean = path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
  return clean === "/black-friday";
}

export function SiteShell({ children }: { children: ReactNode }) {
  const path = usePathname() || "/";
  const bare = isBareRoute(path);

  if (bare) {
    return <main id="main">{children}</main>;
  }

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <ScrollMotionInit />
      <Header />
      <RouteFade>
        <main id="main">{children}</main>
      </RouteFade>
      <Footer />
      <FooterMotion />
    </>
  );
}
