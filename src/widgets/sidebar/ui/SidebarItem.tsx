'use client';

import React from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

import { cn } from '@/shared/lib/utils';
import { ActionTooltip } from '@/shared/ui/action-tooltip';
import { Button } from '@/shared/shadcn-ui';

interface SidebarItemProps {
  id: string;
  imageUrl: string;
  name: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ id, imageUrl, name }) => {
  const params = useParams();
  const router = useRouter();

  const onClick = () => {
    router.push(`/servers/${id}`);
  };

  return (
    <div className="group relative flex items-center">
      <div
        className={cn(
          'absolute left-0 bg-primary rounded-r-full transition w-[4px] transition-all duration-300',
          params?.serverId !== id && 'group-hover:h-[20px]',
          params?.serverId === id ? 'h-[36px]' : 'h-[8px]'
        )}
      />
      <ActionTooltip side="right" align="center" label={name}>
        <Button
          onClick={onClick}
          className={cn(
            'relative flex h-[48px] w-[48px] items-center mx-3 rounded-[24px] group-hover:rounded-[16px] overflow-hidden transition-all duration-300 bg-transparent hover:bg-transparent',
            params?.serverId === id && 'rounded-[16px]'
          )}
        >
          <Image fill src={imageUrl} alt="Channel" />
        </Button>
      </ActionTooltip>
    </div>
  );
};

export default SidebarItem;
