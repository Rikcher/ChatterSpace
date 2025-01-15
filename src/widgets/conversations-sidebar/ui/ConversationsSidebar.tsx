import React from 'react';
import { currentProfile } from '@/entities/user';
import { redirect } from 'next/navigation';
import { ScrollArea } from '@/shared/shadcn-ui';
import { db } from '@/shared/lib/utils';
import ConversationsHeader from './ConversationsHeader';
import Conversation from '@/widgets/conversations-sidebar/ui/Conversation';

const ConversationsSidebar = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect('/');
  }

  const conversations = await db.conversation.findMany({
    where: {
      OR: [{ profileOneId: profile.id }, { profileTwoId: profile.id }],
    },
    include: {
      profileOne: true,
      profileTwo: true,
    },
  });

  return (
    <div className="flex flex-col h-full w-full bg-card-shade p-3">
      <ConversationsHeader />
      <ScrollArea className="flex-1">
        {!!conversations?.length && (
          <div className="mb-2">
            {conversations.map((conversation) => {
              const otherProfile =
                conversation.profileOne.id === profile.id
                  ? conversation.profileTwo
                  : conversation.profileOne;

              return (
                <div key={conversation.id}>
                  <Conversation profile={otherProfile} />
                </div>
              );
            })}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};
export default ConversationsSidebar;
