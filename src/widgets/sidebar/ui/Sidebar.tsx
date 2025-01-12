import React from 'react';
import { redirect } from 'next/navigation';

import { currentProfile, db } from '@/shared/lib/utils';
import NavigationAction from './NavigationAction';
import { Separator, ScrollArea } from '@/shared/shadcn-ui';

const Sidebar = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect('/');
  }

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  return (
    <div className="flex flex-col items-center h-full w-full bg-card py-3">
      <NavigationAction />
      <Separator className="h-[2px] rounded-md w-10 mx-auto my-2" />
      <ScrollArea></ScrollArea>
    </div>
  );
};
export default Sidebar;
