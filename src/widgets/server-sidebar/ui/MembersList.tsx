'use client';

import React from 'react';
import { ScrollArea } from '@/shared/shadcn-ui';
import { ServerWithMembersWithProfiles } from '@types';
import {
  Member,
  useMembersStore,
  useMemberSubscription,
} from '@/entities/member';

interface MembersListProps {
  server: ServerWithMembersWithProfiles;
  profileId: string;
}

const MembersList: React.FC<MembersListProps> = ({ server, profileId }) => {
  useMemberSubscription(server);

  const { members } = useMembersStore();

  return (
    <ScrollArea className="flex-1 px-3" noScrollbar>
      {!!members?.length && (
        <div className="my-2">
          {members.map((member) => (
            <Member
              key={`${member.id}-sidebar`}
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
