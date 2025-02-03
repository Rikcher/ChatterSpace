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
import { ServerWithMembersWithProfiles } from '@types';
import { UserAvatar } from '@/entities/user';
import { ShieldAlert, ShieldCheck } from 'lucide-react';
import ManageMemberAction from '@/features/manage-members/ui/ManageMemberAction';

const roleIconMap = {
  GUEST: null,
  MODERATOR: <ShieldCheck className="h-4 w-4 ml-2 text-indigo-400" />,
  ADMIN: <ShieldAlert className="h4- w-4 ml-2 text-rose-500" />,
};

const ManageMembersModal: React.FC = ({}) => {
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === 'members';
  const { server } = data as { server: ServerWithMembersWithProfiles };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-background dark:bg-card">
        <DialogHeader className="mb-5">
          <DialogTitle>Manage Members</DialogTitle>
          <DialogDescription>
            {server?.members?.length} Members
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[420px] pr-6" noScrollbar>
          {server?.members?.map((member) => (
            <div key={member.id} className="flex items-center gap-2 mb-6">
              <UserAvatar
                src={member.profile.imageUrl}
                fallbackName={member.profile.username}
              />
              <div className="flex flex-col gap-1">
                <div className="text-xs font-semibold flex items-center">
                  {member.profile.username}
                  {roleIconMap[member.role]}
                </div>
                <p className="text-xs text-foreground/60">
                  {member.profile.email}
                </p>
              </div>
              <ManageMemberAction member={member} server={server} />
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ManageMembersModal;
