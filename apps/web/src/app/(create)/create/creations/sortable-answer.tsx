import { Icons } from '@/components/icons'
import { defaultAnimateLayoutChanges, useSortable } from '@dnd-kit/sortable'

import { FC } from 'react'
import { ControllerRenderProps, FieldArrayWithId } from 'react-hook-form'
import { CSS } from '@dnd-kit/utilities'
import { FormControl, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useDraggable } from '@dnd-kit/core'

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
            <Icons.chevronsUpDown
                className="hover:cursor-move mr-1"
                size={18}
            />
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
                    <Input
                        className=""
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
            <div className="">
                <FormMessage />
            </div>
        </FormItem>
    )
}

export default SortableAnswer
