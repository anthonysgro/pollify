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
import { FC } from 'react'
import {
    ControllerRenderProps,
    FieldArrayWithId,
    useFieldArray,
    useForm,
} from 'react-hook-form'
import { z } from 'zod'
import { CSS } from '@dnd-kit/utilities'

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
// Props for SortableItem component
interface SortableAnswerProps {
    field: ControllerRenderProps<
        {
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
            className="flex flex-row items-center"
            ref={setNodeRef}
            {...attributes}
            style={style}
        >
            <HandleIcon id={answer.id} />
            <FormControl>
                <Input placeholder={answer.placeholder} {...field} />
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

export const formSchema = z.object({
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
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    )

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
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

        formData.append('answers', JSON.stringify(values.answers))
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
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
    )
}

export default SortableList
