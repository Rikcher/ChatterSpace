import React from 'react';

const SelectConversationPage = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <p>
        Choose a conversation or{' '}
        <span className="hover:underline text-primary cursor-pointer">
          Start a new one
        </span>
      </p>
    </div>
  );
};
export default SelectConversationPage;
