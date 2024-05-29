'use client'

import React from 'react'
import {
    PageHeader,
    PageHeaderDescription,
    PageHeaderHeading,
} from '@/components/page-header'

import Link from 'next/link'
import Image, { StaticImageData } from 'next/image'
import { Separator } from '@/components/ui/separator'
import { ArrowRightIcon } from '@radix-ui/react-icons'
import { MotionContent } from './motion-content'
import VerticalOne from '../../public/vertical-one.png'
import VerticalTwo from '../../public/vertical-two.jpg'

import { cn } from '@/lib/utils'

interface IHomepageContentItem {
    title: string
    description: string
    img: StaticImageData
    banner: {
        active: boolean
        sm?: string
        lg?: string
        link?: string
    }
    options: {
        reversed: boolean
    }
}

const homepageContentItems: IHomepageContentItem[] = [
    {
        title: 'The Future of Charitable Giving.',
        description:
            'Directly contribute to in-need individuals, bypassing third-party trusts. Accessible. Decentralized. Seamless.',
        img: VerticalTwo,
        banner: {
            active: true,
            link: '/docs/changelog',
            sm: 'Style, a new CLI and more.',
            lg: 'View the latest news in direct donation',
        },
        options: {
            reversed: false,
        },
    },
    {
        title: 'Feel secure in your philanthropy.',
        description:
            'Donate to target communities with less exposure to common worries like embezzlement and malpractice.',
        img: VerticalOne,
        banner: {
            active: false,
        },
        options: {
            reversed: true,
        },
    },
]

const ContentItem = ({
    props,
}: {
    props: IHomepageContentItem
}): React.JSX.Element => {
    const { title, description, img, banner, options } = props

    const reversedClassName = options.reversed
        ? 'lg:flex-row-reverse'
        : 'lg:flex-row'

    return (
        <div
            className={cn(
                'relative flex flex-col items-center m-8',
                reversedClassName,
            )}
        >
            <MotionContent className="lg:sticky top-10 h-auto lg:self-start mb-8 text-center lg:text-start">
                <PageHeader className="items-center flex flex-col pb-8 m-0 p-0 lg:mx-8 lg:items-start ">
                    {banner.active ? (
                        <Link
                            href={banner.link || ''}
                            className="inline-flex rounded-lg bg-muted px-3 py-1 text-sm font-medium"
                        >
                            🎉
                            <Separator
                                className="mx-2 h-4"
                                orientation="vertical"
                            />{' '}
                            <span className="sm:hidden">{banner.sm}</span>
                            <span className="hidden sm:inline">
                                {banner.lg}
                            </span>
                            <ArrowRightIcon className="ml-1 h-4 w-4" />
                        </Link>
                    ) : (
                        ''
                    )}
                    <PageHeaderHeading>{title}</PageHeaderHeading>
                    <PageHeaderDescription>{description}</PageHeaderDescription>
                </PageHeader>
            </MotionContent>
            <MotionContent className="w-[75%]  max-h-[175vph]">
                <Image
                    src={img}
                    alt="Picture of mountains"
                    className="rounded-lg"
                    placeholder="blur"
                    priority={true}
                />
            </MotionContent>
        </div>
    )
}

export const HomepageContent = () => {
    return (
        <>
            <section className="container relative">
                {homepageContentItems.map((contentItem) => (
                    <ContentItem props={contentItem} key={contentItem.title} />
                ))}
            </section>
            <section className="container relative py-[50vh]">
                <MotionContent className="top-10 h-auto mb-8 justify-center text-center">
                    <PageHeader className="max-w-none items-center flex flex-col pb-8 m-0 p-0 lg:mx-8">
                        <PageHeaderHeading>Coming 2024</PageHeaderHeading>
                    </PageHeader>
                </MotionContent>
            </section>
        </>
    )
}
