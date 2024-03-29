import { unstable_noStore } from "next/cache";

import { db } from "@/db";
export async function getRooms() {
  unstable_noStore();
  const rooms = await db.query.room.findMany();
  return rooms;
}
