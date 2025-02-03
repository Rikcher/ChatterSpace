import React from 'react';
import { currentProfile } from '@/entities/user';
import { redirect } from 'next/navigation';
import { db } from '@/shared/lib/utils';

import { ServerMembersSidebar, ServerSidebar } from '@/widgets/server-sidebar';

const ServerLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ serverId: string }>;
}) => {
  const profile = await currentProfile();
  const serverId = (await params).serverId;

  if (!profile) {
    return redirect('/login');
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (!server) {
    return redirect('/');
  }

  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
        <ServerSidebar serverId={server.id} />
      </div>
      <main className="h-full md:px-60">{children}</main>
      <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0 right-0">
        <ServerMembersSidebar serverId={server.id} />
      </div>
    </div>
  );
};
export default ServerLayout;
