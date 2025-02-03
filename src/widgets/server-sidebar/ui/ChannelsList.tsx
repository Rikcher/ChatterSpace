'use client';

import React from 'react';
import { ScrollArea } from '@/shared/shadcn-ui';
import { Channel, ChannelType, MemberRole, Server } from '@prisma/client';
import ServerSection from './ServerSection';
import ServerChannel from './ServerChannel';
import useChannels from '../lib/useChannels';
import { MemberWithProfile } from '@types';

interface ServerSidebarClientProps {
  server: Server & { channels: Channel[]; members: MemberWithProfile[] };
  role: MemberRole;
}

const ChannelsList: React.FC<ServerSidebarClientProps> = ({ server, role }) => {
  const { textChannels, audioChannels, videoChannels } = useChannels(server);

  return (
    <ScrollArea className="flex-1 px-3">
      {!!textChannels?.length && (
        <div className="mb-2">
          <ServerSection
            channelType={ChannelType.TEXT}
            role={role}
            label="Text Channels"
          />
          {textChannels.map((channel) => (
            <ServerChannel
              key={channel.id}
              channel={channel}
              server={server}
              role={role}
            />
          ))}
        </div>
      )}
      {!!audioChannels?.length && (
        <div className="mb-2">
          <ServerSection
            channelType={ChannelType.AUDIO}
            role={role}
            label="Voice Channels"
          />
          {audioChannels.map((channel) => (
            <ServerChannel
              key={channel.id}
              channel={channel}
              server={server}
              role={role}
            />
          ))}
        </div>
      )}
      {!!videoChannels?.length && (
        <div className="mb-2">
          <ServerSection
            channelType={ChannelType.VIDEO}
            role={role}
            label="Video Channels"
          />
          {videoChannels.map((channel) => (
            <ServerChannel
              key={channel.id}
              channel={channel}
              server={server}
              role={role}
            />
          ))}
        </div>
      )}
    </ScrollArea>
  );
};

export default ChannelsList;
