import React from 'react';
import { profileWithConversations } from '@/entities/user';
import { redirect } from 'next/navigation';
import ConversationsList from './ConversationsList';
import ConversationsHeader from './ConversationsHeader';

const ConversationsSidebar = async () => {
  const profile = await profileWithConversations();

  if (!profile) {
    return redirect('/');
  }

  return (
    <div className="flex flex-col h-full w-full bg-card-shade px-3">
      <ConversationsHeader />
      <ConversationsList profile={profile} />
    </div>
  );
};

export default ConversationsSidebar;
