import React from 'react';
import Image from 'next/image';
import { ActionTooltip } from '@/shared/ui/action-tooltip';
import { Trash } from 'lucide-react';

interface ImagePreviewProps {
  item: { url: string; name: string };
  index: number;
  onRemove: (index: number) => void;
}

const AttachmentPreview: React.FC<ImagePreviewProps> = ({
  item,
  index,
  onRemove,
}) => {
  return (
    <div className="p-2 bg-foreground/5 dark:bg-background/50 max-w-[13rem] relative">
      <div className="relative h-[12rem] w-[12rem]">
        <Image
          src={item.url}
          alt={`Preview ${item.name}`}
          fill
          className="rounded-md object-contain"
        />
      </div>
      <p className="truncate">{item.name}</p>
      <ActionTooltip side="top" label="Remove attachment">
        <div
          className="absolute -top-2 -right-3 p-2 bg-border/60 dark:bg-background-shade rounded-md hover:bg-border/40 dark:hover:bg-card cursor-pointer"
          onClick={() => onRemove(index)}
        >
          <Trash className="w-5 h-5 text-destructive" />
        </div>
      </ActionTooltip>
    </div>
  );
};

export default AttachmentPreview;
