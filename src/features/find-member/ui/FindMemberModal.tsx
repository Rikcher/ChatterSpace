'use client';

import React, { useMemo, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  ScrollArea,
} from '@/shared/shadcn-ui';
import { useModal } from '@/shared/lib/hooks';
import MemberSearchbar from './MemberSearchbar';
import { MemberControl, useMembersStore } from '@/entities/member';
import { useRouter } from 'next/navigation';
import { MessageCircle } from 'lucide-react';

const FindMemberModal: React.FC = ({}) => {
  const router = useRouter();
  const { isOpen, onClose, type, data } = useModal();
  const { members } = useMembersStore();
  const [searchTerm, setSearchTerm] = useState('');

  const { profileId } = data;

  const isModalOpen = isOpen && type === 'findMember';

  const filteredMembers = useMemo(() => {
    return members.filter(
      (member) =>
        member.profile.username
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        member.profile.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, members]);

  const onClick = (id: string) => {
    onClose();
    router.push(`/conversations/${id}`);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-background dark:bg-card">
        <DialogHeader>
          <DialogTitle>Find Member</DialogTitle>
          <DialogDescription>
            {filteredMembers.length} Members Found
          </DialogDescription>
        </DialogHeader>
        <MemberSearchbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <ScrollArea className="h-[10rem]">
          <div className="mt-2 space-y-4">
            {filteredMembers.map((member) => (
              <div
                key={`${member.id}-search`}
                className="flex items-center justify-between"
              >
                <MemberControl member={member} className="mb-0" />
                {profileId !== member.profileId && (
                  <MessageCircle
                    onClick={() => onClick(member.profile.id)}
                    className="text-foreground/60 hover:text-foreground cursor-pointer"
                  />
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default FindMemberModal;
