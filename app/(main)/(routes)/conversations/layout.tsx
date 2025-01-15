import React from 'react';
import { currentProfile } from '@/entities/user';
import { redirect } from 'next/navigation';

import { ConversationsSidebar } from '@/widgets/conversations-sidebar';

const ConversationsLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect('/login');
  }

  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
        <ConversationsSidebar />
      </div>
      <main className="h-full md:px-60">{children}</main>
    </div>
  );
};
export default ConversationsLayout;
