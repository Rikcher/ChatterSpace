'use client';

import React from 'react';
import { Member, MemberRole, Profile, Server } from '@prisma/client';
import { ShieldAlert, ShieldCheck } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/shared/shadcn-ui';
import { cn } from '@/shared/lib/utils';
import { UserAvatar } from '@/entities/user';

interface ServerMemberProps {
  member: Member & { profile: Profile };
  server: Server;
}

const iconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: <ShieldCheck className="h-5 w-5 text-indigo-500" />,
  [MemberRole.ADMIN]: <ShieldAlert className="h-5 w-5 text-rose-500" />,
};

const ServerMember: React.FC<ServerMemberProps> = ({ member, server }) => {
  const params = useParams();
  const router = useRouter();
  const icon = iconMap[member.role];

  return (
    <Button
      onClick={() => {}}
      className={cn(
        'group px-2 py-2 mb-2 rounded-md flex items-center gap-2 w-full bg-transparent text-foreground/60 justify-start hover:bg-foreground/5 [&_svg]:pointer-events-auto'
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
    </Button>
  );
};

export default ServerMember;
