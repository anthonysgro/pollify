import { LucideProps } from 'lucide-react'
import { LinkProps } from 'next/link'
import { ForwardRefExoticComponent, RefAttributes } from 'react'

export interface UILink extends LinkProps {
    href: string
    label: string
    icon: ForwardRefExoticComponent<
        Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
    >
    badge?: number
}
