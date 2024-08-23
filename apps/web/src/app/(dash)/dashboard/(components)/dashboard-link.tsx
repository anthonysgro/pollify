import Link from 'next/link'
import { UILink } from '../types'
import { Badge } from '@/components/ui/badge'

function DashboardLink({
    link,
    isActive,
}: {
    link: UILink
    isActive: boolean
}) {
    return (
        <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-3 rounded-lg text-sm font-medium px-3 py-2 transition-all ${
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
}

export default DashboardLink
