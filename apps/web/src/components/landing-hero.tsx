'use client'

import UIHeroVideo from '../../public/videos/groupy-lander.mp4'
import Balance from 'react-wrap-balancer'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import { useUser } from '@auth0/nextjs-auth0/client'
import { siteConfig } from '@/config/site'

export const LandingHero = () => {
    const videoRef: React.MutableRefObject<null | HTMLVideoElement> =
        useRef(null)
    const [paused, setPaused] = useState(false)
    const user = useUser()

    const handleVideoPlayPause = () => {
        setPaused(!paused)
        paused ? videoRef.current?.play() : videoRef.current?.pause()
    }

    return (
        <div className="relative h-[calc(100vh-3.5rem)] w-full min-h-[500px] lg:min-h-[600px] mb-10">
            <div className="theme-light-gray relative h-full w-full">
                <video
                    src={UIHeroVideo}
                    className="relative z-20 h-full w-full object-cover transition-opacity duration-300 pointer visible opacity-100"
                    autoPlay
                    muted
                    aria-hidden="true"
                    playsInline
                    loop
                    typeof="video/mp4"
                    ref={videoRef}
                >
                    Your browser does not support the video tag
                </video>
                <div className="absolute bottom-gutter bottom-24 sm:bottom-14 right-[24px] z-40">
                    <Button
                        variant="outline"
                        className="mt-spacing-6 lg:mr-10 lg:w-[100px] py-0 flex flex-row flex-wrap items-center md:mr-0 pointer-events-auto"
                        onClick={() => handleVideoPlayPause()}
                    >
                        <span className="flex items-center">
                            {paused ? Icons.play() : Icons.pause()}{' '}
                            <span className="f-ui-1 hidden md:flex">
                                {paused ? 'Play' : 'Pause'}
                            </span>
                        </span>
                    </Button>
                </div>
            </div>
            <div className="absolute top-0 right-0 bottom-0 left-0 z-[20] pointer-events-none bg-[rgba(0,0,0,.28)] dark:bg-[rgba(0,0,0,0.56)] h-full" />
            <div className="container absolute bottom-24 sm:bottom-14 md:bottom-22 left-0 right-0">
                <div className="cols-container">
                    <div className="relative z-40 lg:ml-40 xs:w-6-cols md:w-8-cols lg:w-8-cols mr-20 md:mr-60 lg:mr-96 ">
                        <h1 className="font-bold leading-tight f-display-2 tracking-tight text-3xl sm:text-5xl md:text-5xl lg:leading-[1.1] pointer-events-auto text-white [-webkit-text-stroke-width:1px] [-webkit-text-stroke-color:rgba(0,0,0,0.15)] dark:[-webkit-text-stroke-width:0px] dark:[-webkit-text-stroke-color:current]">
                            <Balance>{siteConfig.description}</Balance>
                        </h1>
                        <h2 className="sr-only" id="heroLinks">
                            Quicklinks
                        </h2>
                        <Button
                            variant="outline"
                            className="mt-6 hidden mt-spacing-6 mr-60 py-0 sm:flex flex-row flex-wrap items-center md:mr-0 pointer-events-auto border-secondary light"
                        >
                            <a
                                href={user ? '/dashboard' : '/login'}
                                className="ui-link group inline-block pt-[.3rem] pb-[.3rem] px-3 hover-hover:hover:bg-inverse hover-hover:hover:text-inverse hover-hover:hover:border-primary relative ui-link--inherit"
                                aria-label="Learn about Misho"
                            >
                                <span className="flex items-center">
                                    <span className="f-ui-1">
                                        {user ? 'Dashboard' : 'Log In'}
                                    </span>
                                </span>
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
