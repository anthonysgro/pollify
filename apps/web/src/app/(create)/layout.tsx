import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { docsConfig } from '@/config/docs'
import PlaygroundPage from '@/app/(create)/create/page'
interface DashboardLayoutProps {
    children: React.ReactNode
}

export default async function DashboardLayout({
    children,
}: DashboardLayoutProps) {
    return (
        <>
            <SiteHeader />
            <PlaygroundPage />
            {/* <div className="container grid flex-1 gap-6 lg:grid-cols-[215px_1fr]">
                <aside className="hidden w-[215px] flex-col lg:flex border-r pt-6 pr-2">
                    <DashboardNav items={docsConfig.dashNav} />
                </aside>
                <main className="flex w-full flex-1 flex-col overflow-hidden pt-6">
                    {children}
                </main>
            </div> */}
            <SiteFooter />
        </>
    )
}
