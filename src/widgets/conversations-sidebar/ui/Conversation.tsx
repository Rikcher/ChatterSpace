'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { UserAvatar } from '@/entities/user';
import { Button } from '@/shared/shadcn-ui';
import { Profile, type Conversation } from '@prisma/client';
import { useParams, useRouter } from 'next/navigation';
import { Pin } from 'lucide-react';
import { ActionTooltip } from '@/shared/ui/action-tooltip';
import axios from 'axios';
import { toast } from 'sonner';

interface ConversationProps {
  profile: Profile;
  profileId: string;
  conversation: Conversation;
}

const Conversation: React.FC<ConversationProps> = ({
  profile,
  profileId,
  conversation,
}) => {
  const router = useRouter();
  const params = useParams();

  const [isPinned, setPinned] = useState(
    conversation.pinned.includes(profileId)
  );

  useEffect(() => {
    setPinned(conversation.pinned.includes(profileId));
  }, [conversation.pinned]);

  const onClick = () => {
    router.push(`/conversations/${profile.id}`);
  };

  const onToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await axios.patch(`/api/conversations/${profile.id}`);
      router.refresh();
    } catch (error) {
      toast.error(`Failed to toggle pin: ${error}`);
    }
  };

  return (
    <Button
      onClick={onClick}
      className={cn(
        'group px-2 py-2 mb-2 rounded-md flex items-center gap-2 w-full bg-transparent text-foreground/60 justify-start hover:bg-foreground/5 [&_svg]:pointer-events-auto',
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

      <ActionTooltip label="Pin conversation">
        <Pin
          onClick={(e) => onToggle(e)}
          className={cn(
            'hidden group-hover:block w-4 h-4 text-foreground/60 hover:text-foreground transition-colors ml-auto',
            isPinned && 'block text-foreground'
          )}
        />
      </ActionTooltip>
    </Button>
  );
};

export default Conversation;
