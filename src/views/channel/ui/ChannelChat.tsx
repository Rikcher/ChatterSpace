'use client';

import React, { useEffect, useState } from 'react';
import { clientCreateClient } from '@/shared/lib/utils';

interface ChannelChatProps {
  channelId: string;
}

const ChannelChat: React.FC<ChannelChatProps> = ({ channelId }) => {
  const supabase = clientCreateClient();
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('Message')
        .select('content')
        .eq('channelId', channelId)
        .order('createdAt', { ascending: true }); // Ensure messages are in chronological order

      if (error) {
        console.error('Error fetching messages:', error);
      } else {
        const initialMessages = data.map((message) => message.content);
        setMessages(initialMessages);
      }
    };

    fetchMessages();

    const channel = supabase
      .channel('messages', {
        config: { broadcast: { self: true } },
      })
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'Message',
          filter: `channelId=eq.${channelId}`,
        },
        (payload) =>
          setMessages((prevMessages) => [...prevMessages, payload.new.content])
      );

    channel.subscribe();

    // Clean up the subscription on unmount
    return () => {
      channel.unsubscribe();
    };
  }, [channelId]);

  return (
    <div className="flex-1">
      <h1>Room: {channelId}</h1>
      <ul>
        {messages.map((msg, idx) => (
          <li key={idx}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default ChannelChat;
