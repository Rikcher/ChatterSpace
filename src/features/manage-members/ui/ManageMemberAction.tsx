import React, { useState } from 'react';
import qs from 'query-string';
import { Member, MemberRole, Server } from '@prisma/client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/shared/shadcn-ui';
import {
  Check,
  Gavel,
  Loader2,
  MoreVertical,
  Shield,
  ShieldCheck,
  ShieldQuestion,
} from 'lucide-react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useModal } from '@/shared/lib/hooks';

interface ManageMemberActionProps {
  member: Member;
  server: Server;
}

const ManageMemberAction: React.FC<ManageMemberActionProps> = ({
  member,
  server,
}) => {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string>('');
  const { onOpen } = useModal();

  const onKick = async (memberId: string) => {
    try {
      setLoadingId(memberId);
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server?.id,
        },
      });

      const response = await axios.delete(url);

      router.refresh();
      onOpen('members', { server: response.data });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingId('');
    }
  };

  const onRoleChange = async (memberId: string, role: MemberRole) => {
    try {
      setLoadingId(memberId);
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server?.id,
        },
      });

      const response = await axios.patch(url, { role });

      router.refresh();
      onOpen('members', { server: response.data });
    } catch (error) {
      console.error('Failed to change role:', error);
    } finally {
      setLoadingId('');
    }
  };

  return (
    <div className="ml-auto">
      {loadingId === member.id ? (
        <Loader2 className="animate-spin w-4 h-4 text-foreground/60 ml-auto" />
      ) : (
        server.profileId !== member.profileId && (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MoreVertical className="h-4 w-4 text-foreground/60" />
            </DropdownMenuTrigger>
            <DropdownMenuContent side="left">
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="flex items-center">
                  <ShieldQuestion className="w-4 h-4" />
                  <span>Role</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem
                      onClick={() => onRoleChange(member.id, 'GUEST')}
                    >
                      <Shield className="h-4 w-4" />
                      Guest
                      {member.role === 'GUEST' && (
                        <Check className="h-4 w-4 ml-auto text-primary" />
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onRoleChange(member.id, 'MODERATOR')}
                    >
                      <ShieldCheck className="h-4 w-4" />
                      Moderator
                      {member.role === 'MODERATOR' && (
                        <Check className="h-4 w-4 ml-auto text-primary" />
                      )}
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuSeparator className="mx-1 bg-foreground/20" />
              <DropdownMenuItem onClick={() => onKick(member.id)}>
                <Gavel className="h-4 w-4" />
                Kick
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      )}
    </div>
  );
};

export default ManageMemberAction;
