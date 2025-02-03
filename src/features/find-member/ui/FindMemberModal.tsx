'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/shadcn-ui';
import { useModal } from '@/shared/lib/hooks';
import { ServerWithMembersWithProfiles } from '@types';
import MemberSearchbar from './MemberSearchbar';

const FindMemberModal: React.FC = ({}) => {
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === 'findMember';
  const { server } = data as {
    server: ServerWithMembersWithProfiles;
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-background dark:bg-card">
        <DialogHeader className="mb-5">
          <DialogTitle>Find Member</DialogTitle>
          <DialogDescription>
            {server?.members?.length} Members
          </DialogDescription>
        </DialogHeader>
        <MemberSearchbar />
      </DialogContent>
    </Dialog>
  );
};

export default FindMemberModal;
