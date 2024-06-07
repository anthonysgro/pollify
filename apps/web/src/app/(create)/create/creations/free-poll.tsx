'use client'

import { Icons } from '@/components/icons'
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
import {
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    closestCenter,
    useDraggable,
    useSensor,
    useSensors,
} from '@dnd-kit/core'
import { restrictToWindowEdges } from '@dnd-kit/modifiers'
import {
    SortableContext,
    arrayMove,
    defaultAnimateLayoutChanges,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC, useRef, useState } from 'react'
import {
    ControllerRenderProps,
    FieldArrayWithId,
    useFieldArray,
    useForm,
} from 'react-hook-form'
import { FilePond, registerPlugin } from 'react-filepond'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond/dist/filepond.min.css'
import { z } from 'zod'
import { CSS } from '@dnd-kit/utilities'
import { FilePondFile } from 'filepond'

const HandleIcon = ({ id }: { id: string }) => {
    const { attributes, listeners, setNodeRef } = useDraggable({
        id,
    })

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            className="flex items-center"
        >
            <Icons.chevronsUpDown className="hover:cursor-move mr-1" size={18} />
        </div>
    )
}
// Props for SortableItem component
interface SortableAnswerProps {
    field: ControllerRenderProps<
        {
            title: string
            description?: string | undefined
            answers: {
                text: string
                placeholder: string
            }[]
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
                placeholder: string
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
            className="flex flex-col items-start"
            ref={setNodeRef}
            {...attributes}
            style={style}
        >
            <div className="flex flex-row w-[100%]">
                <HandleIcon id={answer.id} />
                <FormControl>
                    <Input className="" placeholder={answer.placeholder} {...field} />
                </FormControl>
                <div className="flex flex-col justify-center relative right-6">
                <Icons.close
                    className="hover:cursor-pointer sticky"
                    onClick={() => handleRemove(answer.id)}
                    size={18}
                />
                </div>
            </div>
            <div className="">
                <FormMessage />
            </div>

        </FormItem>
    )
}

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
})

const SortableList: React.FC = () => {
    registerPlugin(FilePondPluginImagePreview, FilePondPluginFileValidateType);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    )
    
    const [files, setFiles] = useState<File[]>([])

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

    const handleRemoveAnswer = (id: string) => {
        remove(fields.findIndex((answer) => answer.id === id))
    }

    const handleAddAnswer = () => {
        append({ text: '', placeholder: `Answer ${fields.length + 1}` })
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        if (active.id !== over?.id) {
            const oldIndex = fields.findIndex(
                (answer) => answer.id === active.id,
            )
            const newIndex = fields.findIndex(
                (answer) => answer.id === over?.id,
            )
            replace(arrayMove(fields, oldIndex, newIndex))
        }
    }

    return (
        <div className="p-8 bg-card text-card-foreground rounded-xl border">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input className="" placeholder="type here..." {...field} />
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
                                <Input className="" placeholder="type here..." {...field} />
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
                            files={files}
                            acceptedFileTypes={['image/*']}
                            fileValidateTypeDetectType={(source, type) => new Promise((resolve, reject) => {
                                resolve(type);
                             })
                            }
                            onupdatefiles={(fileItems: FilePondFile[]) => {
                                setFiles(
                                    fileItems.map(
                                        (fileItem) => fileItem.file as File,
                                    ),
                                )
                            }}
                            allowMultiple={false}
                            name="files"
                            labelIdle='Drag & Drop your file or <span className="filepond--label-action">Browse</span>'
                        />
                    </FormControl>
                </FormItem>                
                <FormItem>
                    <FormLabel>Answers</FormLabel>
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
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
                                        render={(fieldRenderProps) => (
                                            <SortableAnswer
                                                field={fieldRenderProps.field}
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
                <Button type="submit">Submit</Button>
            </form>
        </Form>
        </div>
    )
}

export default SortableList
