import { MainNavItem, SidebarNavItem, DashNavItem } from '@/types/nav'

interface DocsConfig {
    mainNav: MainNavItem[]
    dashNav: DashNavItem[]
    sidebarNav: SidebarNavItem[]
}

export const docsConfig: DocsConfig = {
    mainNav: [
        {
            title: 'Create Poll',
            href: '/create',
        },
        {
            title: 'Schedule Meeting',
            href: '/meeting',
        },
        {
            title: 'Contact',
            href: '/contact',
        },
    ],
    dashNav: [
        {
            title: 'Polls',
            href: '/create',
            icon: 'heart',
        },
        {
            title: 'Dashboard',
            href: '/dashboard',
            icon: 'guage',
        },
        {
            title: 'Billing',
            href: '/dashboard/billing',
            icon: 'billing',
        },
        {
            title: 'Settings',
            href: '/dashboard/settings',
            icon: 'settings',
        },
    ],
    sidebarNav: [
        {
            title: 'Getting Started',
            items: [
                {
                    title: 'Introduction',
                    href: '/docs',
                    items: [],
                },
                {
                    title: 'Installation',
                    href: '/docs/installation',
                    items: [],
                },
                {
                    title: 'Changelog',
                    href: '/docs/changelog',
                    items: [],
                },
                {
                    title: 'About',
                    href: '/docs/about',
                    items: [],
                },
            ],
        },
        {
            title: 'Installation',
            items: [
                {
                    title: 'Next.js',
                    href: '/docs/installation/next',
                    items: [],
                },
                {
                    title: 'Vite',
                    href: '/docs/installation/vite',
                    items: [],
                },
                {
                    title: 'Remix',
                    href: '/docs/installation/remix',
                    items: [],
                },
                {
                    title: 'Gatsby',
                    href: '/docs/installation/gatsby',
                    items: [],
                },
                {
                    title: 'Astro',
                    href: '/docs/installation/astro',
                    items: [],
                },
                {
                    title: 'Laravel',
                    href: '/docs/installation/laravel',
                    items: [],
                },
                {
                    title: 'Manual',
                    href: '/docs/installation/manual',
                    items: [],
                },
            ],
        },
    ],
}
