"use client";

import { LandingHero } from "@/components/landing-hero";
import { HomepageContent } from "@/components/homepage-content";
import { SessionProvider } from "next-auth/react";
export default function Home() {
  return (
    <SessionProvider>
      <main>
        <LandingHero />
        <HomepageContent />
      </main>
    </SessionProvider>
  );
}
