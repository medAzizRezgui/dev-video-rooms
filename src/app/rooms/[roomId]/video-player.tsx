"use client";
import "@stream-io/video-react-sdk/dist/css/styles.css";

import {
  Call,
  CallControls,
  CallParticipantsList,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { Room } from "@/db/schema";

import { generateTokenAction } from "./actions";

const apiKey = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY!;

export function DevRoomsVideo({ room }: { room: Room }) {
  const router = useRouter();
  const session = useSession();
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<Call | null>(null);
  useEffect(() => {
    if (!session.data || !room) return;
    const userId = session.data.user.id;
    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: userId,
        name: session.data.user.name ?? undefined,
        image: session.data.user.image ?? undefined,
      },
      tokenProvider: () => generateTokenAction(),
    });

    setClient(client);
    const call = client.call("default", room.id);
    call.join({ create: true });
    setCall(call);
    return () => {
      client.disconnectUser();
    };
  }, [session, room]);

  return (
    client &&
    call && (
      <StreamVideo client={client}>
        <StreamCall call={call}>
          <StreamTheme>
            <SpeakerLayout />
            <CallControls onLeave={() => router.push("/")} />
            <CallParticipantsList onClose={() => {}} />
          </StreamTheme>
        </StreamCall>
      </StreamVideo>
    )
  );
}
