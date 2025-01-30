import { MessageWithProfile } from '@types';
import React from 'react';
import { Loader2, Trash } from 'lucide-react';
import { ActionTooltip } from '@/shared/ui/action-tooltip';
import Image from 'next/image';
import { useModal } from '@/shared/lib/hooks';

export const MessageAttachments: React.FC<{
  attachments: string[];
  isOwner: boolean;
  message: MessageWithProfile;
  serverId?: string;
  isDeleted: boolean;
  setIsEdited: (isEdited: boolean) => void;
  otherProfileId?: string;
}> = ({
  attachments,
  isOwner,
  message,
  serverId,
  isDeleted,
  setIsEdited,
  otherProfileId,
}) => {
  const { onOpen } = useModal();

  if (isDeleted) return null;

  return (
    <div className="flex gap-2 items-center">
      {attachments.map((fileUrl) => (
        <div key={fileUrl} className="relative group/image">
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative aspect-square rounded-md mt-2 overflow-hidden border flex items-center justify-center bg-card-shade w-48 h-48 max-w-48 max-h-48"
          >
            <Image
              src={fileUrl}
              alt="Attachment image"
              width={192}
              height={192}
              className="object-contain w-full h-full"
            />
            {message.pending && (
              <div className="absolute w-full h-full top-0 left-0 bg-black/30 dark:bg-black/70 flex justify-center items-center">
                <Loader2 className="animate-spin text-white" />
              </div>
            )}
          </a>
          {!message.pending && isOwner && (
            <ActionTooltip side="top" label="Delete image">
              <div
                onClick={() => {
                  if ('channelId' in message) {
                    onOpen('deleteMessage', {
                      serverId: serverId,
                      channelId: message.channelId,
                      messageId: message.id,
                      fileUrl: fileUrl,
                    });
                  } else {
                    onOpen('deleteMessage', {
                      messageId: message.id,
                      profileId: otherProfileId,
                      fileUrl: fileUrl,
                    });
                  }
                  setIsEdited(true);
                }}
                className="hidden group-hover/image:flex absolute top-3 right-1 w-8 h-8 items-center justify-center p-2 bg-border dark:bg-card text-white hover:bg-destructive border rounded-sm cursor-pointer"
              >
                <Trash className="ml-auto w-4 h-4" />
              </div>
            </ActionTooltip>
          )}
        </div>
      ))}
    </div>
  );
};
