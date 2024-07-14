import * as React from 'react'
import { Dispatch, SetStateAction, useState } from 'react'
import { FormLabel, FormItem, FormField } from '@/components/ui/form'

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
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { FieldArrayWithId, UseFormReturn } from 'react-hook-form'
import { FormSchema } from '../formSchema'
import SortableAnswer from './sortable-answer'
import { Button } from '@/components/ui/button'

// Props for SortableItem component
interface SortableAnswerFormFieldProps {
    form: UseFormReturn<FormSchema, any, undefined>
    fields: FieldArrayWithId<FormSchema, 'textAnswers', 'id'>[]
    handleAddAnswer: () => void
    handleRemoveAnswer: (id: string) => void
    isDragging: boolean
    setIsDragging: Dispatch<SetStateAction<boolean>>
    handleDragEnd: (event: DragEndEvent) => void
}

export function SortableAnswerFormField({
    form,
    fields,
    handleAddAnswer,
    handleRemoveAnswer,
    isDragging,
    setIsDragging,
    handleDragEnd,
    ...props
}: SortableAnswerFormFieldProps) {
    const [hoveredId, setHoveredId] = useState<string | undefined>(undefined)

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    )

    const handleMouseEnter = (id: string) => {
        if (!isDragging) setHoveredId(id)
    }

    const handleMouseLeave = () => {
        if (!isDragging) setHoveredId(undefined)
    }

    return (
        <FormItem>
            <FormLabel>Answers</FormLabel>
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
                                    name={`textAnswers.${index}.text`}
                                    render={(fieldRenderProps) => (
                                        <SortableAnswer
                                            field={fieldRenderProps.field}
                                            handleRemove={handleRemoveAnswer}
                                            answer={field}
                                            handleMouseEnter={() =>
                                                handleMouseEnter(field.id)
                                            }
                                            handleMouseLeave={handleMouseLeave}
                                            hoveredId={hoveredId}
                                            isDragging={isDragging}
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
            </>
        </FormItem>
    )
}
