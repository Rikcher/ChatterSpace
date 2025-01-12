import React from 'react';
import { currentProfile } from '@/entities/user';
import { redirect } from 'next/navigation';
import { db } from '@/shared/lib/utils';

import { ServerSidebar } from '@/widgets/server-sidebar';

const ServerLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { serverId: string };
}) => {
  const profile = await currentProfile();
  const { serverId } = await params;

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
      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
};
export default ServerLayout;
