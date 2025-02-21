'use client';

import React, { useEffect, useState } from 'react';
import { LiveKitRoom, VideoConference } from '@livekit/components-react';
import '@livekit/components-styles';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

interface MediaRoomProps {
  chatId: string;
  video: boolean;
  audio: boolean;
  name: string;
}

const MediaRoom: React.FC<MediaRoomProps> = ({
  chatId,
  audio,
  video,
  name,
}) => {
  const [token, setToken] = useState('');
  const router = useRouter();
  const params = useParams();

  const serverId = params?.serverId as string | undefined;

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const resp = await fetch(`/api/token?room=${chatId}&username=${name}`);
        const data = await resp.json();
        setToken(data.token);
      } catch (e) {
        console.error('Error fetching token:', e);
      }
    };

    fetchToken();
  }, [name, chatId]);

  const handleDisconnect = () => {
    if (serverId) {
      router.push(`/servers/${serverId}`);
    }
  };

  if (!token) {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="w-7 h-7 text-foreground/50 animate-spin my-4" />
        <p className="text-sm text-foreground/50">Loading...</p>
      </div>
    );
  }

  return (
    <LiveKitRoom
      data-lk-theme="default"
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      token={token}
      connect={true}
      video={video}
      audio={audio}
      onDisconnected={handleDisconnect}
    >
      <VideoConference />
    </LiveKitRoom>
  );
};

export default MediaRoom;
