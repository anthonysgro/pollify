'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UILink } from '../types'
import { Badge } from '@/components/ui/badge'
import { Icons } from '@/components/icons'
import DashboardLink from './dashboard-link'

function DashboardNav() {
    const pathname = usePathname(); // Get the current path

    const links: UILink[] = [
        { href: '/dashboard', label: 'Overview', icon: Icons.home },
        { href: '/dashboard/polls', label: 'Polls', icon: Icons.shoppingCart, badge: 6 },
        { href: '/dashboard/workshop', label: 'Workshop', icon: Icons.package },
        { href: '/dashboard/analytics', label: 'Analytics', icon: Icons.lineChart },
        { href: '/dashboard/settings', label: 'Settings', icon: Icons.users },
        { href: '/', label: 'Return to homepage', icon: Icons.chevronLeft }

    ]
    return (
        <nav className="grid items-start px-2 lg:px-4">
            {links.map((link) => {
                return (
                    <DashboardLink link={link} isActive={pathname === link.href} />
                )
            })}
        </nav>
    )
}

export default DashboardNav
