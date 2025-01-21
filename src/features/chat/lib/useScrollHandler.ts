import React, { useEffect, useState } from 'react';
import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
} from '@tanstack/query-core';

interface ScrollHandlerProps {
  scrollAreaRef: React.RefObject<HTMLDivElement | null>;
  messages: any[];
  fetchNextPage: (
    options?: FetchNextPageOptions
  ) => Promise<InfiniteQueryObserverResult<any, Error>>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isFetching: boolean;
  isLoading: boolean;
}

export const useScrollHandler = ({
  scrollAreaRef,
  messages,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isFetching,
  isLoading,
}: ScrollHandlerProps) => {
  const [isUserAtBottom, setIsUserAtBottom] = useState(true);

  const handleScroll = () => {
    const scrollArea = scrollAreaRef.current;
    if (scrollArea) {
      const isAtTop = scrollArea.scrollTop === 0;
      const isAtBottom =
        scrollArea.scrollHeight - scrollArea.scrollTop ===
        scrollArea.clientHeight;
      setIsUserAtBottom(isAtBottom);

      if (isAtTop && hasNextPage && !isFetchingNextPage) {
        const previousScrollHeight = scrollArea.scrollHeight;

        fetchNextPage().finally(() => {
          if (scrollArea) {
            const newScrollHeight = scrollArea.scrollHeight;
            scrollArea.scrollTop = newScrollHeight - previousScrollHeight;
          }
        });
      }
    }
  };

  useEffect(() => {
    const scrollArea = scrollAreaRef.current;
    if (scrollArea) {
      scrollArea.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollArea) {
        scrollArea.removeEventListener('scroll', handleScroll);
      }
    };
  }, [hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    if (!isFetching && isLoading && messages.length > 0) {
      const scrollArea = scrollAreaRef.current;
      if (scrollArea) {
        scrollArea.scrollTop = scrollArea.scrollHeight;
      }
    }
  }, [messages, isFetching && isLoading]);

  useEffect(() => {
    if (isUserAtBottom) {
      const scrollArea = scrollAreaRef.current;
      if (scrollArea) {
        scrollArea.scrollTop = scrollArea.scrollHeight;
      }
    }
  }, [messages, isUserAtBottom]);
};
