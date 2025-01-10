import React from 'react';
import { db, initialProfile } from '@/shared/lib/utils';
import { redirect } from 'next/navigation';
import { LogoutButton } from '@/shared/ui/logout-button';
import Image from 'next/image';

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
    <div>
      <p>Create a server</p>
      <Image
        src={profile.imageUrl}
        alt="user profile image"
        width={200}
        height={200}
      ></Image>
      <LogoutButton />
    </div>
  );
};
export default SetupPage;
