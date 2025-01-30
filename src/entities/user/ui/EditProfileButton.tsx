'use client';

import React from 'react';
import { Pencil } from 'lucide-react';
import { Button } from '@/shared/shadcn-ui';
import { useModal } from '@/shared/lib/hooks';
import { Profile } from '@prisma/client';

interface EditProfileButtonProps {
  profile: Profile;
}

const EditProfileButton: React.FC<EditProfileButtonProps> = ({ profile }) => {
  const { onOpen } = useModal();

  return (
    <Button
      onClick={() => onOpen('editProfile', { profile: profile })}
      className="justify-start bg-foreground/10 dark:bg-foreground/20 text-foreground dark:text-foreground/90 hover:bg-foreground/20 dark:hover:bg-foreground/30"
    >
      <Pencil className="w-4 h-4" />
      Edit Profile
    </Button>
  );
};
export default EditProfileButton;
