'use client';

import React from 'react';

import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import { useTheme } from 'next-themes';

import { Popover, PopoverTrigger, PopoverContent } from '@/shared/shadcn-ui';
import { Smile } from 'lucide-react';

interface EmojiPickerProps {
  onChange: (value: string) => void;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({ onChange }) => {
  const { resolvedTheme } = useTheme();

  return (
    <Popover>
      <PopoverTrigger>
        <Smile className="text-foreground/30 hover:text-foreground/50 dark:text-foreground/50 dark:hover:text-foreground/80 transition-colors" />
      </PopoverTrigger>
      <PopoverContent
        side="top"
        className="bg-transparent border-none shadow-none drop-shadow-none -translate-x-2/3"
      >
        <Picker
          theme={resolvedTheme}
          data={data}
          onEmojiSelect={(emoji: any) => onChange(emoji.native)}
        />
      </PopoverContent>
    </Popover>
  );
};

export default EmojiPicker;
