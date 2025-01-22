import React from 'react';
import { Channel, ChannelType, MemberRole, Server } from '@prisma/client';
import { Edit, Hash, Lock, Mic, Trash, Video } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/shared/shadcn-ui';
import { cn } from '@/shared/lib/utils';
import { ActionTooltip } from '@/shared/ui/action-tooltip';
import { useModal } from '@/shared/lib/hooks';
import { ModalType } from '@/shared/lib/hooks/useModalStore';

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
  const { onOpen } = useModal();
  const params = useParams();
  const router = useRouter();
  const icon = iconMap[channel.type];

  const onCLick = () => {
    router.push(`/servers/${params.serverId}/channels/${channel.id}`);
  };

  const onAction = (e: React.MouseEvent, action: ModalType) => {
    e.stopPropagation();
    onOpen(action, { channel, server });
  };

  return (
    <Button
      onClick={onCLick}
      className={cn(
        'group px-2 py-2 rounded-md flex items-center gap-2 w-full bg-transparent text-foreground/30 justify-start [&_svg]:pointer-events-auto',
        params?.channelId === channel.id
          ? 'bg-foreground/20 text-foreground hover:bg-foreground/20'
          : 'hover:bg-foreground/5'
      )}
    >
      {icon}
      <p
        className={cn(
          'line-clamp-1 font-semibold text-xs text-foreground/30 transition-colors',
          params?.channelId === channel.id
            ? 'text-foreground'
            : 'group-hover:text-foreground/80'
        )}
      >
        {channel.name}
      </p>
      {channel.name !== 'general' && role !== MemberRole.GUEST && (
        <div className="ml-auto flex items-center gap-2">
          <ActionTooltip label="Edit">
            <Edit
              onClick={(e) => onAction(e, 'editChannel')}
              className="hidden group-hover:block w-4 h-4 text-foreground/60 hover:text-foreground transition-colors"
            />
          </ActionTooltip>
          <ActionTooltip label="Delete">
            <Trash
              onClick={(e) => onAction(e, 'deleteChannel')}
              className="hidden group-hover:block w-4 h-4 text-foreground/60 hover:text-destructive transition-colors"
            />
          </ActionTooltip>
        </div>
      )}
      {channel.name == 'general' && <Lock className="w-4 h-4 ml-auto" />}
    </Button>
  );
};

export default ServerChannel;
