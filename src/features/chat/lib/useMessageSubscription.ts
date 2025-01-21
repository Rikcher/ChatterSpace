import { useEffect } from 'react';
import { clientCreateClient } from '@/shared/lib/utils';
import { useMessagesStore } from '../store/MessagesStore';
import { Message } from '@prisma/client';

interface MessageSubscriptionProps {
  channelId: string;
  memberId: string;
  profileId: string;
}

export const useMessageSubscription = ({
  channelId,
  memberId,
  profileId,
}: MessageSubscriptionProps) => {
  const supabase = clientCreateClient();
  const { addMessage, updateMessage } = useMessagesStore();

  useEffect(() => {
    const channel = supabase.channel(`${channelId}-messages`).on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'Message',
        filter: `channelId=eq.${channelId}`,
      },
      async (payload) => {
        const newMessage = payload.new as Message;

        if (newMessage?.memberId === memberId && !newMessage.deleted) return;

        if (payload.eventType === 'UPDATE') {
          updateMessage(
            newMessage.content,
            newMessage.id,
            newMessage.updatedAt,
            newMessage.deleted,
            newMessage.fileUrls
          );
        }

        if (payload.eventType === 'INSERT') {
          const { data: memberData, error: memberError } = await supabase
            .from('Member')
            .select('profileId, role')
            .eq('id', newMessage.memberId)
            .single();

          if (memberError) return;

          const memberProfileId = memberData?.profileId;

          if (memberProfileId === profileId) return;

          const { data: profileData, error: profileError } = await supabase
            .from('Profile')
            .select('username, imageUrl')
            .eq('id', memberProfileId)
            .single();

          if (profileError) return;

          addMessage({
            ...newMessage,
            profile: {
              username: profileData?.username || 'Unknown',
              imageUrl: profileData?.imageUrl || '',
            },
            role: memberData?.role,
          });
        }
      }
    );

    channel.subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [channelId]);
};
