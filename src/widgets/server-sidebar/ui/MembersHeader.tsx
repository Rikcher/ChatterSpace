'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/shared/shadcn-ui';
import { ActionTooltip } from '@/shared/ui/action-tooltip';
import { ServerWithMembersWithProfiles } from '@types';
import { useModal } from '@/shared/lib/hooks';

interface MembersHeaderProps {
  server: ServerWithMembersWithProfiles;
}

const MembersHeader: React.FC<MembersHeaderProps> = ({ server }) => {
  const { onOpen } = useModal();

  return (
    <div className="text-xs font-semibold text-foreground/60 mt-5 mx-3 flex justify-between">
      {'Members'.toUpperCase()}
      <ActionTooltip side="left" align="center" label="Find Member">
        <Button
          onClick={() => onOpen('findMember', { server })}
          className="bg-transparent hover:bg-transparent text-foreground/60 p-0 m-0 flex h-4 w-4"
        >
          <Search />
        </Button>
      </ActionTooltip>
    </div>
  );
};
export default MembersHeader;
