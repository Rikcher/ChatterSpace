import React from 'react';
import { MobileToggle } from '@/widgets/mobile-toggle';
import SelectConversationPageContent from './SelectConversationPageContent';

const SelectConversationPage = () => {
  return (
    <div className="relative flex items-center justify-center w-full h-full">
      <div className="absolute top-3 left-3">
        <MobileToggle />
      </div>
      <SelectConversationPageContent />
    </div>
  );
};
export default SelectConversationPage;
