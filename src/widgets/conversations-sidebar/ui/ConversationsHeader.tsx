'use client';

import React from 'react';
import { ActionTooltip } from '@/shared/ui/action-tooltip';
import { Button } from '@/shared/shadcn-ui';
import { Plus } from 'lucide-react';

const ConversationsHeader = () => {
  return (
    <div className="flex items-center justify-between pb-2">
      <p className="text-xs font-semibold text-foreground/60">
        Direct Messages
      </p>
      <ActionTooltip label="Create DM" side="top">
        <Button
          className="flex h-auto text-foreground/60 bg-transparent p-1 rounded-full hover:bg-foreground/10 hover:text-foreground"
          onClick={() => {}}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </ActionTooltip>
    </div>
  );
};
export default ConversationsHeader;
