import React from 'react';
import { Loader2 } from 'lucide-react';

const Loading = () => {
  return (
    <div className="w-full h-full bg-card-shade-2 flex items-center justify-center">
      <Loader2 className="animate-spin w-10 h-10 text-foreground/30" />
    </div>
  );
};

export default Loading;
