import React from 'react';
import { currentProfile } from '@/entities/user';
import { redirect } from 'next/navigation';
import { db } from '@/shared/lib/utils';
import ServerHeader from './ServerHeader';
import ChannelsList from './ChannelsList';

interface ServerSidebarProps {
  serverId: string;
}

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

  const role = server.members.find(
    (member) => member.profileId === profile.id
  )!.role;

  return (
    <div className="flex flex-col h-full w-full bg-card-shade">
      <ServerHeader server={server} role={role} />
      <ChannelsList server={server} role={role} />
    </div>
  );
};

export default ServerSidebar;
