'use client';

import { useEffect } from 'react';
import { clientCreateClient } from '@/shared/lib/utils';
import useMembersStore from '../store/MembersStore';
import { ServerWithMembersWithProfiles } from '@types';
import { Member } from '@prisma/client';

const useMemberSubscription = (server: ServerWithMembersWithProfiles) => {
  const { setMembers, addMember, removeMember, updateMember } =
    useMembersStore();

  const supabase = clientCreateClient();

  useEffect(() => {
    if (server) {
      setMembers(server.members);
    }

    const channel = supabase.channel(`${server.id}-members`).on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'Member',
        filter: `serverId=eq.${server.id}`,
      },
      async (payload) => {
        const newMember = payload.new as Member;
        // @ts-ignore
        const oldMemberId = payload.old?.id as string;

        if (payload.eventType === 'DELETE') {
          removeMember(oldMemberId);
          return;
        }

        const { data: profileData, error: profileError } = await supabase
          .from('Profile')
          .select('username, imageUrl, id, email')
          .eq('id', newMember.profileId)
          .single();

        if (profileError) return;

        const newMemberWithProfile = {
          ...newMember,
          profile: {
            username: profileData.username || 'Unknown',
            imageUrl: profileData.imageUrl || '',
            id: profileData.id,
            email: profileData.email,
          },
        };

        if (payload.eventType === 'INSERT') {
          addMember(newMemberWithProfile);
        }

        if (payload.eventType === 'UPDATE') {
          updateMember(newMemberWithProfile);
        }
      }
    );

    channel.subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [server.id, supabase, setMembers, addMember, removeMember]);
};

export default useMemberSubscription;
