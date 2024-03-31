"use client";
import { DeleteIcon, LogInIcon, LogOutIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
import { deleteAccountAction } from "./actions";

function AccountDropdown() {
  const session = useSession();
  const [open, setOpen] = useState(false);
  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              room.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await deleteAccountAction();
                signOut({ callbackUrl: "/" });
                setOpen(false);
              }}
            >
              Yes, delete my account.
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <DeleteIcon className="mr-2" />
            Delete Account
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export function Header() {
  const session = useSession();
  const isLoggedIn = !!session.data;
  return (
    <header className="bg-gray-100 dark:bg-gray-900 py-2  relative z-10">
      <div className="flex container mx-auto items-center justify-between">
        {/* LOGO */}
        <Link href={"/"}>
          <div className="flex items-center gap-x-4">
            <Image src="/icon.png" width="80" height="80" alt="logo" />
            <h1 className="font-bold text-3xl">Dev Rooms</h1>
          </div>
        </Link>

        {isLoggedIn && (
          <>
            <Link href="/browse">Browse </Link>
            <Link href="/your-rooms">My Rooms</Link>
          </>
        )}

        <div className="flex items-center gap-x-4">
          {isLoggedIn && <AccountDropdown />}
          {!isLoggedIn && (
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
