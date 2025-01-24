'use client';

import React from 'react';
import { useModal } from '@/shared/lib/hooks';

const SelectConversationPage = () => {
  const { onOpen } = useModal();
  return (
    <div className="flex items-center justify-center w-full h-full">
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
    </div>
  );
};
export default SelectConversationPage;
