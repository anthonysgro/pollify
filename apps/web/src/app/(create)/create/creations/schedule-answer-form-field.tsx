import * as React from 'react'
import { Dispatch, SetStateAction } from 'react';
import { Calendar } from '@/components/ui/calendar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input';
import { DateTime } from 'luxon';
import { DateRange } from '../formSchema';

const options = {
    weekday: 'short' as 'short', // "Mon"
    year: 'numeric' as 'numeric',
    month: 'long' as 'long', // "June"
    day: 'numeric' as 'numeric', // "24"
}


// Props for SortableItem component
interface ScheduledAnswerFormFieldProps {
    selectedDates: Date[];
    handleChangeScheduledDates: (dates: Date[]) => void;
}

export function ScheduledAnswerFormField({
    selectedDates,
    handleChangeScheduledDates,
    ...props
}: ScheduledAnswerFormFieldProps) {
return (<>
<div className="sm:grid sm:grid-cols-2 sm:gap-6">
    <Calendar
        mode="multiple"
        selected={selectedDates}
        onSelect={(dates) =>
            handleChangeScheduledDates(dates || [])
        }
        className="rounded-md border max-w-sm mx-auto sm:max-w-lg sm:w-full p-4"
    />
    <div className="rounded-md border mt-6 sm:mt-0 max-w-sm mx-auto sm:max-w-lg sm:w-full flex justify-center items-center w-full h-full">
        <div className="flex flex-col p-4 justify-center h-full w-full">
            <div className="font-medium pt-1 pb-1 text-center">
                Date Selections
            </div>
            <ScrollArea className="max-h-[270px] overflow-y-auto">
                {selectedDates.length === 0 ? (
                    <div className="text-muted-foreground text-sm text-center">
                        Click on a date in the
                        calendar to get started
                    </div>
                ) : (
                    selectedDates.map((date) => (
                        <div className="rounded-md border text-sm font-medium bg-primary text-primary-foreground my-2 p-2 space-y-2">
                            <p>
                                {date.toLocaleDateString(
                                    'en-US',
                                    options,
                                )}
                            </p>
                            <div className="flex space-x-2">
                                <Input
                                    type="time"
                                    className="border hover:bg-accent hover:text-accent-foreground bg-background border-input shadow-sm text-card-foreground"
                                />
                                <Input
                                    type="time"
                                    className="border hover:bg-accent hover:text-accent-foreground bg-background border-input shadow-sm text-card-foreground"
                                />
                            </div>
                        </div>
                    ))
                )}
            </ScrollArea>
        </div>
    </div>
</div>
</>)
}
