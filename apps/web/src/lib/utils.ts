import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { DateTime } from 'luxon'
import { DateRangeJS } from '@/app/(create)/create/formSchema'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
