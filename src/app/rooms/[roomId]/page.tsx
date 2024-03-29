import { GithubIcon } from "lucide-react";
import Link from "next/link";

import { TagsList } from "@/components/shared/TagsList";
import { splitTags } from "@/lib/utils";
import { getRoom } from "@/services/rooms";

import { DevRoomsVideo } from "./video-player";

export default async function RoomPage(props: { params: { roomId: string } }) {
  const roomId = props.params.roomId;
  const room = await getRoom(roomId);
  if (!room) {
    throw new Error("Room not found");
  }
  const tags = splitTags(room.tags);
  return (
    <div className="grid grid-cols-4 min-h-scree">
      <div className="col-span-3 p-4 pr-2">
        <div
          className="
                rounded-lg border bg-card text-card-foreground shadow-sm p-4
        "
        >
          <DevRoomsVideo room={room} />
        </div>
      </div>
      <div className="col-span-1 p-4 pl-2">
        <div
          className="
        rounded-lg border bg-card text-card-foreground shadow-sm p-4 flex flex-col gap-4
        "
        >
          <h1 className="text-base">{room?.name}</h1>
          {room.githubRepository && (
            <Link
              className="flex items-center gap-x-4"
              href={room.githubRepository}
              target="_blank"
              rel="noreferrer noopener"
            >
              <GithubIcon />
              <p>GitHub Repository</p>
            </Link>
          )}
          <p className="text-base text-gray-500">{room?.description}</p>
          <TagsList tags={tags} />
        </div>
      </div>
    </div>
  );
}
