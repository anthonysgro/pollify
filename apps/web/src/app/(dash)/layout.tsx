import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Badge, Bell, Package2 } from 'lucide-react'
import { UILink } from './dashboard/types'
import { Icons } from '@/components/icons'
import DashboardNav from './dashboard/(components)/dashboard-nav'
import { siteConfig } from '@/config/site'

interface DashboardLayoutProps {
    children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const links: UILink[] = [
        { href: '/dashboard/overview', label: 'Overview', icon: Icons.home },
        {
            href: '/dashboard/polls',
            label: 'Polls',
            icon: Icons.shoppingCart,
            badge: 6,
        },
        { href: '/dashboard/workshop', label: 'Workshop', icon: Icons.package },
        {
            href: '/dashboard/analytics',
            label: 'Analytics',
            icon: Icons.lineChart,
        },
        { href: '/dashboard/settings', label: 'Settings', icon: Icons.users },
    ]

    return (
        <>
            <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
                <div className="hidden border-r bg-muted/40 md:block">
                    <div className="flex h-full max-h-screen flex-col gap-2">
                        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                            <Link
                                href="#"
                                className="flex items-center gap-2 font-semibold"
                            >
                                <Icons.logo className="h-6 w-6" />
                                <span className="">{siteConfig.name}</span>
                            </Link>
                            <Button
                                variant="outline"
                                size="icon"
                                className="ml-auto h-8 w-8"
                            >
                                <Bell className="h-4 w-4" />
                                <span className="sr-only">
                                    Toggle notifications
                                </span>
                            </Button>
                        </div>
                        <div className="flex-1">
                            <DashboardNav />
                        </div>
                        <div className="mt-auto p-4">
                            <Card x-chunk="dashboard-02-chunk-0">
                                <CardHeader className="p-2 pt-0 md:p-4">
                                    <CardTitle>Upgrade to Pro</CardTitle>
                                    <CardDescription>
                                        Unlock all features and get unlimited
                                        access to our support team.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                                    <Button size="sm" className="w-full">
                                        Upgrade
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">{children}</div>
            </div>

            <SiteFooter />
        </>
    )
}
