import React from 'react';
import { currentProfile } from '@/entities/user';
import { redirect } from 'next/navigation';
import { db } from '@/shared/lib/utils';

interface InviteCodePageProps {
  params: Promise<{
    inviteCode: string;
  }>;
}

const InviteCodePage: React.FC<InviteCodePageProps> = async ({ params }) => {
  const profile = await currentProfile();
  const inviteCode = (await params).inviteCode;

  if (!profile) {
    return redirect('/login');
  }

  if (!inviteCode) {
    return redirect('/');
  }

  const validInviteCode = await db.server.findFirst({
    where: {
      inviteCode,
    },
  });

  if (!validInviteCode) {
    return redirect('/404');
  }

  const existingServer = await db.server.findFirst({
    where: {
      inviteCode,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (existingServer) {
    return redirect(`/servers/${existingServer.id}`);
  }

  const server = await db.server.update({
    where: {
      inviteCode,
    },
    data: {
      members: {
        create: [
          {
            profileId: profile.id,
          },
        ],
      },
    },
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return null;
};

export default InviteCodePage;
