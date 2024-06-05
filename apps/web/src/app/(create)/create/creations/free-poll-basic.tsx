'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { useRef, useState } from 'react'
import { z } from 'zod'

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
import { v4 as uuidv4 } from 'uuid'

import { Icons } from '@/components/icons'

// Import FilePond styles
import { FilePond } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import { FilePondFile, FilePondInitialFile } from 'filepond'

import {
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    closestCenter,
    useSensor,
    useSensors,
} from '@dnd-kit/core'
import {
    SortableContext,
    arrayMove,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import {
    restrictToVerticalAxis,
    restrictToWindowEdges,
} from '@dnd-kit/modifiers'
import { SortableAnswer } from './sortable-answer'

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

export default function FreePollForm() {
    // State for the file input
    const [answers, setAnswers] = useState<{ text: string; uuid: string }[]>([
        { text: '', uuid: uuidv4() },
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

    const handleDragEnd = (event: DragEndEvent) => {
        console.log(event)
        const { active, over } = event

        if (!over) {
            return
        }

        const oldIndex = answers.findIndex(
            (answer) => answer.uuid === active.id,
        )
        const newIndex = answers.findIndex((item) => item.uuid === over.id)

        setAnswers(arrayMove(answers, oldIndex, newIndex))
    }

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'answers',
    })

    const removeFromAnswers = (uuid: string) => {
        remove(answers.findIndex((answer) => answer.uuid === uuid))
    }

    function onSubmit(values: z.infer<typeof formSchema>) {
        const formData = new FormData()

        formData.append('title', values.title)
        formData.append('description', values.description || '')
        formData.append('answers', JSON.stringify(values.answers))
        files.forEach((file) => {
            formData.append('file', file)
        })
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
                            strategy={verticalListSortingStrategy}
                            items={answers.map((answer) => {
                                return { id: answer.uuid }
                            })}
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
                    <Button
                        type="button"
                        onClick={() => append({ text: '', uuid: uuidv4() })}
                    >
                        Add Answer
                    </Button>
                </FormItem>

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
