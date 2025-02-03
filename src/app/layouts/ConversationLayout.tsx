import React from 'react';
import { currentProfile } from '@/entities/user';
import { redirect } from 'next/navigation';

import { ConversationsSidebar } from '@/widgets/conversations-sidebar';

const ConversationLayout = async ({
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
      <div className="hidden md:flex h-full w-60 z-20 flex-col fixed">
        <ConversationsSidebar />
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
};
export default ConversationLayout;
