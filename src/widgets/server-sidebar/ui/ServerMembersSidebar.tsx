import React from 'react';
import { currentProfile } from '@/entities/user';
import { redirect } from 'next/navigation';
import { db } from '@/shared/lib/utils';

import MembersList from './MembersList';
import MembersHeader from './MembersHeader';

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
      <MembersHeader profileId={profile.id} />
      <MembersList server={server} profileId={profile.id} />
    </div>
  );
};

export default ServerMembersSidebar;
