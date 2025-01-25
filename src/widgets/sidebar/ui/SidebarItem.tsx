'use client';

import React from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

import { cn } from '@/shared/lib/utils';
import { ActionTooltip } from '@/shared/ui/action-tooltip';
import { Button } from '@/shared/shadcn-ui';
import { UserAvatar } from '@/entities/user';

interface SidebarItemProps {
  id: string;
  imageUrl: string;
  name: string;
  type: 'server' | 'conversation';
  channelId?: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  id,
  imageUrl,
  name,
  type,
  channelId,
}) => {
  const params = useParams();
  const router = useRouter();

  const onClick = () => {
    if (type === 'server' && channelId) {
      router.push(`/servers/${id}/channels/${channelId}`);
    } else {
      router.push(`/conversations/${id}`);
    }
  };

  return (
    <div className="group relative flex items-center">
      {type === 'server' && (
        <div
          className={cn(
            'absolute left-0 bg-primary rounded-r-full w-[4px] transition-all duration-200',
            params?.serverId !== id && 'group-hover:h-[20px]',
            params?.serverId === id ? 'h-[36px]' : 'h-0'
          )}
        />
      )}
      <ActionTooltip side="right" align="center" label={name}>
        <Button
          onClick={onClick}
          className={cn(
            'relative flex h-[48px] w-[48px] p-0 items-center mx-3 rounded-[24px] group-hover:rounded-[16px] overflow-hidden transition-all duration-300 bg-transparent hover:bg-transparent',
            params?.serverId === id && 'rounded-[16px]'
          )}
        >
          {type === 'server' ? (
            <Image fill src={imageUrl} alt="Channel" sizes="48px" />
          ) : (
            <UserAvatar
              src={imageUrl}
              fallbackName={name}
              className="rounded-none h-[48px] w-[48px] md:h-[48px] md:w-[48px]"
            />
          )}
        </Button>
      </ActionTooltip>
    </div>
  );
};

export default SidebarItem;
