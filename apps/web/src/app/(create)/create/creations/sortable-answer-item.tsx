import { FC } from 'react'
import { defaultAnimateLayoutChanges, useSortable } from '@dnd-kit/sortable'
import { FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ControllerRenderProps } from 'react-hook-form'
import { CSS } from '@dnd-kit/utilities'
import { Icons } from '@/components/icons'
import { useDraggable } from '@dnd-kit/core'

interface ISortableAnswerItem {
    field: ControllerRenderProps<
        {
            title: string
            answers: {
                text: string
            }[]
            description?: string | undefined
            image?: string | undefined
        },
        'answers'
    >
    id: number
    handleRemove: (id: number) => void
}

const HandleIcon = ({ id }: { id: number }) => {
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
            <Icons.dragHandleVerticalIcon />
        </div>
    )
}

export const SortableAnswerItem: FC<ISortableAnswerItem> = ({
    field,
    id,
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
        // transition,
    }

    return (
        <div ref={setNodeRef} {...attributes} style={style}>
            <div className="flex flex-row items-center">
                <HandleIcon id={id} />
                <FormControl>
                    <Input placeholder={`Option ${id}`} {...field} />
                </FormControl>
                <Icons.close onClick={() => handleRemove(id)} />
            </div>
        </div>
    )
}
