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
    scheduledAnswers:
        z.array(
            z.object({
                startDate: z.date(),
                endDate: z.date(),
            })
        ),
    pollType: z.number({ message: 'Invalid form type' }),
})

export type FormSchema = z.infer<typeof formSchema>

export type DateRange = {
    startDate: DateTime
    endDate: DateTime
    key: string
}
