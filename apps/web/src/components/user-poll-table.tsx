import { Icons } from '@/components/icons'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import Image from 'next/image'
import Link from 'next/link'
import { pollData } from '@/mock/poll-table'

async function UserPollTable() {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                        <span className="sr-only">Image</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">Link</TableHead>
                    <TableHead className="hidden md:table-cell">
                        Total Responses
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                        Created at
                    </TableHead>
                    <TableHead>
                        <span className="sr-only">Actions</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {pollData.map((poll) => (
                    <TableRow key={poll.name}>
                        <TableCell className="hidden sm:table-cell">
                            <Image
                                alt="img"
                                className="aspect-square rounded-md object-cover"
                                height="64"
                                src="/placeholder.svg"
                                width="64"
                            />
                        </TableCell>
                        <TableCell className="font-medium">
                            {poll.name}
                        </TableCell>
                        <TableCell>
                            <Badge variant="outline">{poll.status}</Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                            <Link href={poll.link}>
                                <Icons.link2 size={18} />
                            </Link>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                            {poll.responses}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                            {poll.createdAt}
                        </TableCell>
                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        aria-haspopup="true"
                                        size="icon"
                                        variant="ghost"
                                    >
                                        <Icons.moreHorizontal className="h-4 w-4" />
                                        <span className="sr-only">
                                            Toggle menu
                                        </span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>
                                        Actions
                                    </DropdownMenuLabel>
                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                    <DropdownMenuItem>Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default UserPollTable
