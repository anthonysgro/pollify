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

function TermsOfServiceForm({ className }: React.ComponentProps<'div'>) {
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
                    Welcome to Pollify! These Terms of Service
                    (&quot;Terms&quot;) constitute a legally binding agreement
                    between you and Pollify (&quot;we,&quot; &quot;us,&quot; or
                    &quot;our&quot;) governing your use of Pollify and its related
                    services (collectively, the &quot;Service&quot;). By
                    accessing or using the Service, you agree to be bound by
                    these Terms. If you do not agree to these Terms, please do
                    not use the Service.
                </p>
            </div>
            <div className="mt-4">
                <Label className={'font-bold text-md'}>1. Eligibility</Label>
                <p className="mt-1">
                    <span className="font-semibold">1.1.</span> You must be at
                    least 18 years old to use the Service. By using the Service,
                    you represent and warrant that you are 18 years or older.
                </p>
            </div>
            <div className="mt-4">
                <Label className={'font-bold text-md'}>
                    2. Account Registration
                </Label>
                <p className="mt-1">
                    <span className="font-semibold">2.1.</span> To access
                    certain features of the Service, you may be required to
                    register for an account. You agree to provide accurate,
                    current, and complete information during the registration
                    process and to update such information to keep it accurate,
                    current, and complete.
                </p>
                <p className="mt-1">
                    <span className="font-semibold">2.2.</span> You are
                    responsible for maintaining the confidentiality of your
                    account and password and for restricting access to your
                    computer or device. You agree to accept responsibility for
                    all activities that occur under your account.
                </p>
            </div>
            <div className="mt-4">
                <Label className={'font-bold text-md'}>
                    4. Prohibited Activities
                </Label>
                <p className="mt-1">
                    <span className="font-semibold">4.1.</span> Users agree not
                    to use the Service for any unlawful or prohibited purpose.
                </p>
                <p className="mt-1">
                    <span className="font-semibold">4.2.</span> Users may not
                    engage in any fraudulent or deceptive activities on the
                    platform, including misrepresenting the purpose of
                    donations.
                </p>
                <p className="mt-1">
                    <span className="font-semibold">4.3.</span> You may not use
                    the Service to violate any applicable federal, state, or
                    local laws, including but not limited to, regulations
                    promulgated by the U.S. Department of the Treasury, the
                    Internal Revenue Service, or other governmental agencies.
                </p>
            </div>
            <div className="mt-4">
                <Label className={'font-bold text-md'}>5. Privacy</Label>
                <p className="mt-1">
                    <span className="font-semibold">5.1.</span> Your privacy is
                    important to us. Please review our Privacy Policy [Link to
                    Privacy Policy] to understand how we collect, use, and
                    disclose information.
                </p>
            </div>
            <div className="mt-4">
                <Label className={'font-bold text-md'}>
                    6. Intellectual Property
                </Label>
                <p className="mt-1">
                    <span className="font-semibold">6.1.</span> All content,
                    trademarks, service marks, and logos on the Service are the
                    property of The Service or its licensors. Users are
                    prohibited from using, copying, or distributing such content
                    without permission.
                </p>
            </div>
            <div className="mt-4">
                <Label className={'font-bold text-md'}>7. Termination</Label>
                <p className="mt-1">
                    <span className="font-semibold">7.1.</span> We reserve the
                    right to terminate or suspend your account and access to the
                    Service for any reason, without notice.
                </p>
            </div>
            <div className="mt-4">
                <Label className={'font-bold text-md'}>
                    8. Limitation of Liability
                </Label>
                <p className="mt-1">
                    <span className="font-semibold">8.1.</span> To the fullest
                    extent permitted by law, Pollify shall not be liable for any
                    indirect, incidental, special, consequential, or punitive
                    damages.
                </p>
            </div>
            <div className="mt-4">
                <Label className={'font-bold text-md'}>
                    9. Dispute Resolution and Arbitration Agreement
                </Label>
                <p className="mt-1">
                    <span className="font-semibold">9.1.</span> Any disputes
                    arising out of or relating to these Terms or the Service
                    will be resolved through binding arbitration, in accordance
                    with the American Arbitration Association&apos;s rules.
                </p>
            </div>
            <div className="mt-4">
                <Label className={'font-bold text-md'}>
                    10. Changes to Terms
                </Label>
                <p className="mt-1">
                    <span className="font-semibold">10.1.</span> We may update
                    these Terms from time to time. Your continued use of the
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

export const TermsOfService = () => {
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
                        Terms of Service
                    </Link>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] lg:max-w-[550px]">
                    <DialogHeader>
                        <DialogTitle>Terms of Service</DialogTitle>
                    </DialogHeader>
                    <TermsOfServiceForm />
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
                        Terms of Service
                    </Link>
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader className="text-left">
                        <DrawerTitle>Terms of Service</DrawerTitle>
                    </DrawerHeader>
                    <TermsOfServiceForm className="px-4" />
                    <DrawerFooter className="pt-2">
                        <DrawerClose asChild>
                            <Button variant="outline">Close</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        )
}
