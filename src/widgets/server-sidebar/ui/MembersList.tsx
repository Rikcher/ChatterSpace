'use client';

import React from 'react';
import { ScrollArea } from '@/shared/shadcn-ui';
import ServerMember from './ServerMember';
import useMembers from '../lib/useMembers';
import { ServerWithMembersWithProfiles } from '@types';

interface MembersListProps {
  server: ServerWithMembersWithProfiles;
  profileId: string;
}

const MembersList: React.FC<MembersListProps> = ({ server, profileId }) => {
  const { members } = useMembers(server);

  return (
    <ScrollArea className="flex-1 px-3">
      {!!members?.length && (
        <div className="my-2">
          {members.map((member) => (
            <ServerMember
              key={member.id}
              member={member}
              profileId={profileId}
            />
          ))}
        </div>
      )}
    </ScrollArea>
  );
};

export default MembersList;
