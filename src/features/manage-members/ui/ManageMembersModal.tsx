'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  ScrollArea,
} from '@/shared/shadcn-ui';
import { useModal } from '@/shared/lib/hooks';
import { MemberControl, useMembersStore } from '@/entities/member';
import { ServerWithMembersWithProfiles } from '@types';

const ManageMembersModal: React.FC = ({}) => {
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === 'members';
  const { server } = data as {
    server: ServerWithMembersWithProfiles;
  };

  const { members } = useMembersStore();

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-background dark:bg-card">
        <DialogHeader className="mb-5">
          <DialogTitle>Manage Members</DialogTitle>
          <DialogDescription>{members.length} Members</DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[420px] pr-6" noScrollbar>
          {members.map((member) => (
            <MemberControl
              key={`${member.id}-manageModal`}
              member={member}
              server={server!}
            />
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ManageMembersModal;
