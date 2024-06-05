'use client'
import React, { useRef, useState } from 'react'
import {
    DndContext,
    closestCenter,
    DragEndEvent,
    useDraggable,
    useSensors,
    PointerSensor,
    KeyboardSensor,
    useSensor,
} from '@dnd-kit/core'
import {
    arrayMove,
    defaultAnimateLayoutChanges,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { v4 as uuidv4 } from 'uuid'
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
import { Icons } from '@/components/icons'
import { z } from 'zod'
import {
    restrictToVerticalAxis,
    restrictToWindowEdges,
} from '@dnd-kit/modifiers'

import { FilePond } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import { FilePondFile, FilePondInitialFile } from 'filepond'

import { ControllerRenderProps, useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'

export const formSchema = z.object({
    title: z.string().min(2, {
        message: 'Title must be at least 2 characters.',
    }),
    description: z.string().min(0).optional(),
    answers: z
        .array(
            z.object({
                text: z.string().min(1, { message: 'Answer cannot be empty.' }),
                uuid: z.string().uuid({ message: 'Internal app error ' }),
            }),
        )
        .min(1, { message: 'At least one answer is required.' }),
})

// Define a type for the items
interface Answer {
    text: string
    uuid: string
}

// Props for SortableItem component
interface SortableAnswerProps {
    field: ControllerRenderProps<
        {
            title: string
            answers: {
                text: string
                uuid: string
            }[]
            description?: string | undefined
        },
        `answers.${number}.text`
    >
    id: string
    text: string
    handleRemove: (uuid: string) => void
}

const HandleIcon = ({ id }: { id: string }) => {
    const { attributes, listeners, setNodeRef } = useDraggable({
        id,
    })

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            className="cursor-grab"
        >
            <Icons.gripVertical className="hover:cursor-move" />
        </div>
    )
}

// Sortable item component
const SortableAnswer: React.FC<SortableAnswerProps> = ({
    id,
    field,
    handleRemove,
}) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({
            id,
            animateLayoutChanges: (args) =>
                defaultAnimateLayoutChanges({ ...args, wasDragging: true }),
        })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <FormItem
            className="flex flex-row items-center"
            ref={setNodeRef}
            {...attributes}
            style={style}
        >
            <HandleIcon id={id} />
            <div className="flex flex-col">
                <FormControl>
                    <Input {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
            </div>
            <Icons.close
                className="hover:cursor-pointer"
                onClick={() => handleRemove(id)}
            />
        </FormItem>
    )
}

// Main component
const SortableList: React.FC = () => {
    const [answers, setAnswers] = useState<Answer[]>([
        { text: 'answer1', uuid: uuidv4() },
        { text: 'answer2', uuid: uuidv4() },
        { text: 'answer3', uuid: uuidv4() },
        { text: 'answer4', uuid: uuidv4() },
    ])
    const [files, setFiles] = useState<File[]>([])
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    )

    const filepondRef = useRef<FilePond>(null)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            description: '',
            answers: answers,
        },
    })

    const { fields, append, remove, replace } = useFieldArray({
        control: form.control,
        name: 'answers',
    })

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        if (active.id !== over?.id) {
            const oldIndex = answers.findIndex(
                (answer) => answer.uuid === active.id,
            )
            const newIndex = answers.findIndex(
                (answer) => answer.uuid === over?.id,
            )

            setAnswers(() => {
                return arrayMove(answers, oldIndex, newIndex)
            })

            replace(arrayMove(answers, oldIndex, newIndex))
        }
    }

    const removeFromAnswers = (uuid: string) => {
        setAnswers(answers.filter((answer) => answer.uuid !== uuid))
        remove(answers.findIndex((answer) => answer.uuid === uuid))
    }

    const handleAddAnswer = () => {
        const newAnswer = { text: '', uuid: uuidv4() }
        append(newAnswer)
        setAnswers([...answers, newAnswer])
    }

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const formData = new FormData()

        formData.append('title', values.title)
        formData.append('description', values.description || '')
        formData.append('answers', JSON.stringify(values.answers))
        files.forEach((file) => {
            formData.append('file', file)
        })
        console.log(formData)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="type here..." {...field} />
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input placeholder="type here..." {...field} />
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                        <FilePond
                            ref={filepondRef}
                            files={files}
                            onupdatefiles={(fileItems: FilePondFile[]) => {
                                setFiles(
                                    fileItems.map(
                                        (fileItem) => fileItem.file as File,
                                    ),
                                )
                            }}
                            allowMultiple={false}
                            name="files"
                            labelIdle='Drag & Drop your files or <span className="filepond--label-action">Browse</span>'
                        />
                    </FormControl>
                </FormItem>
                <FormItem>
                    <FormLabel>Answers</FormLabel>
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                        modifiers={[
                            restrictToVerticalAxis,
                            restrictToWindowEdges,
                        ]}
                    >
                        <SortableContext
                            items={answers.map((answer) => answer.uuid)}
                            strategy={verticalListSortingStrategy}
                        >
                            {fields.map((field, index) => (
                                <FormField
                                    key={field.uuid}
                                    control={form.control}
                                    name={`answers.${index}.text`}
                                    render={(fieldObj) => (
                                        <SortableAnswer
                                            handleRemove={removeFromAnswers}
                                            field={fieldObj.field}
                                            id={field.uuid}
                                            text={field.text}
                                        />
                                    )}
                                />
                            ))}
                        </SortableContext>
                    </DndContext>
                    <Button type="button" onClick={() => handleAddAnswer()}>
                        Add Answer
                    </Button>
                </FormItem>

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}

export default SortableList
