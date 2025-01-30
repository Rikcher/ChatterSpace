'use client';

import React, { useEffect, useRef } from 'react';
import { useMessages } from '../queries/useMessages';
import ChatWelcome from '@/features/chat/ui/ChatWelcome';
import MessageItem from './MessageItem';
import NextPageSkeleton from './NextPageSkeleton';
import { useMessagesStore } from '../store/MessagesStore';
import { useScrollHandler } from '../lib/useScrollHandler';
import { useMessageSubscription } from '../lib/useMessageSubscription';
import { useDirectMessageSubscription } from '../lib/useDirectMessageSubscription';

interface ChannelChatProps {
  channelId?: string;
  memberId?: string;
  serverId?: string;
  profileId: string;
  name: string;
  role?: string;
  conversationId?: string;
  otherProfileId?: string;
}

const ChatDisplay: React.FC<ChannelChatProps> = ({
  channelId,
  serverId,
  name,
  profileId,
  memberId,
  role,
  conversationId,
  otherProfileId,
}) => {
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const { messages, addNextPage } = useMessagesStore();

  const {
    data,
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMessages({ channelId, serverId, otherProfileId, conversationId });

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

  if (channelId && memberId) {
    useMessageSubscription({ channelId, memberId, profileId });
  } else if (conversationId) {
    useDirectMessageSubscription({ profileId, conversationId });
  }

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
      className="flex-1 flex flex-col py-4 overflow-y-auto ml-4 mr-2 mb-2 scrollbar-custom-light dark:scrollbar-custom"
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
            profileId={profileId}
            otherProfileId={otherProfileId}
          />
        ))}
        {data?.pages && !hasNextPage && !isFetchingNextPage && (
          <ChatWelcome name={name} chanelId={channelId} />
        )}
        {isFetchingNextPage && <NextPageSkeleton />}
      </div>
    </div>
  );
};

export default ChatDisplay;
