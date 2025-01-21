import { MessageWithProfile } from '@types';
import React from 'react';
import { cn } from '@/shared/lib/utils';

export const MessageContent: React.FC<{
  message: MessageWithProfile;
  isEditing: boolean;
  isDeleted: boolean;
  isEdited: boolean;
}> = ({ message, isEditing, isDeleted, isEdited }) => {
  if (isEditing) return null;

  return (
    <p
      style={{
        whiteSpace: 'pre-line',
        wordBreak: 'break-word',
        overflowWrap: 'break-word',
      }}
      className={cn(
        'text-sm',
        message.pending && 'text-foreground/50',
        isDeleted && 'italic text-foreground/50 text-xs mt-1'
      )}
    >
      {isDeleted ? (
        'This message was deleted'
      ) : (
        <>
          {message.content}
          {isEdited && !isDeleted && (
            <span className="text-[10px] mx-2 text-foreground/50">
              (edited)
            </span>
          )}
        </>
      )}
    </p>
  );
};
