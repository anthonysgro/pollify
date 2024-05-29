import FloatingBackButton from './floating-back-button'
import { Icons } from './icons'

export const ComingSoon = () => {
    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <FloatingBackButton />
            <div className="flex flex-col space-y-2 text-center">
                <Icons.logo className="mx-auto h-6 w-6" />
                <h1 className="text-2xl font-semibold tracking-tight">
                    Coming Soon
                </h1>
                <p className="text-sm text-muted-foreground">
                    We are working hard to bring this page soon!
                </p>
            </div>
        </div>
    )
}
