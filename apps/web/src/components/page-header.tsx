import Balance from 'react-wrap-balancer'

import { cn } from '@/lib/utils'

function PageHeader({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <section
            className={cn(
                'flex max-w-[980px] flex-col items-start gap-2 px-4 pt-8 md:pt-12',
                className,
            )}
            {...props}
        >
            {children}
        </section>
    )
}

function PageHeaderHeading({
    className,
    ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h2
            className={cn(
                'text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]',
                className,
            )}
        >
            <Balance {...props} />
        </h2>
    )
}

function PageHeaderHeadingH2({
    className,
    ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h2
            className={cn(
                'text-2xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]',
                className,
            )}
        >
            <Balance {...props} />
        </h2>
    )
}

function PageHeaderDescription({
    className,
    ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
    return (
        <Balance
            className={cn(
                'max-w-[750px] text-lg text-muted-foreground sm:text-xl',
                className,
            )}
            {...props}
        />
    )
}

export {
    PageHeader,
    PageHeaderHeading,
    PageHeaderDescription,
    PageHeaderHeadingH2,
}
