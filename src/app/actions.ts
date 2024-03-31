"use server";

import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth";
import { deleteUser } from "@/services/users";

export async function deleteAccountAction() {
  const session = await getSession();
  if (!session) {
    throw new Error("not logged in");
  }
  await deleteUser(session.user.id);
}
