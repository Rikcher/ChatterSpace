import React from 'react';

interface NextPageSkeletonProps {}

const NextPageSkeleton: React.FC<NextPageSkeletonProps> = ({}) => {
  return (
    <div className="flex flex-col gap-5 px-2 mb-2">
      <div className="flex items-start space-x-4 p-2">
        <div className="w-7 h-7 md:w-10 md:h-10 rounded-full bg-foreground/20 animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="w-40 h-4 bg-foreground/20 animate-pulse rounded-full" />
          <div className="flex items-center gap-2">
            <div className="w-20 h-4 bg-foreground/10 rounded-full" />
            <div className="w-20 h-4 bg-foreground/10 rounded-full" />
            <div className="w-20 h-4 bg-foreground/10 rounded-full" />
            <div className="w-20 h-4 bg-foreground/10 rounded-full" />
          </div>
        </div>
      </div>
      <div className="flex items-start space-x-4 p-2">
        <div className="w-7 h-7 md:w-10 md:h-10 rounded-full bg-foreground/20 animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="w-40 h-4 bg-foreground/20 animate-pulse rounded-full" />
          <div className="flex items-center gap-2">
            <div className="w-10 h-4 bg-foreground/10 rounded-full" />
            <div className="w-20 h-4 bg-foreground/10 rounded-full" />
            <div className="w-20 h-4 bg-foreground/10 rounded-full" />
            <div className="w-20 h-4 bg-foreground/10 rounded-full" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-20 h-4 bg-foreground/10 rounded-full" />
            <div className="w-20 h-4 bg-foreground/10 rounded-full" />
            <div className="w-20 h-4 bg-foreground/10 rounded-full" />
            <div className="w-20 h-4 bg-foreground/10 rounded-full" />
            <div className="w-20 h-4 bg-foreground/10 rounded-full" />
            <div className="w-10 h-4 bg-foreground/10 rounded-full" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-14 h-4 bg-foreground/10 rounded-full" />
            <div className="w-14 h-4 bg-foreground/10 rounded-full" />
            <div className="w-14 h-4 bg-foreground/10 rounded-full" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-12 h-4 bg-foreground/10 rounded-full" />
            <div className="w-12 h-4 bg-foreground/10 rounded-full" />
            <div className="w-20 h-4 bg-foreground/10 rounded-full" />
            <div className="w-12 h-4 bg-foreground/10 rounded-full" />
          </div>
        </div>
      </div>
      <div className="flex items-start space-x-4 p-2">
        <div className="w-7 h-7 md:w-10 md:h-10 rounded-full bg-foreground/20 animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="w-40 h-4 bg-foreground/20 animate-pulse rounded-full" />
          <div className="flex items-center gap-2">
            <div className="w-20 h-4 bg-foreground/10 rounded-full" />
            <div className="w-16 h-4 bg-foreground/10 rounded-full" />
            <div className="w-12 h-4 bg-foreground/10 rounded-full" />
            <div className="w-32 h-4 bg-foreground/10 rounded-full" />
          </div>
          <div className="w-48 h-48 bg-foreground/10 rounded-md"></div>
        </div>
      </div>
      <div className="flex items-start space-x-4 p-2">
        <div className="w-7 h-7 md:w-10 md:h-10 rounded-full bg-foreground/20 animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="w-40 h-4 bg-foreground/20 animate-pulse rounded-full" />
          <div className="flex items-center gap-2">
            <div className="w-20 h-4 bg-foreground/10 rounded-full" />
            <div className="w-8 h-4 bg-foreground/10 rounded-full" />
            <div className="w-12 h-4 bg-foreground/10 rounded-full" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-4 bg-foreground/10 rounded-full" />
            <div className="w-16 h-4 bg-foreground/10 rounded-full" />
            <div className="w-20 h-4 bg-foreground/10 rounded-full" />
            <div className="w-14 h-4 bg-foreground/10 rounded-full" />
            <div className="w-8 h-4 bg-foreground/10 rounded-full" />
            <div className="w-10 h-4 bg-foreground/10 rounded-full" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-16 h-4 bg-foreground/10 rounded-full" />
            <div className="w-10 h-4 bg-foreground/10 rounded-full" />
            <div className="w-16 h-4 bg-foreground/10 rounded-full" />
            <div className="w-8 h-4 bg-foreground/10 rounded-full" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-20 h-4 bg-foreground/10 rounded-full" />
            <div className="w-20 h-4 bg-foreground/10 rounded-full" />
            <div className="w-20 h-4 bg-foreground/10 rounded-full" />
            <div className="w-12 h-4 bg-foreground/10 rounded-full" />
            <div className="w-20 h-4 bg-foreground/10 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NextPageSkeleton;
