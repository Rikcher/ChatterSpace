import React from 'react';
import { Hash } from 'lucide-react';
import { MobileToggle } from '@/widgets/mobile-toggle';

interface ChannelHeaderProps {
  name: string;
  serverId: string;
}

const ChannelHeader: React.FC<ChannelHeaderProps> = ({ name, serverId }) => {
  return (
    <div className="text-md font-semibold px-3 flex gap-2 items-center h-12 border-solid border-b-2 border-background/30">
      <MobileToggle serverId={serverId} />
      <Hash className="h-5 w-5 text-foreground/40" />
      <p className="font-semibold text-md text-foreground">{name}</p>
    </div>
  );
};

export default ChannelHeader;
