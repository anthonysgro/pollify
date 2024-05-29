'use client'

import * as React from 'react'
import { useState } from 'react'
import * as z from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'next/navigation'
import { toast } from '@/components/ui/use-toast'
import { signIn } from 'next-auth/react'

import { userRegisterSchema, userSignInSchema } from '@/lib/validations/auth'
import { cn } from '@/lib/utils'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'

import { Input } from '@/components/ui/input'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLFormElement> {
    registerMode: boolean
}

export function UserAuthForm({
    className,
    registerMode,
    ...props
}: UserAuthFormProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false)
    const searchParams = useSearchParams()
    type RegisterFormData = z.infer<typeof userRegisterSchema>
    type SignInFormData = z.infer<typeof userSignInSchema>

    const form = useForm<RegisterFormData | SignInFormData>({
        resolver: zodResolver(
            registerMode ? userRegisterSchema : userSignInSchema,
        ),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    async function onSubmit(data: RegisterFormData | SignInFormData) {
        setIsLoading(true)

        const signInResult = await signIn('cognito', {
            email: data.email.toLowerCase(),
            redirect: true,
            callbackUrl: searchParams?.get('from') || '/dashboard',
        })

        setIsLoading(false)

        if (!signInResult?.ok) {
            return toast({
                title: 'Something went wrong.',
                description: 'Your sign in request failed. Please try again.',
                variant: 'destructive',
            })
        }

        return toast({
            title: 'Check your email',
            description:
                'We sent you a login link. Be sure to check your spam too.',
        })
    }

    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className={cn('grid gap-6', className)}
                    {...props}
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <>
                                        <Input
                                            placeholder="name@example.com"
                                            id="email"
                                            type="email"
                                            autoCapitalize="none"
                                            autoComplete="email"
                                            autoCorrect="off"
                                            disabled={
                                                isLoading || isGoogleLoading
                                            }
                                            {...form.register('email')}
                                            {...field}
                                        />
                                    </>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <>
                                        <Input
                                            placeholder="Password"
                                            id="password"
                                            type="password"
                                            autoCapitalize="none"
                                            autoComplete="password"
                                            autoCorrect="off"
                                            hidden={true}
                                            disabled={
                                                isLoading || isGoogleLoading
                                            }
                                            {...form.register('password')}
                                            {...field}
                                        />
                                    </>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {registerMode ? (
                        <FormField
                            control={form.control}
                            name="confirm"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <>
                                            <Input
                                                placeholder="Confirm password"
                                                id="confirm"
                                                type="password"
                                                hidden={true}
                                                disabled={
                                                    isLoading || isGoogleLoading
                                                }
                                                {...form.register('confirm')}
                                                {...field}
                                            />
                                        </>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ) : (
                        ''
                    )}

                    <Button disabled={isLoading}>
                        {isLoading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Continue
                    </Button>
                </form>
            </Form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
            </div>
            <Button
                variant="outline"
                type="button"
                onClick={() => {
                    setIsGoogleLoading(true)
                    signIn('google', {
                        redirect: true,
                        callbackUrl: '/dashboard',
                    })
                }}
                disabled={isLoading || isGoogleLoading}
            >
                {isGoogleLoading ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Icons.google className="mr-2 h-5 w-5" />
                )}{' '}
                Google
            </Button>
        </>
    )
}
