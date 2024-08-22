import { z } from 'zod'
import { DateTime } from 'luxon'

export const formSchema = z.object({
    title: z.string().min(2, {
        message: 'Title must be at least 2 characters.',
    }),
    description: z.string().min(0).optional(),
    textAnswers: z
        .array(
            z.object({
                text: z.string().min(1, { message: 'Answer cannot be empty.' }),
                placeholder: z
                    .string()
                    .min(1, { message: 'Internal App Error. ' }),
            }),
        )
        .min(1, { message: 'At least one answer is required.' }),
    scheduledAnswers: z.array(
        z.object({
            from: z.date(),
            to: z.date(),
        }),
    ),
    dayPickerMode: z.boolean({ message: 'Invalid day picker mode' }),
    pollType: z.enum(['simple', 'schedule'], {
        required_error: 'You need to select a poll type.',
    }),
})

export type FormSchema = z.infer<typeof formSchema>

export type DateRange = {
    from: DateTime
    t: DateTime
}

export type DateRangeJS = {
    from: Date
    to: Date
}
