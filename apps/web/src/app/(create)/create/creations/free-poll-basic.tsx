'use client'

import React, { useRef, useState, FC } from 'react'
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

import {
    ControllerRenderProps,
    FieldArrayWithId,
    useFieldArray,
    useForm,
} from 'react-hook-form'
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
                id: z.string(),
            }),
        )
        .min(1, { message: 'At least one answer is required.' }),
})

const HandleIcon = ({ id }: { id: string }) => {
    return (
        <div className="cursor-grab">
            <Icons.gripVertical className="hover:cursor-move" />
        </div>
    )
}

// Props for SortableItem component
interface SortableAnswerProps {
    field: ControllerRenderProps<
        {
            title: string
            answers: {
                text: string
                id: string
            }[]
            description?: string | undefined
        },
        `answers.${number}.text`
    >
    index: number
    handleRemove: (id: string) => void
    answer: FieldArrayWithId<
        {
            title: string
            answers: {
                text: string
                id: string
            }[]
            description?: string | undefined
        },
        'answers',
        'id'
    >
}

const SortableAnswer: FC<SortableAnswerProps> = ({
    field,
    index,
    answer,
    handleRemove,
}) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({
            id: answer.id,
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
            {...listeners}
            {...attributes}
            style={style}
        >
            <HandleIcon id={answer.id} />
            <FormControl>
                <Input placeholder={answer.id} {...field} />
            </FormControl>
            <div className="flex flex-row w-auto">
                <FormDescription></FormDescription>
                <FormMessage />
            </div>
            <Icons.close
                className="hover:cursor-pointer"
                onClick={() => handleRemove(answer.id)}
            />
        </FormItem>
    )
}

// Main component
const SortableList: React.FC = () => {
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
            answers: [{ text: '', id: '' }],
        },
    })

    const watchAnswers = form.watch('answers')

    console.log('MY ANSWERS:', watchAnswers)

    const { fields, append, remove, replace } = useFieldArray({
        control: form.control,
        name: 'answers',
    })
    console.log('MY FIELDS:', fields)

    const handleRemoveAnswer = (id: string) => {
        // remove(fields.findIndex((answer) => answer.id === id))
    }

    const handleAddAnswer = () => {
        // append({ text: '', id: 'hiiii' })
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

    const handleDragEnd = (event: DragEndEvent) => {
        // const { active, over } = event
        // if (active.id !== over?.id) {
        //     const oldIndex = fields.findIndex(
        //         (answer) => answer.id === active.id,
        //     )
        //     const newIndex = fields.findIndex(
        //         (answer) => answer.id === over?.id,
        //     )
        //     replace(arrayMove(fields, oldIndex, newIndex))
        // }
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
                                items={fields.map((answer) => answer.id)}
                                strategy={verticalListSortingStrategy}
                            >
                                {fields.map((field, index) => {
                                    console.log('FIELD:', field)
                                    return (
                                        <FormField
                                            key={field.id}
                                            control={form.control}
                                            name={`answers.${index}.text`}
                                            render={(fieldRenderProps) => (
                                                <SortableAnswer
                                                    field={
                                                        fieldRenderProps.field
                                                    }
                                                    index={index}
                                                    handleRemove={
                                                        handleRemoveAnswer
                                                    }
                                                    answer={field}
                                                />
                                            )}
                                        />
                                    )
                                })}
                            </SortableContext>
                        </DndContext>
                        <Button type="button" onClick={handleAddAnswer}>
                            Add Answer
                        </Button>
                    </FormItem>
                </FormItem>
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}

export default SortableList
