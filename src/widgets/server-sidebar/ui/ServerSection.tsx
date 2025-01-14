'use client';

import React from 'react';
import { ChannelType, MemberRole } from '@prisma/client';
import { ActionTooltip } from '@/shared/ui/action-tooltip';
import { Button } from '@/shared/shadcn-ui';
import { Plus } from 'lucide-react';
import { useModal } from '@/shared/lib/hooks';

interface ServerSectionProps {
  label: string;
  role: MemberRole;
  channelType?: ChannelType;
}

const ServerSection: React.FC<ServerSectionProps> = ({
  label,
  role,
  channelType,
}) => {
  const { onOpen } = useModal();

  return (
    <div className="flex items-center justify-between py-2">
      <p className="text-xs font-semibold text-foreground/60">
        {label.toUpperCase()}
      </p>
      {role !== MemberRole.GUEST && (
        <ActionTooltip label="Create Channel" side="top">
          <Button
            className="flex h-auto text-foreground/60 bg-transparent p-1 rounded-full hover:bg-foreground/10"
            onClick={() => onOpen('createChannel', { channelType })}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </ActionTooltip>
      )}
    </div>
  );
};

export default ServerSection;
