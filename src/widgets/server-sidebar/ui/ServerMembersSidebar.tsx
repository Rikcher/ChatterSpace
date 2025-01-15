import React from 'react';
import { currentProfile } from '@/entities/user';
import { redirect } from 'next/navigation';
import { db } from '@/shared/lib/utils';

import { ScrollArea } from '@/shared/shadcn-ui';
import ServerMember from './ServerMember';

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

  const members = server.members;

  return (
    <div className="flex flex-col h-full w-full bg-card-shade">
      <ScrollArea className=" flex-1 px-3">
        {!!members?.length && (
          <div className="my-4">
            <p className="text-xs font-semibold text-foreground/60 mb-2">
              {'Members'.toUpperCase()}
            </p>
            {members.map((member) => (
              <ServerMember key={member.id} member={member} />
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default ServerMembersSidebar;
