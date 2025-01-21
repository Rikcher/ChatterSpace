import {
  useQuery,
  keepPreviousData,
  useInfiniteQuery,
} from '@tanstack/react-query';
// import { getMessages } from '../api/getMessages';
import qs from 'query-string';
import axios from 'axios'; // assuming getMessages is located in the api.js or api.ts file

type UseMessagesParams = {
  channelId?: string;
  serverId?: string;
  otherProfileId?: string;
  conversationId?: string;
};

export const useMessages = ({
  channelId,
  serverId,
  otherProfileId,
  conversationId,
}: UseMessagesParams) => {
  const getMessages = async ({ pageParam = undefined }) => {
    let url;

    if (channelId && serverId) {
      url = qs.stringifyUrl(
        {
          url: `/api/channels/${channelId}/messages`,
          query: { cursor: pageParam, limit: 50, serverId: serverId },
        },
        { skipNull: true }
      );
    } else if (otherProfileId) {
      url = qs.stringifyUrl(
        {
          url: `/api/conversations/${otherProfileId}/messages`,
          query: { cursor: pageParam, limit: 50 },
        },
        { skipNull: true }
      );
    }

    if (!url) {
      console.error('Invalid url configuration!');
      return;
    }
    const response = await axios.get(url);
    return response.data; // Ensure the API response contains { data, nextCursor }
  };

  const queryKey = channelId
    ? ['messages', channelId]
    : conversationId
      ? ['directMessages', conversationId]
      : [];

  const {
    data,
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: queryKey,
    queryFn: getMessages,
    getNextPageParam: (lastPage) => lastPage?.nextCursor || undefined, // If no nextCursor, stop fetching
    initialPageParam: undefined, // Start with no cursor
  });

  return {
    data,
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};
