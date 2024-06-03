import { fontSans } from '@/styles/fonts'
import '@/styles/globals.css'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/providers'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import { DndContext } from '@dnd-kit/core'

interface RootLayoutProps {
    children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <>
            <html lang="en" suppressHydrationWarning>
                <head />
                <body
                    className={cn(
                        'min-h-screen bg-background font-sans antialiased',
                        fontSans.variable,
                    )}
                >
                    <UserProvider>
                        <ThemeProvider
                            attribute="class"
                            defaultTheme="dark"
                            enableSystem
                            disableTransitionOnChange
                        >
                            <div className="relative flex min-h-screen flex-col">
                                <div className="flex-1">{children}</div>
                            </div>
                        </ThemeProvider>
                    </UserProvider>
                </body>
            </html>
        </>
    )
}
