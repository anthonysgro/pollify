'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UILink } from '../types'
import { Badge } from '@/components/ui/badge'
import { Icons } from '@/components/icons'

function DashboardNav() {
    const pathname = usePathname(); // Get the current path

    const links: UILink[] = [
        { href: '/dashboard/overview', label: 'Overview', icon: Icons.home },
        { href: '/dashboard/polls', label: 'Polls', icon: Icons.shoppingCart, badge: 6 },
        { href: '/dashboard/workshop', label: 'Workshop', icon: Icons.package },
        { href: '/dashboard/analytics', label: 'Analytics', icon: Icons.lineChart },
        { href: '/dashboard/settings', label: 'Settings', icon: Icons.users },
        { href: '/', label: 'Return to homepage', icon: Icons.chevronLeft }
    ]
    return (
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {links.map((link) => {
                const isActive = pathname === link.href

                return (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                            isActive
                                ? 'bg-muted text-primary'
                                : 'text-muted-foreground hover:text-primary'
                        }`}
                    >
                        <link.icon className="h-4 w-4" />
                        {link.label}
                        {link.badge && (
                            <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                                {link.badge}
                            </Badge>
                        )}
                    </Link>
                )
            })}
        </nav>
    )
}

export default DashboardNav
