'use client';

import { CreateServerModal } from '@/features/create-server';
import { EditServerModal } from '@/features/edit-server';
import { InviteModal } from '@/features/invite';
import { useEffect, useState } from 'react';
import { ManageMembersModal } from '@/features/manage-members';
import { CreateChannelModal } from '@/features/create-channel';

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateServerModal />
      <EditServerModal />
      <InviteModal />
      <ManageMembersModal />
      <CreateChannelModal />
    </>
  );
};
