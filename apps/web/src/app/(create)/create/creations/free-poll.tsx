'use client'

import { Button } from '@/components/ui/button'
import { Form, useFormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { DragEndEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import 'filepond/dist/filepond.min.css'
import { PollTypeFormField } from './poll-type-form-field'
import { Separator } from '@/components/ui/separator'
import { PollType } from '../data/presets'
import { TitleFormField } from './title-form-field'
import { OptionalFormField } from './optional-form-fields'
import { SortableAnswerFormField } from './sortable-answer-form-field'
import { ScheduledAnswerFormField } from './schedule-answer-form-field'
import { FormSchema, formSchema, DateRange, DateRangeJS } from '../formSchema'
import { DateTime } from 'luxon'

const SortableList: React.FC = () => {
    const [files, setFiles] = useState<File[]>([])
    const [submissionError, setSubmissionError] = useState<Error | null>(null)
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [progress, setProgress] = useState<number>(0)
    const [isDragging, setIsDragging] = useState<boolean>(false)

    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            description: '',
            textAnswers: [
                { text: '', placeholder: 'Answer 1' },
                { text: '', placeholder: 'Answer 2' },
                { text: '', placeholder: 'Answer 3' },
            ],
            scheduledAnswers: [],
            dayPickerMode: true,
            pollType: "simple",
        },
    })

    const textAnswers = useFieldArray({
        control: form.control,
        name: 'textAnswers',
    })

    const incrementFakeProgressBar = () => {
        setProgress((prevProgress) => {
            if (prevProgress < 90) {
                return prevProgress + 0.5 // Increment by 10
            }
            return prevProgress
        })
    }

    const onSubmit = async (values: FormSchema) => {
        setIsSubmitting(true)
        setProgress(0)
        const progressInterval = setInterval(incrementFakeProgressBar, 25) // Increment every 500ms

        const formData = new FormData()
        formData.append('title', values.title)
        formData.append('description', values.description || '')
        formData.append('pollTypeId', values.pollType.toString())
        formData.append(
            'textAnswers',
            JSON.stringify(
                values.textAnswers.map((textAnswer, i) => {
                    return { ...textAnswer, index: i }
                }),
            ),
        )
        files.forEach((file) => {
            formData.append('image', file)
        })

        try {
            const response = await fetch('/api/polls', {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) {
                throw new Error('Network response was not ok')
            }

            const data = await response.json()
        } catch (error) {
            if (error instanceof Error) {
                setSubmissionError(error)
            }
        } finally {
            // Simulate some delay for the progress to reach 100% smoothly
            setTimeout(() => {
                clearInterval(progressInterval) // Clear the interval
                setProgress(100) // Set progress to 100%

                setTimeout(() => setIsSubmitting(false), 1000)
            }, 1000)
        }
    }

    const handleRemoveAnswer = (id: string) => {
        const { fields, remove } = textAnswers
        remove(fields.findIndex((answer) => answer.id === id))
    }

    const handleAddAnswer = () => {
        const { fields, append } = textAnswers
        append({ text: '', placeholder: `Answer ${fields.length + 1}` })
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { fields, replace } = textAnswers

        setIsDragging(false)
        const { active, over } = event
        if (active.id !== over?.id) {
            const oldIndex = fields.findIndex(
                (answer) => answer.id === active.id,
            )
            const newIndex = fields.findIndex(
                (answer) => answer.id === over?.id,
            )

            replace(
                arrayMove(form.getValues('textAnswers'), oldIndex, newIndex),
            )
        }
    }

    console.log(form.getValues())

    const selectedPollType = form.watch("pollType");

    return (
        <div className="p-8 bg-card text-card-foreground rounded-xl border">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <TitleFormField form={form} />
                    <OptionalFormField
                        form={form}
                        files={files}
                        setFiles={setFiles}
                    />
                    <PollTypeFormField
                        form={form}
                    />
                    {selectedPollType === "simple" && (
                        <SortableAnswerFormField
                            form={form}
                            fields={textAnswers.fields}
                            handleAddAnswer={handleAddAnswer}
                            handleRemoveAnswer={handleRemoveAnswer}
                            isDragging={isDragging}
                            setIsDragging={setIsDragging}
                            handleDragEnd={handleDragEnd}
                        />
                    )}
                    {selectedPollType === "schedule" && (
                        <ScheduledAnswerFormField
                            form={form}
                        />
                    )}
                    <Separator />
                    <Button type="submit">Submit</Button>
                    {isSubmitting && <Progress value={progress} />}
                </form>
            </Form>
        </div>
    )
}

export default SortableList
