import React from 'react';
import { currentProfile } from '@/entities/user';
import { redirect } from 'next/navigation';
import { db } from '@/shared/lib/utils';

interface ServerPageProps {
  params: Promise<{ serverId: string }>;
}

const ServerPage: React.FC<ServerPageProps> = async ({ params }) => {
  const serverId = (await params).serverId;
  const profile = await currentProfile();

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
    include: {
      channels: {
        where: {
          name: 'general',
        },
        select: {
          id: true,
        },
      },
    },
  });

  if (!server) {
    return null;
  }

  return redirect(`/servers/${serverId}/channels/${server.channels[0].id}`);
};

export default ServerPage;
