import React from 'react';
import { format } from 'date-fns';
import { MessageWithProfile } from '@types';

import { useModal } from '@/shared/lib/hooks';

import { ActionTooltip } from '@/shared/ui/action-tooltip';
import { UserAvatar } from '@/entities/user';
import { roleIconMap } from '@/entities/member';
import { MessageContent } from './MessageContent';
import { MessageAttachments } from './MessageAttachments';
import { MessageActions } from './MessageActions';
import { useMessageState } from '../lib/useMessageState';
import MessageEditForm from './MessageEditForm';

const DATE_FORMAT = 'd MMM yyy, HH:mm';

interface ChatItemProps {
  message: MessageWithProfile;
  memberId?: string;
  role?: string;
  serverId?: string;
  profileId?: string;
  otherProfileId?: string;
}

const MessageItem: React.FC<ChatItemProps> = ({
  message,
  memberId,
  role,
  serverId,
  profileId,
  otherProfileId,
}) => {
  const { onOpen } = useModal();
  const {
    isEditing,
    setEditing,
    isEdited,
    setIsEdited,
    isDeleted,
    attachments,
    isOwner,
    canDeleteMessage,
    canEditMessage,
  } = useMessageState(message, role, memberId, profileId);

  return (
    <div className="relative group flex items-center hover:bg-background/5 p-4 transition-colors w-full">
      <div className="group flex gap-2 items-start w-full">
        <div className="cursor-pointer hover:drop-shadiw-md transition-colors">
          <UserAvatar
            src={message.profile.imageUrl}
            fallbackName={message.profile.username}
          />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <p className="font-semibold text-sm hover:underline cursor-pointer">
                {message.profile.username}
              </p>
              {role && message.role && (
                <ActionTooltip side="top" label={message.role}>
                  {roleIconMap[message.role] ?? null}
                </ActionTooltip>
              )}
            </div>
            <span className="text-xs text-foreground/50">
              {format(new Date(message.createdAt), DATE_FORMAT)}
            </span>
          </div>
          <MessageContent
            message={message}
            isEditing={isEditing}
            isDeleted={isDeleted}
            isEdited={isEdited}
          />
          <MessageEditForm
            message={message}
            isEditing={isEditing}
            setEditing={setEditing}
            isDeleted={isDeleted}
            setIsEdited={setIsEdited}
            serverId={serverId}
            otherProfileId={otherProfileId}
          />
          <MessageAttachments
            attachments={attachments}
            isOwner={isOwner}
            message={message}
            serverId={serverId}
            isDeleted={isDeleted}
            setIsEdited={setIsEdited}
            otherProfileId={otherProfileId}
          />
        </div>
      </div>
      <MessageActions
        canEditMessage={canEditMessage}
        canDeleteMessage={canDeleteMessage}
        onEdit={() => setEditing(true)}
        onDelete={() => {
          if ('channelId' in message) {
            // Logic for Message
            onOpen('deleteMessage', {
              serverId: serverId,
              channelId: message.channelId,
              messageId: message.id,
            });
          } else {
            // Logic for DirectMessage
            onOpen('deleteMessage', {
              messageId: message.id,
              profileId: otherProfileId,
            });
          }
        }}
      />
    </div>
  );
};

export default MessageItem;
