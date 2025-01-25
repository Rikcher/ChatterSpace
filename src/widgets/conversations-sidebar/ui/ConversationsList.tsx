'use client';

import React, { useEffect } from 'react';
import ConversationItem from './ConversationItem';
import { ScrollArea } from '@/shared/shadcn-ui';
import useConversationSubscription from '../lib/useConversationSubscription';
import { useConversationsStore } from '../store/ConversationsStore';
import { ProfileWithConversations } from '@types';

interface ConversationsListProps {
  profile: ProfileWithConversations;
}

const ConversationsList: React.FC<ConversationsListProps> = ({ profile }) => {
  useConversationSubscription(profile);
  const { sortedConversations, setConversations } = useConversationsStore();

  useEffect(() => {
    setConversations([
      ...profile.conversationsInitiated,
      ...profile.conversationsReceived,
    ]);
  }, [profile]);

  return (
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
                <ConversationItem
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
  );
};

export default ConversationsList;
