'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
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

import { useState } from 'react'
import { SortableAnswerItem } from './sortable-answer-item'

const formSchema = z.object({
    title: z.string().min(2).max(124),
    description: z.string().min(0).max(1024).optional(),
    image: z.string().optional(),
    answers: z.array(z.string()),
})

export default function FreePollForm() {
    const [answers, setAnswers] = useState<string[]>(['1', '2', '3'])
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    )

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            description: '',
            image: '',
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }
    console.log(answers)

    const handleDragEnd = (e: DragEndEvent) => {
        if (!e.over) return

        if (e.active.id !== e.over.id) {
            console.log(e)
            setAnswers((answers) => {
                const oldIdx = answers.indexOf(e.active.id.toString())
                const newIdx = answers.indexOf(e.over!.id.toString())
                return arrayMove(answers, oldIdx, newIdx)
            })
        }
    }

    const handleRemove = (id: string) => {
        console.log(id)
        setAnswers((answers) => answers.filter((answer) => answer !== id))
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
                                <Input
                                    placeholder="Ask a question..."
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Description{' '}
                                <span className="text-xs text-muted-foreground">
                                    (optional)
                                </span>
                            </FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image</FormLabel>
                            <FormControl>
                                <Input type="file" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image</FormLabel>
                            <FormControl>
                                <Input type="file" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormItem>
                    <FormLabel>Answers</FormLabel>
                    <FormField
                        control={form.control}
                        name="answers"
                        render={({ field }) => (
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
                                    items={answers}
                                >
                                    {answers.map((answer, i) => (
                                        <div
                                            className="flex flex-row"
                                            key={answer}
                                        >
                                            <SortableAnswerItem
                                                children={answer}
                                                answer={answer}
                                                field={field}
                                                idx={i}
                                                handleRemove={handleRemove}
                                            />
                                        </div>
                                    ))}
                                </SortableContext>
                            </DndContext>
                        )}
                    />
                    <Button
                        onClick={(e) => {
                            e.preventDefault()
                            setAnswers([...answers, `${answers.length + 1}`])
                        }}
                    >
                        +
                    </Button>
                </FormItem>
            </form>
        </Form>
    )
}
