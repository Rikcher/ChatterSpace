import React from 'react';
import { currentProfile } from '@/entities/user';
import { redirect } from 'next/navigation';
import { db } from '@/shared/lib/utils';
import ChannelHeader from './ChannelHeader';
import ChannelChat from './ChannelChat';
import { ChannelMessageInput } from '@/features/send-channel-message';

interface ChannelPageProps {
  params: Promise<{ serverId: string; channelId: string }>;
}

const ChannelPage: React.FC<ChannelPageProps> = async ({ params }) => {
  const { serverId, channelId } = await params;
  const profile = await currentProfile();
  if (!profile) {
    return redirect('/login');
  }

  const channel = await db.channel.findUnique({
    where: {
      id: channelId,
    },
  });

  const member = await db.member.findFirst({
    where: {
      serverId: serverId,
      profileId: profile.id,
    },
  });

  if (!channel || !member) {
    return redirect('/');
  }

  return (
    <div className="bg-card-shade-2 flex flex-col h-full">
      <ChannelHeader name={channel.name} serverId={serverId} />
      <ChannelChat channelId={channel.id} />
      <ChannelMessageInput
        channelId={channel.id}
        serverId={serverId}
        channelName={channel.name}
      />
    </div>
  );
};
export default ChannelPage;
