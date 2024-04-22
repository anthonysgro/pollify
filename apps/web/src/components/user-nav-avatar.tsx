"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "next-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";

export function UserNavAvatar({ user }: { user: User | undefined }) {
  const userInitials = user?.name
    ? user.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
    : "";

  if (user && user.image)
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className={"outline-none select-none"}>
          <Avatar>
            <AvatarImage src={user.image} alt={userInitials} />
            <AvatarFallback>{userInitials}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-96">
          <DropdownMenuGroup className="m-4">
            <div className="flex h-[5rem] w-auto">
              <Avatar className="h-18 w-18 m-w-full m-h-full flex-nowrap items-center">
                <AvatarImage src={user.image} alt={userInitials} />
                <AvatarFallback>{userInitials}</AvatarFallback>
              </Avatar>
              <div className="flex items-center justify-start gap-2 p-3">
                <div className="w-auto flex flex-col space-y-1 leading-none">
                  {user.name && (
                    <p className="font-semibold text-lg">{user.name}</p>
                  )}
                  {user.email && (
                    <p className="truncate text-sm text-muted-foreground pb-1">
                      {user.email}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href="/dashboard">Dashboard</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href="/dashboard/billing">Billing</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href="/dashboard/settings">Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onSelect={(event) => {
              event.preventDefault();
              signOut({
                callbackUrl: `${window.location.origin}/login`,
              });
            }}
          >
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  else
    return (
      <div>
        <Button variant="ghost" asChild>
          <Link href="/register">Sign Up</Link>
        </Button>
      </div>
    );
}
