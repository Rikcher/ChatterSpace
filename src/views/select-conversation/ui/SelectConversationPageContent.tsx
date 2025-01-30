'use client';

import React from 'react';
import { useModal } from '@/shared/lib/hooks';

const SelectConversationPageContent = () => {
  const { onOpen } = useModal();
  return (
    <p>
      Choose a conversation or{' '}
      <span
        className="hover:underline text-primary cursor-pointer"
        onClick={() => {
          onOpen('createDm');
        }}
      >
        Start a new one
      </span>
    </p>
  );
};
export default SelectConversationPageContent;
