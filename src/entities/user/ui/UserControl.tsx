import React from 'react';

import { currentProfile } from '../lib/current-profile';
import { redirect } from 'next/navigation';
import { ActionTooltip } from '@/shared/ui/action-tooltip';
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/shared/shadcn-ui';
import UserAvatar from './UserAvatar';
import ControlContent from './ControlContent';

const UserControl = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect('/login');
  }

  return (
    <Popover>
      <ActionTooltip label={profile.username} side="right" align="center">
        <PopoverTrigger asChild>
          <Button className="relative flex h-[48px] w-[48px] items-center mx-3 rounded-full overflow-hidden transition duration-300 bg-transparent hover:bg-transparent">
            <UserAvatar
              src={profile.imageUrl}
              fallbackName={profile.username}
              className="h-[48px] w-[48px] md:w-[48px] md:h-[48px]"
            />
          </Button>
        </PopoverTrigger>
      </ActionTooltip>
      <PopoverContent
        side="right"
        align="end"
        className="bg-background-shade w-[18.75rem] p-0"
      >
        <ControlContent profile={profile} />
      </PopoverContent>
    </Popover>
  );
};
export default UserControl;
