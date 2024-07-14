'use client'

import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import {
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    closestCenter,
    useSensor,
    useSensors,
} from '@dnd-kit/core'
import { restrictToWindowEdges } from '@dnd-kit/modifiers'
import {
    SortableContext,
    arrayMove,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { FilePond, registerPlugin } from 'react-filepond'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import 'filepond/dist/filepond.min.css'
import { z } from 'zod'
import { FilePondFile } from 'filepond'
import SortableAnswer from './sortable-answer'
import { Textarea } from '@/components/ui/textarea'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { Icons } from '@/components/icons'
import { PollTypeSelector } from '../components/polltype-selector'
import { pollTypes } from '../data/presets'
import { Separator } from '@/components/ui/separator'
import { PollType } from '../data/presets'
import { Calendar } from '@/components/ui/calendar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { DateTime } from 'luxon'

export const formSchema = z.object({
    title: z.string().min(2, {
        message: 'Title must be at least 2 characters.',
    }),
    description: z.string().min(0).optional(),
    answers: z
        .array(
            z.object({
                text: z.string().min(1, { message: 'Answer cannot be empty.' }),
                placeholder: z
                    .string()
                    .min(1, { message: 'Internal App Error. ' }),
            }),
        )
        .min(1, { message: 'At least one answer is required.' }),
    pollType: z.number({ message: 'Invalid form type' }),
})

type DateRange = {
    startDate: DateTime;
    endDate: DateTime;
    key: string;
}

const SortableList: React.FC = () => {
    registerPlugin(FilePondPluginImagePreview, FilePondPluginFileValidateType)

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    )

    const [files, setFiles] = useState<File[]>([])
    const [submissionError, setSubmissionError] = useState<Error | null>(null)
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [progress, setProgress] = useState<number>(0)
    const [hoveredId, setHoveredId] = useState<string | undefined>(undefined)
    const [isDragging, setIsDragging] = useState<boolean>(false)
    const [accordianIsOpen, setAccordionIsOpen] = useState<boolean>(false)
    const [selectedPollType, setSelectedPollType] = useState<
        PollType | undefined
    >(pollTypes.find((pollType) => pollType.id === 1))
    const [selectedDates, setSelectedDates] = useState<Date[]>([])

    const handleMouseEnter = (id: string) => {
        if (!isDragging) setHoveredId(id)
    }

    const handleMouseLeave = () => {
        if (!isDragging) setHoveredId(undefined)
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            description: '',
            answers: [
                { text: '', placeholder: 'Answer 1' },
                { text: '', placeholder: 'Answer 2' },
                { text: '', placeholder: 'Answer 3' },
            ],
        },
    })

    const { fields, append, remove, replace } = useFieldArray({
        control: form.control,
        name: 'answers',
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if (!selectedPollType) throw new Error('Invalid state')

        setIsSubmitting(true)
        setProgress(0)

        // Function to increment progress
        const incrementProgress = () => {
            setProgress((prevProgress) => {
                if (prevProgress < 90) {
                    return prevProgress + 0.5 // Increment by 10
                }
                return prevProgress
            })
        }
        const progressInterval = setInterval(incrementProgress, 25) // Increment every 500ms

        const formData = new FormData()

        formData.append('title', values.title)
        formData.append('description', values.description || '')
        formData.append('pollTypeId', selectedPollType.id.toString())
        formData.append(
            'answers',
            JSON.stringify(
                values.answers.map((answer, i) => {
                    return { ...answer, index: i }
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

            console.log(data)
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

            replace(arrayMove(form.getValues('answers'), oldIndex, newIndex))
        }
    }

    const options = {
        weekday: 'short' as 'short', // "Mon"
        year: 'numeric' as 'numeric',
        month: 'long' as 'long', // "June"
        day: 'numeric' as 'numeric', // "24"
    }

    return (
        <div className="p-8 bg-card text-card-foreground rounded-xl border">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <div>
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
                        <Accordion
                            type="single"
                            collapsible
                            className="w-full mt-0"
                        >
                            <AccordionItem value="item-1" className="border-0">
                                <AccordionTrigger
                                    className="hover:no-underline text-muted-foreground pt-2 pb-0 mb-4"
                                    onClick={() =>
                                        setAccordionIsOpen(!accordianIsOpen)
                                    }
                                >
                                    <div className="flex justify-start items-center">
                                        {accordianIsOpen ? (
                                            <>
                                                <p className="ml-1 text-xs">
                                                    Hide description
                                                </p>
                                            </>
                                        ) : (
                                            <>
                                                <Icons.add
                                                    className=""
                                                    size={16}
                                                />
                                                <p className="ml-1 text-xs">
                                                    Add description (optional)
                                                </p>
                                            </>
                                        )}
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="pb-0 space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Description
                                                </FormLabel>
                                                <FormControl>
                                                    <Textarea
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
                                    <FormItem>
                                        <FormLabel>Image</FormLabel>
                                        <FormControl className="w-[100%]">
                                            <FilePond
                                                files={files}
                                                acceptedFileTypes={['image/*']}
                                                fileValidateTypeDetectType={(
                                                    source,
                                                    type,
                                                ) =>
                                                    new Promise(
                                                        (resolve, reject) => {
                                                            resolve(type)
                                                        },
                                                    )
                                                }
                                                onupdatefiles={(
                                                    fileItems: FilePondFile[],
                                                ) => {
                                                    setFiles(
                                                        fileItems.map(
                                                            (fileItem) =>
                                                                fileItem.file as File,
                                                        ),
                                                    )
                                                }}
                                                allowMultiple={false}
                                                name="files"
                                                labelIdle='Drag & Drop your File or <span className="filepond--label-action">Browse</span>'
                                            />
                                        </FormControl>
                                    </FormItem>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                    <FormItem className="flex flex-col">
                        <FormLabel>Poll Type</FormLabel>
                        <PollTypeSelector
                            selectedPollType={selectedPollType}
                            setSelectedPollType={setSelectedPollType}
                        />
                        <FormDescription></FormDescription>
                        <FormMessage />
                    </FormItem>
                    <FormItem>
                        <FormLabel>Answers</FormLabel>
                        {selectedPollType?.id === 0 && (
                            <>
                                <DndContext
                                    sensors={sensors}
                                    collisionDetection={closestCenter}
                                    onDragStart={() => setIsDragging(true)}
                                    onDragEnd={handleDragEnd}
                                    modifiers={[restrictToWindowEdges]}
                                >
                                    <SortableContext
                                        items={fields}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        {fields.map((field, index) => {
                                            return (
                                                <FormField
                                                    key={field.id}
                                                    control={form.control}
                                                    name={`answers.${index}.text`}
                                                    render={(
                                                        fieldRenderProps,
                                                    ) => (
                                                        <SortableAnswer
                                                            field={
                                                                fieldRenderProps.field
                                                            }
                                                            index={index}
                                                            handleRemove={
                                                                handleRemoveAnswer
                                                            }
                                                            answer={field}
                                                            handleMouseEnter={() =>
                                                                handleMouseEnter(
                                                                    field.id,
                                                                )
                                                            }
                                                            handleMouseLeave={
                                                                handleMouseLeave
                                                            }
                                                            hoveredId={
                                                                hoveredId
                                                            }
                                                            isDragging={
                                                                isDragging
                                                            }
                                                        />
                                                    )}
                                                />
                                            )
                                            },
                                        )}
                                    </SortableContext>
                                </DndContext>
                                <Button type="button" onClick={handleAddAnswer}>
                                    Add Answer
                                </Button>
                            </>
                        )}
                        {selectedPollType?.id === 1 && (
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
                                                    selectedDates.map(
                                                        (date) => (
                                                            <div
                                                                className="rounded-md border text-sm font-medium bg-primary text-primary-foreground my-2 p-2 space-y-2"
                                                            >
                                                                <p>
                                                                    {date.toLocaleDateString('en-US', options)}
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
                                                        ),
                                                    )
                                                )}
                                            </ScrollArea>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </FormItem>

                    <Separator />

                    <Button type="submit">Submit</Button>
                    {isSubmitting && <Progress value={progress} />}
                </form>
            </Form>
        </div>
    )
}

export default SortableList
