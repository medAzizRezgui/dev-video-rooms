"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { ModeToggle } from "../components/mode-toggle";
import { Button } from "../components/ui/button";

export function Header() {
  const session = useSession();
  return (
    <header>
      <div>
        {session.data ? (
          <Button onClick={() => signOut()}>Sign Out</Button>
        ) : (
          <Button onClick={() => signIn("google")}>Sign In</Button>
        )}
        <ModeToggle />
      </div>
    </header>
  );
}
