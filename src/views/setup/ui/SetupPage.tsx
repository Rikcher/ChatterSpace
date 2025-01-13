import React from 'react';
import { db } from '@/shared/lib/utils';
import { initialProfile } from '@/entities/user';
import { redirect } from 'next/navigation';
import { InitialServerModal } from '@/features/server-initial';

const SetupPage = async () => {
  const profile = await initialProfile();

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (server) {
    redirect(`/servers/${server.id}`);
  }

  return (
    <>
      <InitialServerModal />
    </>
  );
};
export default SetupPage;
