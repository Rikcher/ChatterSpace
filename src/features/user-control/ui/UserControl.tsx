import React from 'react';

import { currentProfile } from '@/shared/lib/utils';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { ActionTooltip } from '@/shared/ui/action-tooltip';
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/shared/shadcn-ui';
import { LogoutButton } from '@/shared/ui/logout-button';

const UserControl = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect('/');
  }

  const imageUrl =
    profile.imageUrl !== '' ? profile.imageUrl : '/noProfileImage.svg';

  return (
    <Popover>
      <ActionTooltip label={profile.username} side="right" align="center">
        <PopoverTrigger asChild>
          <Button className="relative flex h-[48px] w-[48px] items-center mx-3 rounded-full overflow-hidden transition duration-300 bg-transparent hover:bg-transparent">
            <Image fill src={imageUrl} alt="Profile image" />
          </Button>
        </PopoverTrigger>
      </ActionTooltip>
      <PopoverContent side="right" className="bg-background-shade">
        <LogoutButton />
      </PopoverContent>
    </Popover>
  );
};
export default UserControl;
