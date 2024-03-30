"use server";

import { revalidatePath, unstable_noStore } from "next/cache";
import { redirect } from "next/navigation";

import { Room } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { editRoom, getRoom } from "@/services/rooms";

export async function EditRoomAction(roomData: Omit<Room, "userId">) {
  const session = await getSession();
  if (!session) {
    throw new Error("not logged in");
  }
  unstable_noStore();
  const room = await getRoom(roomData.id);
  if (room?.userId !== session.user.id) {
    throw new Error("not authorized");
  }
  await editRoom({ ...roomData, userId: session.user.id });
  revalidatePath("/your-rooms");
  revalidatePath(`/edit-room/${roomData.id}`);
  redirect("/your-rooms");
}
