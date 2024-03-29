"use client";
import { LogInIcon, LogOutIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ModeToggle } from "../components/mode-toggle";

function AccountDropdown() {
  const session = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"link"}>
          <div className="flex items-center gap-x-2">
            <Avatar>
              <AvatarImage src={session.data?.user?.image ?? ""} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p>{session.data?.user?.name}</p>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() =>
            signOut({
              callbackUrl: "/",
            })
          }
        >
          <LogOutIcon className="mr-2" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Header() {
  const session = useSession();

  return (
    <header className="bg-gray-100 dark:bg-gray-900 py-2 container max-auto">
      <div className="flex items-center justify-between">
        {/* LOGO */}
        <Link href={"/"}>
          <div className="flex items-center gap-x-4">
            <Image src="/icon.png" width="80" height="80" alt="logo" />
            <h1 className="font-bold text-3xl">Dev Rooms</h1>
          </div>
        </Link>
        <div className="flex items-center gap-x-4">
          {session.data && <AccountDropdown />}
          {!session.data && (
            <Button
              onClick={() =>
                signIn("google", {
                  callbackUrl: "/",
                })
              }
            >
              <LogInIcon className="mr-2" />
              Sign In
            </Button>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
