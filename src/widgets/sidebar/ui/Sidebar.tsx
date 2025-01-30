import React from 'react';
import { redirect } from 'next/navigation';

import { db } from '@/shared/lib/utils';
import { Separator, ScrollArea } from '@/shared/shadcn-ui';
import AddServerAction from './AddServerAction';
import ConversationsAction from './ConversationsAction';
import SidebarItem from './SidebarItem';
import { ThemeToggle } from '@/shared/ui/theme-toggle';
import { UserControl, profileWithConversations } from '@/entities/user';

const Sidebar = async () => {
  const profile = await profileWithConversations();

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

  const conversations = await db.conversation.findMany({
    where: {
      OR: [{ profileOneId: profile.id }, { profileTwoId: profile.id }],
      pinned: {
        has: profile.id,
      },
    },
    include: {
      profileOne: true,
      profileTwo: true,
    },
  });

  return (
    <div className="flex flex-col items-center h-full w-full bg-card py-3">
      <ScrollArea className="flex-1 w-full" noScrollbar>
        <ConversationsAction />
        {conversations.map((conversation) => {
          const otherProfile =
            conversation.profileOne.id === profile.id
              ? conversation.profileTwo
              : conversation.profileOne;

          return (
            <div key={conversation.id} className="my-2">
              <SidebarItem
                id={otherProfile.id}
                name={otherProfile.username}
                imageUrl={otherProfile.imageUrl}
                type="conversation"
              />
            </div>
          );
        })}
        <Separator className="h-[2px] rounded-md w-10 mx-auto mt-3" />
        <AddServerAction />
        {servers.map((server) => (
          <div key={server.id} className="my-2">
            <SidebarItem
              id={server.id}
              name={server.name}
              imageUrl={server.imageUrl}
              type="server"
              channelId={server.channels[0].id}
            />
          </div>
        ))}
      </ScrollArea>
      <div className="pb-3 mt-auto flex items-center flex-col gap-4">
        <ThemeToggle align="end" side="right" />
        <UserControl />
      </div>
    </div>
  );
};
export default Sidebar;
