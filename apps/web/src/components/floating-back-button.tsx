'use client'

import { Icons } from '@/components/icons'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { motion } from 'framer-motion'

const svgMotion = {
    rest: { x: 0, ease: 'easeOut', duration: 0.2, type: 'spring' },
    hover: {
        x: -5,
        transition: {
            duration: 0.3,
            type: 'tween',
            ease: 'easeInOut',
        },
    },
}

export default function FloatingBackButton() {
    return (
        <motion.div initial="rest" whileHover="hover" animate="rest">
            <Link
                href="/"
                className={cn(
                    buttonVariants({ variant: 'ghost' }),
                    'absolute left-4 top-4 md:left-8 md:top-8',
                )}
            >
                <motion.div variants={svgMotion}>
                    <Icons.chevronLeft className="mr-2 h-4 w-4" />
                </motion.div>
                Back
            </Link>{' '}
        </motion.div>
    )
}
