import { unstable_noStore } from "next/cache";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getRooms } from "@/services/rooms";

import { RoomCard } from "./RoomCard";
import { SearchBar } from "./search-bar";
export default async function Home({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  unstable_noStore();
  const rooms = await getRooms(searchParams.search);
  return (
    <main className="w-full container mx-auto min-h-screen p-12">
      <div className="flex justify-between w-full mb-12 items-center">
        <h1 className="text-4xl">Find Dev Rooms</h1>
        <Button asChild>
          <Link href="/create-room">Create Room</Link>
        </Button>
      </div>
      <div className="mb-12">
        <SearchBar />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
      {rooms.length === 0 && (
        <div className="w-full h-[50vh] flex flex-col items-center justify-center">
          <Image
            src="/not-found.svg"
            className="w-[200px] h-[200px]"
            alt="empty"
            width={200}
            height={200}
          />
          <h1 className="text-4xl font-bold mt-12">No rooms found</h1>
        </div>
      )}
    </main>
  );
}
