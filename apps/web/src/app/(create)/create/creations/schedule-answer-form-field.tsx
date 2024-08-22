import * as React from 'react'
import { Dispatch, SetStateAction, useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import {
    FormField,
    FormControl,
    FormLabel,
    FormDescription,
    FormItem,
    FormMessage,
} from '@/components/ui/form'
import { DateTime } from 'luxon'
import { FieldArrayWithId, UseFormReturn, useFieldArray } from 'react-hook-form'
import { Switch } from '@/components/ui/switch'

import { FormSchema, DateRangeJS } from '../formSchema'
import { ControllerRenderProps } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'

const options = {
    weekday: 'short' as 'short', // "Mon"
    year: 'numeric' as 'numeric',
    month: 'long' as 'long', // "June"
    day: 'numeric' as 'numeric', // "24"
}

// Props for SortableItem component
interface ScheduledAnswerFormFieldProps {
    form: UseFormReturn<FormSchema, any, undefined>
}

interface ScheduledAnswerFieldProps {
    field:
        | ControllerRenderProps<FormSchema, `scheduledAnswers.${number}.from`>
        | ControllerRenderProps<FormSchema, `scheduledAnswers.${number}.to`>
    value: Date
}

export function ScheduledAnswerField({
    field,
    value,
    ...props
}: ScheduledAnswerFieldProps) {
    const [setAllDay, allDay] = useState(true)
    const toDateTimeString = (date: Date) => {
        return (
            DateTime.fromJSDate(date).startOf('minute').toISOTime({
                suppressSeconds: true,
                suppressMilliseconds: true,
                includeOffset: false,
            }) || ''
        )
    }

    const toDateString = (date: Date) => {
        return DateTime.fromJSDate(date).toISODate() || ''
    }

    const handleValue = (val: Date) => {
        return toDateString(value)
    }

    const handleAddTime = () => {

    }

    // console.log('HELLO THERE')
    // console.log(value)
    // console.log(field)
    return (
        <FormControl>
            <div className="flex flex-col w-full gap-y-4">
                {setAllDay ? (
                    <div className="flex items-center justify-center w-full h-9 py-1 px-3 rounded-md border bg-background border-input shadow-sm text-card-foreground">
                        All Day
                    </div>
                ) : (
                    <Input
                        type="date"
                        className="border hover:bg-accent hover:text-accent-foreground bg-background border-input shadow-sm text-card-foreground"
                        {...field}
                        // onChange={(e) => {
                        //     // const [hours, minutes] = e.target.value
                        //     //     .split(':')
                        //     //     .map((str) => parseInt(str))

                        //     // // guaranteed to get a xx:xx formatted date
                        //     // const newDateTime = DateTime.fromJSDate(field.value)
                        //     //     .set({
                        //     //         hour: hours,
                        //     //         minute: minutes,
                        //     //     })
                        //     //     .toJSDate()

                        //     //     console.log("IN CHANGE")
                        //     //     console.log(newDateTime)
                        //     // field.onChange(newDateTime)
                        // }}
                        value={handleValue(field.value)}
                    />
                )}
                <div className="flex w-full items-center justify-around text-xs">
                    <Button onClick={(e) => e.preventDefault()}>
                        <span>
                            <Icons.add size={18} />
                        </span>
                        Add Time
                    </Button>
                    <Button onClick={(e) => e.preventDefault()}>
                        Use Template
                    </Button>
                </div>
            </div>
        </FormControl>
    )
}

export function ScheduledAnswerFormField({
    form,
    ...props
}: ScheduledAnswerFormFieldProps) {
    const { fields, append, prepend, remove, swap, move, insert, replace } =
        useFieldArray({
            control: form.control,
            name: 'scheduledAnswers',
        })

    const handleChangeCalendarDates = (dates: Date[]) => {
        const selectedDates = dates.map((date) => {
            return {
                from: DateTime.fromJSDate(date).startOf('day').toJSDate(),
                to: DateTime.fromJSDate(date).endOf('day').toJSDate(),
            }
        })

        replace(selectedDates)

        // // Change eventually to handle multiple DateTimes even within or between days
        // const newDates = dates.map((date) => {
        //     return {
        //         from: DateTime.fromJSDate(date).startOf('day').toJSDate(),
        //         to: DateTime.fromJSDate(date).endOf('day').toJSDate(),
        //     }
        // }).filter((dateRange) => {
        //     const candidateDate = DateTime.fromJSDate(dateRange.from).startOf('day').toJSDate()
        //     const existingDates = fields.map(item => DateTime.fromJSDate(item.from).startOf('day').toJSDate());

        //     for (const date of existingDates) {
        //         if (candidateDate.getTime() === date.getTime()) return false;
        //     }

        //     return true;
        // })

        // append(newDates)
    }

        console.log('HELLO THERE')
    console.log(fields.values())
    console.log(fields)

    return (
        <>
            <div className="sm:grid sm:grid-cols-2 sm:gap-6">
                <Calendar
                    mode="multiple"
                    selected={fields.map((item) =>
                        DateTime.fromJSDate(item.from)
                            .startOf('day')
                            .toJSDate(),
                    )}
                    onSelect={(dates) => handleChangeCalendarDates(dates || [])}
                    className="rounded-md border max-w-sm mx-auto sm:max-w-lg sm:w-full p-4"
                />
                <div className="rounded-md border mt-6 sm:mt-0 max-w-sm mx-auto sm:max-w-lg sm:w-full flex justify-center items-center w-full h-full">
                    <div className="flex flex-col p-4 justify-center h-full w-full">
                        <div className="font-medium pt-1 pb-1 text-center">
                            Date Selections
                        </div>
                        <ScrollArea className="max-h-[270px] overflow-y-auto">
                            {fields.length === 0 ? (
                                <div className="text-muted-foreground text-sm text-center">
                                    Click on a date in the calendar to get
                                    started
                                </div>
                            ) : (
                                fields.map((item, index) => (
                                    <div
                                        key={item.id}
                                        className="rounded-md border text-sm font-medium my-2 p-2 space-y-2"
                                    >
                                        <p>
                                            {item.from.toLocaleDateString(
                                                'en-US',
                                                options,
                                            )}
                                        </p>
                                        <div className="flex space-x-2">
                                            <FormField
                                                key={item.id + '1'}
                                                control={form.control}
                                                name={`scheduledAnswers.${index}.from`}
                                                render={({
                                                    field,
                                                    formState,
                                                }) => (
                                                    <ScheduledAnswerField
                                                        field={field}
                                                        value={item.from}
                                                    />
                                                )}
                                            />
                                        </div>
                                    </div>
                                ))
                            )}
                        </ScrollArea>
                    </div>
                </div>
            </div>
            <div>
                <FormField
                    control={form.control}
                    name="dayPickerMode"
                    render={({ field }) => (
                        <FormItem className="space-y-2 flex flex-col">
                            <FormLabel>Enter Manually</FormLabel>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </>
    )
}
