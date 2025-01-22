import React from 'react';
import { currentProfile } from '@/entities/user';
import { redirect } from 'next/navigation';
import { db } from '@/shared/lib/utils';

import MembersList from './MembersList';

interface ServerMembersSidebarProps {
  serverId: string;
}

const ServerMembersSidebar: React.FC<ServerMembersSidebarProps> = async ({
  serverId,
}) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect('/');
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
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

  return (
    <div className="flex flex-col h-full w-full bg-card-shade">
      <p className="text-xs font-semibold text-foreground/60 mt-5 mx-3">
        {'Members'.toUpperCase()}
      </p>
      <MembersList server={server} profileId={profile.id} />
    </div>
  );
};

export default ServerMembersSidebar;
