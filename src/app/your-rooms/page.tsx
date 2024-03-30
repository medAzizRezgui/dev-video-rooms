import { unstable_noStore } from "next/cache";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getUserRooms } from "@/services/rooms";

import { YourRoomCard } from "./your-room-card";

export default async function YourRoomsPage() {
  unstable_noStore();
  const rooms = await getUserRooms();
  return (
    <main className="w-full container mx-auto min-h-screen p-12">
      <div className="flex justify-between w-full mb-12 items-center">
        <h1 className="text-4xl">Your Rooms</h1>
        <Button asChild>
          <Link href="/create-room">Create Room</Link>
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {rooms.map((room) => (
          <YourRoomCard key={room.id} room={room} />
        ))}
      </div>
    </main>
  );
}
