'use client';

import React from 'react';
import { Button } from '@/shared/shadcn-ui';
import { MessageCircle } from 'lucide-react';
import { ActionTooltip } from '@/shared/ui/action-tooltip';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/shared/lib/utils';

const ConversationsAction: React.FC = ({}) => {
  const router = useRouter();
  const isActive = usePathname().startsWith('/conversations');

  const onClick = () => {
    router.push('/conversations');
  };

  return (
    <div className="flex items-center">
      <ActionTooltip side="right" align="center" label="Direct Messages">
        <Button
          onClick={onClick}
          className={cn(
            'flex m-3 mb-1 h-[48px] w-[48px] rounded-[24px] hover:rounded-[16px] transition-all duration-300 overflow-hidden items-center justify-center bg-background-shade hover:bg-primary text-foreground hover:text-background p-0',
            isActive && 'rounded-[16px] bg-primary text-background'
          )}
        >
          <MessageCircle size={20} strokeWidth={2.5} />
        </Button>
      </ActionTooltip>
    </div>
  );
};

export default ConversationsAction;
