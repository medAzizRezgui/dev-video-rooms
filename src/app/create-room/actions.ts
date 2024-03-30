"use server";

import { revalidatePath } from "next/cache";

import { Room } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { createRoom } from "@/services/rooms";

export async function CreateRoomAction(roomData: Omit<Room, "userId" | "id">) {
  const session = await getSession();
  if (!session) {
    throw new Error("not logged in");
  }
  await createRoom(roomData, session.user.id);
  revalidatePath("/browse");
}
