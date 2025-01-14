'use client';

import React from 'react';
import { Channel, ChannelType, MemberRole, Server } from '@prisma/client';
import { Edit, Hash, Lock, Mic, Trash, Video } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/shared/shadcn-ui';
import { cn } from '@/shared/lib/utils';
import { ActionTooltip } from '@/shared/ui/action-tooltip';

interface ServerChannelProps {
  channel: Channel;
  server: Server;
  role: MemberRole;
}

const iconMap = {
  [ChannelType.TEXT]: <Hash className="h-5 w-5" />,
  [ChannelType.AUDIO]: <Mic className="h-5 w-5" />,
  [ChannelType.VIDEO]: <Video className="h-5 w-5" />,
};

const ServerChannel: React.FC<ServerChannelProps> = ({
  channel,
  server,
  role,
}) => {
  const params = useParams();
  const router = useRouter();

  const icon = iconMap[channel.type];

  return (
    <Button
      onClick={() => {}}
      className={cn(
        'group px-2 py-2 rounded-md flex items-center gap-2 w-full bg-transparent text-foreground/60 justify-start hover:bg-foreground/5 [&_svg]:pointer-events-auto',
        params?.channelId === channel.id && 'bg-primary'
      )}
    >
      {icon}
      <p
        className={cn(
          'line-clamp-1 font-semibold text-xs text-foreground/60 group-hover:text-foreground transition-colors',
          params?.channelId === channel.id && 'text-primary'
        )}
      >
        {channel.name}
      </p>
      {channel.name !== 'general' && role !== MemberRole.GUEST && (
        <div className="ml-auto flex items-center gap-2">
          <ActionTooltip label="Edit">
            <Edit className="hidden group-hover:block w-4 h-4 text-foreground/60 hover:text-foreground transition-colors" />
          </ActionTooltip>
          <ActionTooltip label="Delete">
            <Trash className="hidden group-hover:block w-4 h-4 text-foreground/60 hover:text-destructive transition-colors" />
          </ActionTooltip>
        </div>
      )}
      {channel.name == 'general' && <Lock className="w-4 h-4 ml-auto" />}
    </Button>
  );
};

export default ServerChannel;
