"use server";

import { revalidatePath } from "next/cache";

import { getSession } from "@/lib/auth";
import { deleteRoom, getRoom } from "@/services/rooms";

export async function deleteRoomAction(roomId: string) {
  const session = await getSession();
  if (!session) {
    throw new Error("not logged in");
  }
  // did the user create the room?
  const room = await getRoom(roomId);
  if (room?.userId !== session.user.id) {
    throw new Error("not authorized");
  }
  await deleteRoom(roomId);
  revalidatePath("/your-rooms");
}
