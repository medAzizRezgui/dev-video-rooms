import { GithubIcon } from "lucide-react";
import Link from "next/link";

import { SearchBar } from "@/components/pages/home/search-bar";
import { TagsList } from "@/components/shared/TagsList";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Room } from "@/db/schema";
import { splitTags } from "@/lib/utils";
import { getRooms } from "@/services/rooms";

function RoomCard({ room }: { room: Room }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <TagsList tags={splitTags(room.tags)} />
        {room.githubRepository && (
          <Link
            className="flex items-center gap-x-4 mt-4"
            href={room.githubRepository}
            target="_blank"
            rel="noreferrer noopener"
          >
            <GithubIcon />
            <p>GitHub Repository</p>
          </Link>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link href={`/rooms/${room.id}`}>Join Room</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default async function Home({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  console.log(searchParams.search);
  const rooms = await getRooms(searchParams.search);
  return (
    <main className="w-full min-h-screen p-12">
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
    </main>
  );
}
