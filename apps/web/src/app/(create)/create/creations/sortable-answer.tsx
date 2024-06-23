import { Icons } from '@/components/icons'
import { defaultAnimateLayoutChanges, useSortable } from '@dnd-kit/sortable'

import { FC, useState } from 'react'
import { ControllerRenderProps, FieldArrayWithId } from 'react-hook-form'
import { CSS } from '@dnd-kit/utilities'
import { FormControl, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useDraggable } from '@dnd-kit/core'

const HandleIcon = ({
    id,
    hoveredId,
}: {
    id: string
    hoveredId: string | undefined
}) => {
    const { attributes, listeners, setNodeRef } = useDraggable({
        id,
    })

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            className={`flex items-center ${hoveredId === id ? 'visible' : 'invisible'} hover:cursor-move`}
        >
            <Icons.chevronsUpDown className="mr-1" size={18} />
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
            pollType: number
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
    handleMouseEnter: (id: string) => void
    handleMouseLeave: () => void
    hoveredId: string | undefined
    isDragging: boolean
}

const SortableAnswer: FC<SortableAnswerProps> = ({
    field,
    index,
    answer,
    handleRemove,
    handleMouseEnter,
    handleMouseLeave,
    hoveredId,
    isDragging,
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
            className={`flex flex-col items-start ml-[-18px] ${isDragging ? 'cursor-move' : ''}`}
            ref={setNodeRef}
            {...attributes}
            style={style}
            onMouseEnter={() => handleMouseEnter(answer.id)}
            onMouseLeave={handleMouseLeave}
        >
            <div className="flex flex-row w-[100%]">
                <HandleIcon id={answer.id} hoveredId={hoveredId} />
                <FormControl className="cursor-move">
                    <Input
                        className="cursor-text bg-background"
                        placeholder={answer.placeholder}
                        {...field}
                    />
                </FormControl>
                <div className="flex flex-col justify-center relative right-6">
                    <Icons.close
                        className="hover:cursor-pointer sticky"
                        onClick={() => handleRemove(answer.id)}
                        size={18}
                    />
                </div>
            </div>
            <div className="ml-[24px]">
                <FormMessage />
            </div>
        </FormItem>
    )
}

export default SortableAnswer
