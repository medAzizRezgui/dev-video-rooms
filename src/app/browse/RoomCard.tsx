import { GithubIcon } from "lucide-react";
import Link from "next/link";

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

export function RoomCard({ room }: { room: Room }) {
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
