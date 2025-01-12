'use client';

import React from 'react';
import { Button } from '@/shared/shadcn-ui';
import { Plus } from 'lucide-react';
import { ActionTooltip } from '@/shared/ui/action-tooltip';
import { useModal } from '@/features/modal';

interface NavigationActionProps {}

const SidebarAction: React.FC<NavigationActionProps> = ({}) => {
  const { onOpen } = useModal();

  return (
    <div className="flex items-center">
      <ActionTooltip side="right" align="center" label="Add a server">
        <Button
          onClick={() => onOpen('createServer')}
          className="flex m-3 h-[48px] w-[48px] rounded-[24px] hover:rounded-[16px] transition-all duration-300 overflow-hidden items-center justify-center bg-background-shade hover:bg-primary text-foreground hover:text-background"
        >
          <Plus size={25} />
        </Button>
      </ActionTooltip>
    </div>
  );
};

export default SidebarAction;
