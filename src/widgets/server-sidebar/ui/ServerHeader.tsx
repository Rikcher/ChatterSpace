'use client';

import React from 'react';
import { ServerWithMembersWithProfiles } from '@types';
import { MemberRole } from '@prisma/client';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  Button,
} from '@/shared/shadcn-ui';
import {
  ChevronDown,
  LogOut,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users,
} from 'lucide-react';
import { useModal } from '@/shared/lib/hooks';

interface ServerHeaderProps {
  server: ServerWithMembersWithProfiles;
  role?: MemberRole;
}

const ServerHeader: React.FC<ServerHeaderProps> = ({ server, role }) => {
  const { onOpen } = useModal();

  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-full text-md font-semibold px-3 flex items-center h-12 border-none border-b-2 border-border bg-transparent text-foreground hover:bg-foreground/[.08] rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 outline-none">
          {server.name}
          <ChevronDown className="ml-auto w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 text-xs font-medium">
        {isModerator && (
          <DropdownMenuItem
            className="text-primary px-3 py-2 text-sm cursor-pointer"
            onClick={() => onOpen('invite', { server })}
          >
            Invite people
            <UserPlus className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isModerator && (
          <DropdownMenuItem
            className="text-foreground/65 px-3 py-2 text-sm cursor-pointer"
            onClick={() => onOpen('createChannel')}
          >
            Create Channel
            <PlusCircle className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem
            className="text-foreground/65 px-3 py-2 text-sm cursor-pointer"
            onClick={() => onOpen('members', { server })}
          >
            Manage Members
            <Users className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem
            className="text-foreground/65 px-3 py-2 text-sm cursor-pointer"
            onClick={() => onOpen('editServer', { server })}
          >
            Server Setting
            <Settings className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isModerator && (
          <DropdownMenuSeparator className="my-[0.25rem]"></DropdownMenuSeparator>
        )}
        {isAdmin && (
          <DropdownMenuItem className="text-destructive px-3 py-2 text-sm cursor-pointer">
            Delete Server
            <Trash className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {!isAdmin && (
          <DropdownMenuItem className="text-destructive px-3 py-2 text-sm cursor-pointer">
            Leave Server
            <LogOut className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ServerHeader;
