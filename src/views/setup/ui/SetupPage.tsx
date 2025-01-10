import React from 'react';
import { db, initialProfile } from '@/shared/lib/utils';
import { redirect } from 'next/navigation';
import { CreateServerModal } from '@/features/create-server';
import { LogoutButton } from '@/shared/ui/logout-button';

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
      <CreateServerModal />;
      <LogoutButton />
    </>
  );
};
export default SetupPage;
