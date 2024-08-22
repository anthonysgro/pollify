'use client'

import { CommandMenu } from '@/components/command-menu'
import { MainNav } from '@/components/main-nav'
import { MobileNav } from '@/components/mobile-nav'
import { ModeToggle } from '@/components/mode-toggle'
import { UserNavAvatar } from '@/components/user-nav-avatar'
import { docsConfig } from '@/config/docs'
import { useUser } from '@auth0/nextjs-auth0/client'

export function SiteHeader() {
    const user = useUser()

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <MainNav
                    navLinks={
                        user ? docsConfig.signedInNav : docsConfig.mainNav
                    }
                />
                <MobileNav />
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        <CommandMenu />
                    </div>
                    <UserNavAvatar />{' '}
                    <nav className="flex items-center">
                        <ModeToggle />
                    </nav>
                </div>
            </div>
        </header>
    )
}
