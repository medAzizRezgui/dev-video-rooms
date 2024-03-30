import { eq } from "drizzle-orm";
import { like } from "drizzle-orm";

import { db } from "@/db";
import { Room, room } from "@/db/schema";
import { getSession } from "@/lib/auth";
export async function getRooms(search: string | undefined) {
  const where = search ? like(room.tags, `%${search}%`) : undefined;
  const rooms = await db.query.room.findMany({
    where: where,
  });
  return rooms;
}

export async function getUserRooms() {
  const session = await getSession();
  if (!session?.user) {
    throw new Error("not logged in");
  }
  const rooms = await db.query.room.findMany({
    where: eq(room.userId, session.user.id),
  });
  return rooms;
}

export async function getRoom(roomId: string) {
  return await db.query.room.findFirst({ where: eq(room.id, roomId) });
}

export async function deleteRoom(roomId: string) {
  await db.delete(room).where(eq(room.id, roomId));
}

export async function createRoom(
  roomData: Omit<Room, "userId" | "id">,
  userId: string
) {
  const created = await db
    .insert(room)
    .values({ ...roomData, userId })
    .returning();
  return created[0];
}

export async function editRoom(roomData: Room) {
  const updated = await db
    .update(room)
    .set(roomData)
    .where(eq(room.id, roomData.id))
    .returning();
  return updated[0];
}
