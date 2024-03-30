import { getRoom } from "@/services/rooms";

import EditRoomForm from "./edit-room-form";

export default async function EditRoomPage({
  params,
}: {
  params: { roomId: string };
}) {
  const room = await getRoom(params.roomId);
  if (!room) {
    throw new Error("Room not found");
  }
  return (
    <div className="container mx-auto flex flex-col gap-8 pt-12 pb-24">
      <h1 className="text-4xl font-bold">Edit Room</h1>
      <EditRoomForm room={room} />
    </div>
  );
}
