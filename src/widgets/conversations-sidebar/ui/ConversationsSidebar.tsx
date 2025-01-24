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

  // Sort conversations: pinned first
  const sortedConversations = conversations.sort((a, b) => {
    const isPinnedA = a.pinned.includes(profile.id);
    const isPinnedB = b.pinned.includes(profile.id);

    if (isPinnedA && !isPinnedB) return -1;
    if (!isPinnedA && isPinnedB) return 1;
    return 0;
  });

  return (
    <div className="flex flex-col h-full w-full bg-card-shade px-3">
      <ConversationsHeader />
      <ScrollArea className="flex-1">
        {!!sortedConversations?.length && (
          <div className="mb-2">
            {sortedConversations.map((conversation) => {
              const otherProfile =
                conversation.profileOne.id === profile.id
                  ? conversation.profileTwo
                  : conversation.profileOne;

              return (
                <div key={conversation.id}>
                  <Conversation
                    profile={otherProfile}
                    profileId={profile.id}
                    conversation={conversation}
                  />
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
