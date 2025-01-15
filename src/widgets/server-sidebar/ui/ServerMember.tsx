'use client';

import React from 'react';
import { Member, MemberRole, Profile, Server } from '@prisma/client';
import { MessageCircle, ShieldAlert, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/shadcn-ui';
import { cn } from '@/shared/lib/utils';
import { UserAvatar } from '@/entities/user';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/shared/shadcn-ui';

interface ServerMemberProps {
  member: Member & { profile: Profile };
}

const iconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: <ShieldCheck className="h-5 w-5 text-indigo-500" />,
  [MemberRole.ADMIN]: <ShieldAlert className="h-5 w-5 text-rose-500" />,
};

const ServerMember: React.FC<ServerMemberProps> = ({ member }) => {
  const router = useRouter();
  const icon = iconMap[member.role];

  const onClick = () => {
    router.push(`/conversations/${member.profile.id}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        onClick={() => {}}
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
      <DropdownMenuContent side="left">
        <DropdownMenuItem onClick={onClick}>
          <MessageCircle className="h-4 w-4" />
          Message
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ServerMember;
