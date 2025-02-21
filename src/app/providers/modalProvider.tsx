'use client';

import { CreateServerModal } from '@/features/create-server';
import { EditServerModal } from '@/features/edit-server';
import { InviteModal } from '@/features/invite';
import { useEffect, useState } from 'react';
import { ManageMembersModal } from '@/features/manage-members';
import { CreateChannelModal } from '@/features/create-channel';
import { LeaveServerModal } from '@/features/leave-server';
import { DeleteServerModal } from '@/features/delete-server';
import { DeleteChannelModal } from '@/features/delete-channel';
import { EditChannelModal } from '@/features/edit-channel';
import { DeleteMessageModal } from '@/features/delete-message';
import { DeleteConversationModal } from '@/features/delete-conversation';
import { CreateDmModal } from '@/features/create-dm';
import { EditProfileModal } from '@/features/edit-profile';
import { FindMemberModal } from '@/features/find-member';

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
      <LeaveServerModal />
      <DeleteServerModal />
      <DeleteChannelModal />
      <EditChannelModal />
      <DeleteMessageModal />
      <DeleteConversationModal />
      <CreateDmModal />
      <EditProfileModal />
      <FindMemberModal />
    </>
  );
};
