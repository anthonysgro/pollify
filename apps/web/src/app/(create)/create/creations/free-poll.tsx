'use client'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { DragEndEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import 'filepond/dist/filepond.min.css'
import { z } from 'zod'
import { PollTypeFormField } from './poll-type-form-field'
import { pollTypes } from '../data/presets'
import { Separator } from '@/components/ui/separator'
import { PollType } from '../data/presets'
import { Calendar } from '@/components/ui/calendar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { DateTime } from 'luxon'
import { TitleFormField } from './title-form-field'
import { OptionalFormField } from './optional-form-fields'
import { SortableAnswerFormField } from './sortable-answer-form-field'
import { FormSchema, formSchema } from '../formSchema'

type DateRange = {
    startDate: DateTime
    endDate: DateTime
    key: string
}

const SortableList: React.FC = () => {
    const [files, setFiles] = useState<File[]>([])
    const [submissionError, setSubmissionError] = useState<Error | null>(null)
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [progress, setProgress] = useState<number>(0)
    const [isDragging, setIsDragging] = useState<boolean>(false)
    const [selectedPollType, setSelectedPollType] = useState<
        PollType | undefined
    >(pollTypes.find((pollType) => pollType.id === 0))
    const [selectedDates, setSelectedDates] = useState<Date[]>([])

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
            pollType: 0,
        },
    })

    const { fields, append, remove, replace } = useFieldArray({
        control: form.control,
        name: 'textAnswers',
    })

    const handleChangeSelectedPollType = (pollType: PollType) => {
        form.setValue('pollType', pollType.id)
        setSelectedPollType(pollType)
    }

    const incrementFakeProgressBar = () => {
        setProgress((prevProgress) => {
            if (prevProgress < 90) {
                return prevProgress + 0.5 // Increment by 10
            }
            return prevProgress
        })
    }

    const onSubmit = async (values: FormSchema) => {
        if (!selectedPollType) throw new Error('Invalid state')

        setIsSubmitting(true)
        setProgress(0)
        const progressInterval = setInterval(incrementFakeProgressBar, 25) // Increment every 500ms

        const formData = new FormData()
        formData.append('title', values.title)
        formData.append('description', values.description || '')
        formData.append('pollTypeId', selectedPollType.id.toString())
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
        remove(fields.findIndex((answer) => answer.id === id))
    }

    const handleAddAnswer = () => {
        append({ text: '', placeholder: `Answer ${fields.length + 1}` })
    }

    const handleDragEnd = (event: DragEndEvent) => {
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

    const options = {
        weekday: 'short' as 'short', // "Mon"
        year: 'numeric' as 'numeric',
        month: 'long' as 'long', // "June"
        day: 'numeric' as 'numeric', // "24"
    }

    console.log(form.getValues())

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
                        selectedPollType={selectedPollType}
                        handleChangeSelectedPollType={
                            handleChangeSelectedPollType
                        }
                    />
                    {selectedPollType?.id === 0 && (
                        <SortableAnswerFormField
                            form={form}
                            fields={fields}
                            handleAddAnswer={handleAddAnswer}
                            handleRemoveAnswer={handleRemoveAnswer}
                            isDragging={isDragging}
                            setIsDragging={setIsDragging}
                            handleDragEnd={handleDragEnd}
                        />
                    )}
                    {/* {selectedPollType?.id === 1 && (
                        <>
                            <div className="sm:grid sm:grid-cols-2 sm:gap-6">
                                <Calendar
                                    mode="multiple"
                                    selected={selectedDates}
                                    onSelect={(dates) =>
                                        setSelectedDates(dates || [])
                                    }
                                    className="rounded-md border max-w-sm mx-auto sm:max-w-lg sm:w-full p-4"
                                />
                                <div className="rounded-md border mt-6 sm:mt-0 max-w-sm mx-auto sm:max-w-lg sm:w-full flex justify-center items-center w-full h-full">
                                    <div className="flex flex-col p-4 justify-center h-full w-full">
                                        <div className="font-medium pt-1 pb-1 text-center">
                                            Date Selections
                                        </div>
                                        <ScrollArea className="max-h-[270px] overflow-y-auto">
                                            {selectedDates.length === 0 ? (
                                                <div className="text-muted-foreground text-sm text-center">
                                                    Click on a date in the
                                                    calendar to get started
                                                </div>
                                            ) : (
                                                selectedDates.map((date) => (
                                                    <div className="rounded-md border text-sm font-medium bg-primary text-primary-foreground my-2 p-2 space-y-2">
                                                        <p>
                                                            {date.toLocaleDateString(
                                                                'en-US',
                                                                options,
                                                            )}
                                                        </p>
                                                        <div className="flex space-x-2">
                                                            <Input
                                                                type="time"
                                                                className="border hover:bg-accent hover:text-accent-foreground bg-background border-input shadow-sm text-card-foreground"
                                                            />
                                                            <Input
                                                                type="time"
                                                                className="border hover:bg-accent hover:text-accent-foreground bg-background border-input shadow-sm text-card-foreground"
                                                            />
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </ScrollArea>
                                    </div>
                                </div>
                            </div>
                        </>
                    )} */}
                    <Separator />
                    <Button type="submit">Submit</Button>
                    {isSubmitting && <Progress value={progress} />}
                </form>
            </Form>
        </div>
    )
}

export default SortableList
