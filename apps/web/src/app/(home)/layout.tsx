import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import React from "react";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export default async function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}
