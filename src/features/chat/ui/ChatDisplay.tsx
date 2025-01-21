'use client';

import React, { useEffect, useRef } from 'react';
import { useMessages } from '../queries/useMessages';
import ChatWelcome from '@/features/chat/ui/ChatWelcome';
import MessageItem from './MessageItem';
import NextPageSkeleton from './NextPageSkeleton';
import { useMessagesStore } from '../store/MessagesStore';
import { useScrollHandler } from '../lib/useScrollHandler';
import { useMessageSubscription } from '../lib/useMessageSubscription';

interface ChannelChatProps {
  channelId: string;
  memberId: string;
  serverId: string;
  profileId: string;
  name: string;
  role: string;
}

const ChatDisplay: React.FC<ChannelChatProps> = ({
  channelId,
  serverId,
  name,
  profileId,
  memberId,
  role,
}) => {
  const scrollAreaRef = useRef<HTMLDivElement | null>(null); // Update ref type to match Viewport
  const { messages, addNextPage } = useMessagesStore();

  const {
    data,
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMessages({ channelId, serverId });

  useEffect(() => {
    if (data?.pages) {
      const newMessages = data.pages.flatMap((page) => page.data);
      addNextPage(newMessages);
    }
  }, [data]);

  useScrollHandler({
    scrollAreaRef,
    messages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    isLoading,
  });

  useMessageSubscription({ channelId, memberId, profileId });

  if (isFetching && isLoading) {
    return (
      <div className="flex-1 flex flex-col py-4 overflow-hidden justify-end ml-4 mr-2 mb-2">
        {Array.from({ length: 3 }).map((_, idx) => (
          <NextPageSkeleton key={idx} />
        ))}
      </div>
    );
  }

  return (
    <div
      className="flex-1 flex flex-col py-4 overflow-y-auto ml-4 mr-2 mb-2 scrollbar-custom"
      ref={scrollAreaRef}
    >
      <div className="flex flex-col-reverse mt-auto justify-end">
        {messages.map((message) => (
          <MessageItem
            key={message.id}
            message={message}
            memberId={memberId}
            role={role}
            serverId={serverId}
          />
        ))}
        {data?.pages && !hasNextPage && !isFetchingNextPage && (
          <ChatWelcome name={name} type="channel" />
        )}
        {isFetchingNextPage && <NextPageSkeleton />}
      </div>
    </div>
  );
};

export default ChatDisplay;
