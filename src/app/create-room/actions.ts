"use server";

import { db } from "@/db";
import { Room, room } from "@/db/schema";
import { getSession } from "@/lib/auth";

export async function CreateRoomAction(roomData: Omit<Room, "userId" | "id">) {
  const session = await getSession();
  if (!session) {
    throw new Error("not logged in");
  }
  await db.insert(room).values({ ...roomData, userId: session.user.id });
}
