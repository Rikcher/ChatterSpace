import React from 'react';
import { MobileToggle } from '@/widgets/mobile-toggle';
import { UserAvatar } from '@/entities/user';

interface ConversationHeaderProps {
  name: string;
  imageUrl: string;
}

const ConversationHeader: React.FC<ConversationHeaderProps> = ({
  name,
  imageUrl,
}) => {
  return (
    <div className="text-md font-semibold px-3 flex gap-2 items-center h-16 border-solid border-b-2 border-background/30">
      <MobileToggle />
      <UserAvatar src={imageUrl} fallbackName={name} />
      <p className="font-semibold text-md text-foreground">{name}</p>
    </div>
  );
};

export default ConversationHeader;
