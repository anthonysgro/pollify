'use client'

import Link from 'next/link'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import { UserAuthForm } from '@/components/user-auth-form'
import { TermsOfService } from '@/components/terms-of-service'
import { PrivacyPolicy } from '@/components/privacy-policy'
import Image from 'next/image'
import VerticalTwo from '../../../../public/vertical-two.jpg'
import { motion } from 'framer-motion'
import { useMediaQuery } from '@/hooks/use-media-query'
import React from 'react'

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

export default function RegisterPage() {
    const isDesktop = useMediaQuery('(min-width: 1024px)')

    return (
        <>
            <div className="container grid max-h-[100vh] h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
                <Link
                    href="/login"
                    className={cn(
                        buttonVariants({ variant: 'ghost' }),
                        'absolute right-4 top-4 md:right-8 md:top-8 ',
                    )}
                >
                    Login
                </Link>
                <div className="hidden h-full bg-muted lg:block">
                    <Image
                        src={VerticalTwo}
                        alt="Picture of mountains"
                        className="object-cover h-screen"
                        priority={true}
                        placeholder="blur"
                    />
                </div>

                <div className="lg:p-8">
                    <motion.div
                        initial="rest"
                        whileHover="hover"
                        animate="rest"
                    >
                        <Link
                            href="/"
                            className={cn(
                                buttonVariants({ variant: 'ghost' }),
                                isDesktop
                                    ? 'absolute left-4 top-4 md:left-8 md:top-8 hover:bg-transparent'
                                    : 'absolute left-4 top-4 md:left-8 md:top-8',
                            )}
                        >
                            <motion.div variants={svgMotion}>
                                <Icons.chevronLeft className="mr-2 h-4 w-4" />
                            </motion.div>
                            Back
                        </Link>{' '}
                    </motion.div>

                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <Icons.logo className="mx-auto h-6 w-6" />
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Create an account
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Enter your email below to create your account
                            </p>
                        </div>
                        <React.Suspense>
                            <UserAuthForm registerMode={true} />
                        </React.Suspense>

                        <p className="px-8 text-center text-sm text-muted-foreground">
                            By clicking continue, you agree to our{' '}
                            <TermsOfService /> and <PrivacyPolicy />.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
