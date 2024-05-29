'use client'

import * as React from 'react'
import {
    CaretSortIcon,
    CheckIcon,
    PlusCircledIcon,
} from '@radix-ui/react-icons'

import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from '@/components/ui/command'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

const groups = [
    {
        label: 'Personal Account',
        campaigns: [
            {
                label: 'Alicia Koch',
                value: 'personal',
            },
        ],
    },
    {
        label: 'Campaign',
        campaigns: [
            {
                label: 'Acme Inc.',
                value: 'acme-inc',
            },
            {
                label: 'Monsters Inc.',
                value: 'monsters',
            },
        ],
    },
]

type Campaign = (typeof groups)[number]['campaigns'][number]

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface CampaignSwitcherProps extends PopoverTriggerProps {}

export default function CampaignSwitcher({ className }: CampaignSwitcherProps) {
    const [open, setOpen] = React.useState(false)
    const [showNewCampaignDialog, setShowNewCampaignDialog] =
        React.useState(false)
    const [selectedCampaign, setSelectedCampaign] = React.useState<
        Campaign | undefined
    >(groups[0]?.campaigns[0])

    return (
        <Dialog
            open={showNewCampaignDialog}
            onOpenChange={setShowNewCampaignDialog}
        >
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        aria-label="Select a campaign"
                        className={cn('w-[200px] justify-between', className)}
                    >
                        <Avatar className="mr-2 h-5 w-5">
                            <AvatarImage
                                src={`https://avatar.vercel.sh/${selectedCampaign?.value}.png`}
                                alt={selectedCampaign?.label}
                                className="grayscale"
                            />
                            <AvatarFallback>SC</AvatarFallback>
                        </Avatar>
                        {selectedCampaign?.label}
                        <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandList>
                            <CommandInput placeholder="Search campaign..." />
                            <CommandEmpty>No campaign found.</CommandEmpty>
                            {groups.map((group) => (
                                <CommandGroup
                                    key={group.label}
                                    heading={group.label}
                                >
                                    {group.campaigns.map((campaign) => (
                                        <CommandItem
                                            key={campaign.value}
                                            onSelect={() => {
                                                setSelectedCampaign(campaign)
                                                setOpen(false)
                                            }}
                                            className="text-sm"
                                        >
                                            <Avatar className="mr-2 h-5 w-5">
                                                <AvatarImage
                                                    src={`https://avatar.vercel.sh/${campaign.value}.png`}
                                                    alt={campaign.label}
                                                    className="grayscale"
                                                />
                                                <AvatarFallback>
                                                    SC
                                                </AvatarFallback>
                                            </Avatar>
                                            {campaign.label}
                                            <CheckIcon
                                                className={cn(
                                                    'ml-auto h-4 w-4',
                                                    selectedCampaign?.value ===
                                                        campaign.value
                                                        ? 'opacity-100'
                                                        : 'opacity-0',
                                                )}
                                            />
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            ))}
                        </CommandList>
                        <CommandSeparator />
                        <CommandList>
                            <CommandGroup>
                                <DialogTrigger asChild>
                                    <CommandItem
                                        onSelect={() => {
                                            setOpen(false)
                                            setShowNewCampaignDialog(true)
                                        }}
                                    >
                                        <PlusCircledIcon className="mr-2 h-5 w-5" />
                                        Create Campaign
                                    </CommandItem>
                                </DialogTrigger>
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create campaign</DialogTitle>
                    <DialogDescription>
                        Add a new campaign to manage products and customers.
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <div className="space-y-4 py-2 pb-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Campaign name</Label>
                            <Input id="name" placeholder="Acme Inc." />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="plan">Subscription plan</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a plan" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="free">
                                        <span className="font-medium">
                                            Free
                                        </span>{' '}
                                        -{' '}
                                        <span className="text-muted-foreground">
                                            Trial for two weeks
                                        </span>
                                    </SelectItem>
                                    <SelectItem value="pro">
                                        <span className="font-medium">Pro</span>{' '}
                                        -{' '}
                                        <span className="text-muted-foreground">
                                            $9/month per user
                                        </span>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => setShowNewCampaignDialog(false)}
                    >
                        Cancel
                    </Button>
                    <Button type="submit">Continue</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
