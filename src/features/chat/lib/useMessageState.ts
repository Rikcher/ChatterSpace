import { MessageWithProfile } from '@types';
import { useEffect, useState } from 'react';
import { MemberRole } from '@prisma/client';

export const useMessageState = (
  message: MessageWithProfile,
  role?: string,
  memberId?: string,
  profileId?: string
) => {
  const [isEditing, setEditing] = useState(false);
  const [isEdited, setIsEdited] = useState(
    message.updatedAt > message.createdAt
  );
  const [isDeleted, setIsDeleted] = useState(message.deleted);
  const [attachments, setAttachments] = useState(message.fileUrls);

  useEffect(() => {
    if (!isEdited) setIsEdited(message.updatedAt > message.createdAt);
  }, [message.updatedAt]);
  useEffect(() => {
    setIsDeleted(message.deleted);
  }, [message.deleted]);
  useEffect(() => {
    setAttachments(message.fileUrls);
  }, [message.fileUrls]);

  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = role === MemberRole.MODERATOR;
  const isOwner =
    ('memberId' in message && message.memberId === memberId) ||
    ('profileId' in message && message.profileId === profileId);
  const canDeleteMessage = !isDeleted && (isAdmin || isModerator || isOwner);
  const canEditMessage = !isDeleted && isOwner;

  return {
    isEditing,
    setEditing,
    isEdited,
    setIsEdited,
    isDeleted,
    setIsDeleted,
    attachments,
    setAttachments,
    isAdmin,
    isModerator,
    isOwner,
    canDeleteMessage,
    canEditMessage,
  };
};
