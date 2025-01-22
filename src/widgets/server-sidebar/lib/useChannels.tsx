'use client';

import { useState, useEffect } from 'react';
import { Channel, ChannelType, Member, Server } from '@prisma/client';
import { clientCreateClient } from '@/shared/lib/utils';

interface UseChannelsResult {
  textChannels: Channel[];
  audioChannels: Channel[];
  videoChannels: Channel[];
}

const useChannels = (
  server: Server & { channels: Channel[]; members: Member[] }
): UseChannelsResult => {
  const [textChannels, setTextChannels] = useState<Channel[]>(
    server.channels.filter((channel) => channel.type === ChannelType.TEXT)
  );
  const [audioChannels, setAudioChannels] = useState<Channel[]>(
    server.channels.filter((channel) => channel.type === ChannelType.AUDIO)
  );
  const [videoChannels, setVideoChannels] = useState<Channel[]>(
    server.channels.filter((channel) => channel.type === ChannelType.VIDEO)
  );

  const supabase = clientCreateClient();

  useEffect(() => {
    const channel = supabase.channel(`${server.id}-channels`).on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'Channel',
        filter: `serverId=eq.${server.id}`,
      },
      (payload) => {
        const newChannel = payload.new as Channel;
        // @ts-ignore
        const oldChannelId = payload.old.id as string;

        if (payload.eventType === 'INSERT') {
          switch (newChannel.type) {
            case 'TEXT':
              setTextChannels((prev) => [...prev, newChannel]);
              break;
            case 'AUDIO':
              setAudioChannels((prev) => [...prev, newChannel]);
              break;
            case 'VIDEO':
              setVideoChannels((prev) => [...prev, newChannel]);
              break;
          }
        }

        if (payload.eventType === 'UPDATE') {
          switch (newChannel.type) {
            case 'TEXT':
              setTextChannels((prev) =>
                prev.map((channel) =>
                  channel.id === newChannel.id ? newChannel : channel
                )
              );
              break;
            case 'AUDIO':
              setAudioChannels((prev) =>
                prev.map((channel) =>
                  channel.id === newChannel.id ? newChannel : channel
                )
              );
              break;
            case 'VIDEO':
              setVideoChannels((prev) =>
                prev.map((channel) =>
                  channel.id === newChannel.id ? newChannel : channel
                )
              );
              break;
          }
        }

        if (payload.eventType === 'DELETE') {
          setTextChannels((prev) =>
            prev.filter((channel) => channel.id !== oldChannelId)
          );
          setAudioChannels((prev) =>
            prev.filter((channel) => channel.id !== oldChannelId)
          );
          setVideoChannels((prev) =>
            prev.filter((channel) => channel.id !== oldChannelId)
          );
        }
      }
    );

    channel.subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [server.id, supabase]);

  return { textChannels, audioChannels, videoChannels };
};

export default useChannels;
