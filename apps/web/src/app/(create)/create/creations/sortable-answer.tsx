import { FC } from 'react'
import { defaultAnimateLayoutChanges, useSortable } from '@dnd-kit/sortable'
import { FormControl, FormDescription, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ControllerRenderProps } from 'react-hook-form'
import { CSS } from '@dnd-kit/utilities'
import { Icons } from '@/components/icons'
import { useDraggable } from '@dnd-kit/core'
import { formSchema } from './free-poll-basic'

// Props for SortableItem component
interface SortableAnswerProps {
    field: ControllerRenderProps<
        {
            title: string
            answers: {
                text: string
                uuid: string
            }[]
            description?: string | undefined
        },
        `answers.${number}.text`
    >
    id: string
    idx: number
    text: string
    handleRemove: (uuid: string) => void
}

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

export const SortableAnswer: FC<SortableAnswerProps> = ({
    field,
    id,
    idx,
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
        transition,
    }

    return (
        <FormItem
            className="flex flex-row items-center"
            ref={setNodeRef}
            {...attributes}
            style={style}
        >
            <HandleIcon id={id} />
            <FormControl>
                <Input placeholder={`Answer ${idx + 1}`} {...field} />
            </FormControl>
            <div className='flex flex-row w-auto'>
            <FormDescription></FormDescription>
            <FormMessage />
            </div>
            <Icons.close
                className="hover:cursor-pointer"
                onClick={() => handleRemove(id)}
            />
        </FormItem>
    )
}
