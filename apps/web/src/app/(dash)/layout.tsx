import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { docsConfig } from "@/config/docs";
import { DashboardNav } from "@/app/(dash)/dashboard/(components)/dashboard-nav";
import { env } from "../../../env.mjs";
import { ComingSoon } from "@/components/coming-soon";
import { constants } from "@/lib/constants";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  if (env.NODE_ENV === constants.PROD_ENV) {
    return <ComingSoon />;
  }

  return (
    <>
      <SiteHeader />
      <div className="container grid flex-1 gap-6 lg:grid-cols-[215px_1fr]">
        <aside className="hidden w-[215px] flex-col lg:flex border-r pt-6 pr-2">
          <DashboardNav items={docsConfig.dashNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden pt-6">
          {children}
        </main>
      </div>
      <SiteFooter />
    </>
  );
}
