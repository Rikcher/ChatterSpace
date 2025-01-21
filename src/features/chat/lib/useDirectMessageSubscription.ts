import { useEffect } from 'react';
import { clientCreateClient } from '@/shared/lib/utils';
import { useMessagesStore } from '../store/MessagesStore';
import { DirectMessage } from '@prisma/client';

interface MessageSubscriptionProps {
  profileId: string;
  conversationId: string;
}

export const useDirectMessageSubscription = ({
  profileId,
  conversationId,
}: MessageSubscriptionProps) => {
  const supabase = clientCreateClient();
  const { addMessage, updateMessage } = useMessagesStore();

  useEffect(() => {
    const channel = supabase.channel(`${conversationId}-directMessages`).on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'DirectMessage',
        filter: `conversationId=eq.${conversationId}`,
      },
      async (payload) => {
        const newMessage = payload.new as DirectMessage;

        if (newMessage?.profileId === profileId && !newMessage.deleted) return;

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
          const { data: profileData, error: profileError } = await supabase
            .from('Profile')
            .select('username, imageUrl')
            .eq('id', newMessage.profileId)
            .single();

          if (profileError) return;

          addMessage({
            ...newMessage,
            profile: {
              username: profileData?.username || 'Unknown',
              imageUrl: profileData?.imageUrl || '',
            },
          });
        }
      }
    );

    channel.subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [conversationId]);
};
