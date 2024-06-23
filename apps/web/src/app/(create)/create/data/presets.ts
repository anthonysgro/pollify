export interface PollType {
    id: number
    name: string
}

export const pollTypes: PollType[] = [
    {
        id: 0,
        name: 'Simple Poll',
    },
    {
        id: 1,
        name: 'Schedule Meeting',
    },
]
