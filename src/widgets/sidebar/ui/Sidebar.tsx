import React from 'react';
import { redirect } from 'next/navigation';

import { db } from '@/shared/lib/utils';
import { Separator, ScrollArea } from '@/shared/shadcn-ui';
import AddServerAction from './AddServerAction';
import ConversationsAction from './ConversationsAction';
import SidebarItem from './SidebarItem';
import { ThemeToggle } from '@/shared/ui/theme-toggle';
import { UserControl, currentProfile } from '@/entities/user';

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
      <ConversationsAction />
      <Separator className="h-[2px] rounded-md w-10 mx-auto mt-1 mb-3" />
      <AddServerAction />
      <ScrollArea className="flex-1 w-full">
        {servers.map((server) => (
          <div key={server.id} className="my-2">
            <SidebarItem
              id={server.id}
              name={server.name}
              imageUrl={server.imageUrl}
            />
          </div>
        ))}
      </ScrollArea>
      <div className="pb-3 mt-auto flex items-center flex-col gap-4">
        <ThemeToggle />
        <UserControl />
      </div>
    </div>
  );
};
export default Sidebar;
