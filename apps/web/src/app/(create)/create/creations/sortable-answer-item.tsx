import { FC } from 'react'
import { defaultAnimateLayoutChanges, useSortable } from '@dnd-kit/sortable'
import { FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ControllerRenderProps } from 'react-hook-form'
import { CSS } from '@dnd-kit/utilities'
import { Icons } from '@/components/icons'
import { useDraggable } from '@dnd-kit/core'

interface ISortableAnswerItem {
    children: string
    answer: string
    field: ControllerRenderProps<
        {
            title: string
            answers: string[]
            image?: string | undefined
            description?: string | undefined
        },
        'answers'
    >
    idx: number
    handleRemove: (id: string) => void
}

const HandleIcon = ({ answer }: { answer: string }) => {
    const { attributes, listeners, setNodeRef } = useDraggable({
        id: answer,
    })

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            className="cursor-grab"
        >
            <Icons.dragHandleVerticalIcon />
        </div>
    )
}

export const SortableAnswerItem: FC<ISortableAnswerItem> = ({
    children,
    answer,
    field,
    idx,
    handleRemove,
}) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({
            id: children,
            animateLayoutChanges: (args) =>
                defaultAnimateLayoutChanges({ ...args, wasDragging: true }),
        })

    const style = {
        transform: CSS.Transform.toString(transform),
        // transition,
    }

    return (
        <div ref={setNodeRef} {...attributes} style={style}>
            <div className="flex flex-row items-center">
                <HandleIcon answer={answer} />
                <FormControl>
                    <Input placeholder={`Option ${children}`} {...field} />
                </FormControl>
                <Icons.close onClick={() => handleRemove(answer)} />
            </div>
        </div>
    )
}
