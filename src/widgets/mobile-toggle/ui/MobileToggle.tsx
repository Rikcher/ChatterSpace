import React from 'react';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  Button,
} from '@/shared/shadcn-ui';
import { Sidebar } from '@/widgets/sidebar';
import { ServerSidebar } from '@/widgets/server-sidebar';
import { ConversationsSidebar } from '@/widgets/conversations-sidebar';

const MobileToggle = ({ serverId }: { serverId?: string }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 flex gap-0" showClose={false}>
        <SheetHeader>
          <SheetTitle className="hidden">Navigation Menu</SheetTitle>
          <SheetDescription className="hidden">
            Navigation Menu
          </SheetDescription>
        </SheetHeader>
        <div className="w-[72px]">
          <Sidebar />
        </div>
        {serverId ? (
          <ServerSidebar serverId={serverId} />
        ) : (
          <ConversationsSidebar />
        )}
      </SheetContent>
    </Sheet>
  );
};
export default MobileToggle;
