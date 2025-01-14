import React from 'react';
import { currentProfile } from '@/entities/user';
import { redirect } from 'next/navigation';
import { db } from '@/shared/lib/utils';
import { ChannelType, MemberRole } from '@prisma/client';

import ServerHeader from './ServerHeader';
import { ScrollArea } from '@/shared/shadcn-ui';
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from 'lucide-react';
import ServerSection from '@/widgets/server-sidebar/ui/ServerSection';
import ServerChannel from '@/widgets/server-sidebar/ui/ServerChannel';

interface ServerSidebarProps {
  serverId: string;
}

const iconMap = {
  [ChannelType.TEXT]: <Hash className="h-4 w-4" />,
  [ChannelType.AUDIO]: <Mic className="h-4 w-4" />,
  [ChannelType.VIDEO]: <Video className="h-4 w-4" />,
};

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: <ShieldCheck className="w-4 h-4 text-indigo-500" />,
  [MemberRole.ADMIN]: <ShieldAlert className="w-4 h-4 text-rose-500" />,
};

const ServerSidebar: React.FC<ServerSidebarProps> = async ({ serverId }) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect('/');
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: 'asc',
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: 'asc',
        },
      },
    },
  });

  if (!server) {
    return redirect('/');
  }

  const textChannels = server.channels.filter(
    (channel) => channel.type === ChannelType.TEXT
  );
  const audioChannels = server.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );
  const videoChannels = server.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );
  const members = server.members;

  const role = server.members.find(
    (member) => member.profileId === profile.id
  )!.role;

  return (
    <div className="flex flex-col h-full w-full bg-card-shade">
      <ServerHeader server={server} role={role} />
      <ScrollArea className=" flex-1 px-3">
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
    </div>
  );
};

export default ServerSidebar;
