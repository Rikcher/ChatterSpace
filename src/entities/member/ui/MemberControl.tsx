import React from 'react';
import { UserAvatar } from '@/entities/user/@x/member';
import { roleIconMap } from '../config/maps';
import MemberAction from './MemberAction';
import { MemberWithProfile, ServerWithMembersWithProfiles } from '@types';
import { cn } from '@/shared/lib/utils';

interface MemberControlProps {
  member: MemberWithProfile;
  server?: ServerWithMembersWithProfiles;
  className?: string;
}

const MemberControl: React.FC<MemberControlProps> = ({
  member,
  server,
  className,
}) => {
  return (
    <div className={cn('flex items-center gap-2 mb-6', className)}>
      <UserAvatar
        src={member.profile.imageUrl}
        fallbackName={member.profile.username}
      />
      <div className="flex flex-col gap-1">
        <div className="text-xs font-semibold flex items-center">
          {member.profile.username}
          {roleIconMap[member.role]}
        </div>
        <p className="text-xs text-foreground/60">{member.profile.email}</p>
      </div>
      {server && <MemberAction member={member} server={server} />}
    </div>
  );
};

export default MemberControl;
