import {
  useQuery,
  keepPreviousData,
  useInfiniteQuery,
} from '@tanstack/react-query';
// import { getMessages } from '../api/getMessages';
import qs from 'query-string';
import axios from 'axios'; // assuming getMessages is located in the api.js or api.ts file

type UseMessagesParams = {
  channelId: string;
  serverId: string;
};

export const useMessages = ({ channelId, serverId }: UseMessagesParams) => {
  const getMessages = async ({ pageParam = undefined }) => {
    const url = qs.stringifyUrl(
      {
        url: `/api/channels/${channelId}/messages`,
        query: { cursor: pageParam, limit: 50, serverId: serverId }, // Pass pageParam (cursor) to the API
      },
      { skipNull: true }
    );
    const response = await axios.get(url);
    return response.data; // Ensure the API response contains { data, nextCursor }
  };

  const {
    data,
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['messages', channelId], // Use channelId in the queryKey
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
