import React from 'react';
import { currentProfile } from '@/entities/user';
import { redirect } from 'next/navigation';
import { getOrCreateConversation } from '@/shared/lib/utils';
import ConversationsHeader from './ConversationHeader';
import { ChatDisplay, ChatMessageInput } from '@/features/chat';

interface ConversationPageProps {
  params: Promise<{ profileId: string }>;
}

const ConversationPage: React.FC<ConversationPageProps> = async ({
  params,
}) => {
  const profileId = (await params).profileId;
  const profile = await currentProfile();

  if (!profile) {
    return redirect('/login');
  }

  const conversation = await getOrCreateConversation(profile.id, profileId);

  if (!conversation) {
    return redirect('/conversations');
  }

  const { profileOne, profileTwo } = conversation;

  const otherProfile = profileOne.id === profile.id ? profileTwo : profileOne;

  return (
    <div className="bg-card-shade-2 flex flex-col h-full">
      <ConversationsHeader
        imageUrl={otherProfile.imageUrl}
        name={otherProfile.username}
      />
      <ChatDisplay
        name={otherProfile.username}
        profileId={profile.id}
        conversationId={conversation.id}
        otherProfileId={otherProfile.id}
      />
      <ChatMessageInput
        name={otherProfile.username}
        profile={profile}
        conversationId={conversation.id}
        otherProfileId={otherProfile.id}
      />
    </div>
  );
};

export default ConversationPage;
