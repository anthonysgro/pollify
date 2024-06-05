'use client'
import React, { useEffect, useRef, useState } from 'react'
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

// Main component
const SortableList: React.FC = () => {
    // const [answers, setAnswers] = useState<Answer[]>([
    // ])
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
            answers: [
                { text: '', uuid: uuidv4() },
                { text: '', uuid: uuidv4() },
                { text: '', uuid: uuidv4() },
                { text: '', uuid: uuidv4() },
            ],
        },
    })

    const watchAnswers = form.watch('answers')

    const { fields, append, remove, replace } = useFieldArray({
        control: form.control,
        name: 'answers',
    })

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        if (active.id !== over?.id) {
            const oldIndex = fields.findIndex(
                (answer) => answer.uuid === active.id,
            )
            const newIndex = fields.findIndex(
                (answer) => answer.uuid === over?.id,
            )

            replace(arrayMove(fields, oldIndex, newIndex))
        }
    }

    useEffect(() => {
        console.log('FORM ANSWERS:', watchAnswers)
    }, [watchAnswers])

    const removeFromAnswers = (uuid: string) => {
        remove(fields.findIndex((answer) => answer.uuid === uuid))
    }

    const handleAddAnswer = () => {
        append({ text: '', uuid: uuidv4() })
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
                            items={fields.map((answer) => answer.uuid)}
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
                                            idx={index}
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
