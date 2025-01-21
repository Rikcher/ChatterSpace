import React from 'react';
import { ActionTooltip } from '@/shared/ui/action-tooltip';
import { Edit, Trash } from 'lucide-react';

export const MessageActions: React.FC<{
  canEditMessage: boolean;
  canDeleteMessage: boolean;
  onEdit: () => void;
  onDelete: () => void;
}> = ({ canEditMessage, canDeleteMessage, onEdit, onDelete }) => {
  return (
    canDeleteMessage && (
      <div className="hidden group-hover:flex items-center gap-2 absolute p-1 top-2 right-5 bg-background/80 border rounded-sm">
        {canEditMessage && (
          <ActionTooltip side="top" label="Edit">
            <Edit onClick={onEdit} className="cursor-pointer ml-auto w-4 h-4" />
          </ActionTooltip>
        )}
        <ActionTooltip side="top" label="Delete">
          <Trash
            onClick={onDelete}
            className="cursor-pointer ml-auto w-4 h-4 text-destructive"
          />
        </ActionTooltip>
      </div>
    )
  );
};
