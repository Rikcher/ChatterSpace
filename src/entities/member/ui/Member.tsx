'use client';

import React from 'react';
import { MemberWithProfile } from '@types';
import { MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/shared/lib/utils';
import { UserAvatar } from '@/entities/user/@x/member';
import { roleIconMap } from '../config/maps';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/shared/shadcn-ui';

interface MemberProps {
  member: MemberWithProfile;
  profileId: string;
}

const Member: React.FC<MemberProps> = ({ member, profileId }) => {
  const router = useRouter();
  const icon = roleIconMap[member.role];

  const onClick = () => {
    router.push(`/conversations/${member.profile.id}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          'group px-2 py-2 mb-2 rounded-md flex items-center gap-2 w-full bg-transparent text-foreground/60 justify-start hover:bg-foreground/5'
        )}
      >
        <UserAvatar
          src={member.profile.imageUrl}
          fallbackName={member.profile.username}
          className="h-8 w-8 md:h-8 md:w-8"
        />
        <p
          className={cn(
            'line-clamp-1 font-semibold text-xs text-foreground/60 group-hover:text-foreground transition-colors'
          )}
        >
          {member.profile.username}
        </p>
        {icon}
      </DropdownMenuTrigger>
      {member.profileId !== profileId && (
        <DropdownMenuContent side="left">
          <DropdownMenuItem onClick={onClick}>
            <MessageCircle className="h-4 w-4" />
            Message
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
};

export default Member;
