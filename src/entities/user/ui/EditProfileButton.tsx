import React from 'react';
import { Pencil } from 'lucide-react';
import { Button } from '@/shared/shadcn-ui';

const EditProfileButton = () => {
  return (
    <Button className="justify-start bg-foreground/20 text-foreground/90 hover:bg-foreground/30">
      <Pencil className="w-4 h-4" />
      Edit Profile
    </Button>
  );
};
export default EditProfileButton;
