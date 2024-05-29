import { useState } from 'react'

import Link from 'next/link'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Label } from '@/components/ui/label'
import { useMediaQuery } from '@/hooks/use-media-query'
import { cn } from '@/lib/utils'

function PrivacyPolicyForm({ className }: React.ComponentProps<'div'>) {
    return (
        <ScrollArea
            className={cn(
                'h-[450px] w-[600px]rounded-lg border p-4 font-light',
                className,
            )}
        >
            <div className="mt-1">
                <Label className={'font-bold text-md'}>
                    Last Updated: 12/26/23
                </Label>
                <p className="mt-1">
                    This Privacy Policy (&quot;Policy&quot;) outlines how Misho
                    (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;)
                    collects, uses, and protects your personal information when
                    you use Misho and its related services (collectively, the
                    &quot;Service&quot;). By using the Service, you agree to the
                    terms of this Policy. If you do not agree with the terms of
                    this Policy, please do not use the Service.
                </p>
            </div>
            <div className="mt-4">
                <Label className={'font-bold text-md'}>
                    1. Information We Collect
                </Label>
                <p className="mt-1">
                    <span className="font-semibold">
                        1.1. Personal Information:
                    </span>{' '}
                    When you register for an account or make a donation on our
                    platform, we may collect personal information, including but
                    not limited to your name, email address, and payment
                    information.
                </p>
                <p className="mt-1">
                    <span className="font-semibold">
                        1.2. Non-Personal Information:
                    </span>{' '}
                    We may also collect non-personal information, such as
                    browser type, operating system, and IP address, to improve
                    the Service and user experience.
                </p>
            </div>
            <div className="mt-4">
                <Label className={'font-bold text-md'}>
                    2. How We Use Your Information
                </Label>
                <p className="mt-1">
                    <span className="font-semibold">2.1.</span> We may use your
                    personal information to: provide customer support, send
                    important notices or updates, and more.
                </p>
                <p className="mt-1">
                    <span className="font-semibold">2.2.</span> We may use
                    non-personal information for analytics and to improve the
                    Service.
                </p>
            </div>
            <div className="mt-4">
                <Label className={'font-bold text-md'}>3. Donations</Label>
                <p className="mt-1">
                    <span className="font-semibold">3.1.</span> We do not sell,
                    trade, or otherwise transfer your personal information to
                    third parties without your consent, except as described in
                    this Policy.
                </p>
                <p className="mt-1">
                    <span className="font-semibold">3.2.</span> We may share
                    your information with trusted third-party service providers
                    who assist us in operating the Service, conducting our
                    business, or servicing you.
                </p>
            </div>
            <div className="mt-4">
                <Label className={'font-bold text-md'}>4. Security</Label>
                <p className="mt-1">
                    <span className="font-semibold">4.1.</span>We implement
                    security measures to protect your personal information.
                    However, no method of transmission over the internet or
                    electronic storage is 100% secure, and we cannot guarantee
                    absolute security.
                </p>
            </div>
            <div className="mt-4">
                <Label className={'font-bold text-md'}>5. Cookies</Label>
                <p className="mt-1">
                    <span className="font-semibold">5.1.</span>We use cookies to
                    enhance your experience on the Service. You can choose to
                    disable cookies through your browser settings.
                </p>
            </div>
            <div className="mt-4">
                <Label className={'font-bold text-md'}>
                    6. Third-Party Links
                </Label>
                <p className="mt-1">
                    <span className="font-semibold">6.1.</span> The Service may
                    contain links to third-party websites. We are not
                    responsible for the privacy practices of these websites.
                    Please review the privacy policies of third-party sites
                    before providing any personal information.
                </p>
            </div>
            <div className="mt-4">
                <Label className={'font-bold text-md'}>
                    7. Children&apos;s Privacy
                </Label>
                <p className="mt-1">
                    <span className="font-semibold">7.1.</span> The Service is
                    not directed at children under the age of 13. We do not
                    knowingly collect personal information from children under
                    13. If you are a parent or guardian and believe your child
                    has provided us with personal information, please contact
                    us.
                </p>
            </div>
            <div className="mt-4">
                <Label className={'font-bold text-md'}>
                    8. Changes to this Privacy Policy
                </Label>
                <p className="mt-1">
                    <span className="font-semibold">8.1.</span> We may update
                    this Privacy Policy from time to time. We will notify you of
                    any changes by posting the new Privacy Policy on this page.
                </p>
            </div>
            <div className="mt-4">
                <Label className={'font-bold text-md'}>
                    9. Contact Information
                </Label>
                <p className="mt-1">
                    <span className="font-semibold">9.1.</span> If you have any
                    questions about this Privacy Policy, please contact us at
                    founder@gmail.com.
                </p>
            </div>
            <div className="mt-4">
                <Label className={'font-bold text-md'}>
                    10. Changes to Terms
                </Label>
                <p className="mt-1">
                    <span className="font-semibold">10.1.</span> We may update
                    this Policy from time to time. Your continued use of the
                    Service after the effective date of any changes constitutes
                    your acceptance of the updated Terms.
                </p>
            </div>
            <div className="mt-4">
                <Label className={'font-bold text-md'}>11. Governing Law</Label>
                <p className="mt-1">
                    <span className="font-semibold">11.1.</span> These Terms are
                    governed by and construed in accordance with the laws of the
                    United States.
                </p>
            </div>
        </ScrollArea>
    )
}

export const PrivacyPolicy = () => {
    const [open, setOpen] = useState(false)
    const isDesktop = useMediaQuery('(min-width: 768px)')

    if (isDesktop)
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Link
                        href="#"
                        className="underline underline-offset-4 hover:text-primary"
                    >
                        Privacy Policy
                    </Link>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] lg:max-w-[550px]">
                    <DialogHeader>
                        <DialogTitle>Terms of Service</DialogTitle>
                    </DialogHeader>
                    <PrivacyPolicyForm />
                </DialogContent>
            </Dialog>
        )
    else
        return (
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger asChild>
                    <Link
                        href=""
                        className="underline underline-offset-4 hover:text-primary"
                    >
                        Privacy Policy
                    </Link>
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader className="text-left">
                        <DrawerTitle>Privacy Policy</DrawerTitle>
                    </DrawerHeader>
                    <PrivacyPolicyForm className="px-4" />
                    <DrawerFooter className="pt-2">
                        <DrawerClose asChild>
                            <Button variant="outline">Close</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        )
}
