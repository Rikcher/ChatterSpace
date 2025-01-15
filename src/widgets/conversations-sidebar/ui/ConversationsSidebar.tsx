import React from 'react';
import { currentProfile } from '@/entities/user';
import { redirect } from 'next/navigation';
import { ScrollArea } from '@/shared/shadcn-ui';
import { db } from '@/shared/lib/utils';
import ConversationsHeader from './ConversationsHeader';

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
      <ScrollArea className=" flex-1 px-3">
        {!!conversations?.length && (
          <div className="mb-2">
            {conversations.map((conversation) => (
              <div key={conversation.id}>
                <p>
                  With:{' '}
                  {conversation.profileOneId === profile.id
                    ? conversation.profileTwo?.username
                    : conversation.profileOne?.username}
                </p>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};
export default ConversationsSidebar;
