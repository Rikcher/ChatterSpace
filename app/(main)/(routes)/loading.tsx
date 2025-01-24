import React from 'react';
import { Loader2, Plus } from 'lucide-react';

const Loading: React.FC = () => {
  return (
    <div className="h-full w-full">
      <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0 bg-card-shade">
        <div className="flex items-center justify-between p-3 pb-2">
          <p className="text-xs font-semibold text-foreground/60">
            Direct Messages
          </p>
          <div className="flex h-auto text-foreground/60 bg-transparent p-1 rounded-full hover:bg-foreground/10 hover:text-foreground">
            <Plus className="h-4 w-4" />
          </div>
        </div>
        <div className="flex items-center gap-2 mx-5 mt-1">
          <div className="h-8 w-8 md:h-8 md:w-8 rounded-full bg-foreground/20 animate-pulse" />
          <div className="h-3 w-[10rem] bg-foreground/10 rounded-full"></div>
        </div>
        <div className="flex items-center gap-2 mx-5 mt-4">
          <div className="h-8 w-8 md:h-8 md:w-8 rounded-full bg-foreground/20 animate-pulse" />
          <div className="h-3 w-[10rem] bg-foreground/10 rounded-full"></div>
        </div>
        <div className="flex items-center gap-2 mx-5 mt-4">
          <div className="h-8 w-8 md:h-8 md:w-8 rounded-full bg-foreground/20 animate-pulse" />
          <div className="h-3 w-[10rem] bg-foreground/10 rounded-full"></div>
        </div>
      </div>
      <main className="h-full md:pl-60 flex items-center justify-center">
        <Loader2 className="animate-spin w-10 h-10 text-foreground/30" />
      </main>
    </div>
  );
};
export default Loading;
