import * as React from 'react'
import { useRouter } from 'next/navigation'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import { PopoverProps } from '@radix-ui/react-popover'
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { FormControl } from '@/components/ui/form'
import { Dispatch, SetStateAction } from 'react'

import { PollType } from '../data/presets'
import { pollTypes } from '../data/presets'

interface PollTypeSelectorProps extends PopoverProps {
    selectedPollType: PollType | undefined
    setSelectedPollType: Dispatch<SetStateAction<PollType | undefined>>
}

export function PollTypeSelector({
    selectedPollType,
    setSelectedPollType,
    ...props
}: PollTypeSelectorProps) {
    const [open, setOpen] = React.useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen} {...props}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-label="Form type"
                    aria-expanded={open}
                    className="flex-1 justify-between md:max-w-[200px] lg:max-w-[300px]"
                >
                    {selectedPollType ? selectedPollType.name : 'Poll type'}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
                <Command>
                    <CommandInput placeholder="Search form types..." />
                    <CommandList>
                        <CommandEmpty>No poll types found.</CommandEmpty>
                        <CommandGroup heading="Poll types">
                            {pollTypes.map((pollType) => (
                                <FormControl key={pollType.id}>
                                    <CommandItem
                                        onSelect={() => {
                                            setSelectedPollType(pollType)
                                            setOpen(false)
                                        }}
                                        defaultValue={selectedPollType?.id}
                                    >
                                        {pollType.name}
                                        <CheckIcon
                                            className={cn(
                                                'ml-auto h-4 w-4',
                                                selectedPollType?.id ===
                                                    pollType.id
                                                    ? 'opacity-100'
                                                    : 'opacity-0',
                                            )}
                                        />
                                    </CommandItem>
                                </FormControl>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
