import * as React from 'react'
import { FormSchema } from '../formSchema'
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { UseFormReturn } from 'react-hook-form'

interface TitleFormFieldProps {
    form: UseFormReturn<FormSchema, any, undefined>
}

export function TitleFormField({ form, ...props }: TitleFormFieldProps) {
    return (
        <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                        <Input
                            className="disabled bg-background"
                            placeholder="type here..."
                            {...field}
                        />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
