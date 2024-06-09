// READ MORE: https://nextjs.org/docs/app/building-your-application/routing/route-handlers

import { db } from '@/db'
import { ANSWERS_TABLE, POLLS_TABLE } from '@/db/schema'
import { NextRequest, NextResponse } from 'next/server'
import formidable from 'formidable'
import { ZodError, z } from 'zod'
import { v4 as uuidv4 } from 'uuid'
import { zfd } from 'zod-form-data'

// To handle a GET request to /api
// eslint-disable-next-line no-unused-vars
export async function GET(req: NextRequest) {
    const allPolls = await db.select().from(POLLS_TABLE)
    return NextResponse.json({ message: allPolls }, { status: 200 })
}

// Define a schema for validation using Zod
const MAX_FILE_SIZE = 500000
const ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
]

const answerSchema = z.array(
    z.object({
        text: z.string(),
        placeholder: z.string().optional(),
        index: z
            .number()
            .min(0, 'Answer index minimum is 0')
            .max(49, 'Only 50 answers allowed maximum'),
    }),
)

const pollSchema = zfd.formData({
    title: zfd.text(),
    description: z.string().optional(),
    answers: zfd.text(),
    image: z
        .instanceof(File, { message: 'Provided image is not of type File' })
        .optional()
        .refine(
            (file) =>
                !file ||
                (file && file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`),
        )
        .refine(
            (file) =>
                !file || (file && ACCEPTED_IMAGE_TYPES.includes(file.type)),
            '.jpg, .jpeg, .png and .webp files are accepted.',
        ),
})

// To handle a POST request to /api
// eslint-disable-next-line no-unused-vars
export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const requestFormData = await req.formData()
        const { title, description, answers, image } =
            pollSchema.parse(requestFormData)
        const parsedAnswers = answerSchema.parse(JSON.parse(answers))

        let insertedPollId: string | undefined = ''

        await db.transaction(async (tx) => {
            const [insertedPoll] = await tx
                .insert(POLLS_TABLE)
                .values({ title, description, image: '', pollType: 1 })
                .returning()
                .catch((err) => {
                    throw new Error('Error inserting poll into DB:', err)
                })

            parsedAnswers.forEach(async (ans) => {
                await tx
                    .insert(ANSWERS_TABLE)
                    .values({
                        text: ans.text,
                        pollId: insertedPoll?.pollId,
                        index: ans.index,
                    })
                    .catch((err) => {
                        throw new Error('Error inserting answer into DB:', err)
                    })
            })

            insertedPollId = insertedPoll?.pollId
        })

        if (!insertedPollId)
            throw new Error('Server error saving poll to database')

        // If validation passes, proceed with your logic
        return NextResponse.json({ message: 'Success', pollId: insertedPollId })
    } catch (err: any) {
        // If validation fails, return an error response
        if (err instanceof z.ZodError) {
            return NextResponse.json(
                { message: 'Error parsing form data', errors: err.errors },
                { status: 400 },
            )
        }
        return NextResponse.json(
            { message: 'Internal Server Error', error: err },
            { status: 500 },
        )
    }
}

// Same logic to add a `PATCH`, `DELETE`...
