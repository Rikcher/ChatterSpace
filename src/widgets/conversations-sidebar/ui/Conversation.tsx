'use client';

import React from 'react';
import { cn } from '@/shared/lib/utils';
import { UserAvatar } from '@/entities/user';
import { Button } from '@/shared/shadcn-ui';
import { Profile } from '@prisma/client';
import { useParams, useRouter } from 'next/navigation';

interface ConversationProps {
  profile: Profile;
}

const Conversation: React.FC<ConversationProps> = ({ profile }) => {
  const router = useRouter();
  const params = useParams();

  const onClick = () => {
    router.push(`/conversations/${profile.id}`);
  };

  return (
    <Button
      onClick={onClick}
      className={cn(
        'group px-2 py-2 mb-2 rounded-md flex items-center gap-2 w-full bg-transparent text-foreground/60 justify-start hover:bg-foreground/5',
        profile.id === params.profileId
          ? 'bg-foreground/20 text-foreground hover:bg-foreground/20'
          : 'hover:bg-foreground/5'
      )}
    >
      <UserAvatar
        src={profile.imageUrl}
        fallbackName={profile.username}
        className="h-8 w-8 md:h-8 md:w-8"
      />
      <p
        className={cn(
          'line-clamp-1 font-semibold text-xs text-foreground/60 group-hover:text-foreground transition-colors',
          profile.id === params.profileId
            ? 'text-foreground'
            : 'group-hover:text-foreground/80'
        )}
      >
        {profile.username}
      </p>
    </Button>
  );
};

export default Conversation;
