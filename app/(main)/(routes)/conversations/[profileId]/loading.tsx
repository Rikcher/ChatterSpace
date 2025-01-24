import React from 'react';
import { Hash } from 'lucide-react';
import NextPageSkeleton from '@/features/chat/ui/NextPageSkeleton';

const Loading = () => {
  return (
    <div className="bg-card-shade-2 flex flex-col h-full">
      <div className="text-md font-semibold px-3 flex gap-2 items-center min-h-12 border-solid border-b-2 border-background/30">
        <Hash className="h-5 w-5 text-foreground/40" />
        <p className="h-[1rem] w-[10rem] bg-foreground/40 rounded-full"></p>
      </div>
      <div className="flex-1 flex flex-col py-4 overflow-hidden justify-end ml-4 mr-2 mb-2">
        {Array.from({ length: 3 }).map((_, idx) => (
          <NextPageSkeleton key={idx} />
        ))}
      </div>
      <div className="h-[3rem] bg-foreground/10 rounded-md mb-[1.5rem] mx-[1rem]"></div>
    </div>
  );
};

export default Loading;
