import { useState, useEffect } from 'react';
import { Member } from '@prisma/client';
import { clientCreateClient } from '@/shared/lib/utils';
import { ServerWithMembersWithProfiles } from '@types';

const useMembers = (server: ServerWithMembersWithProfiles) => {
  const [members, setMembers] = useState<
    (Member & { profile: { imageUrl: string; username: string; id: string } })[]
  >(server.members);

  const supabase = clientCreateClient();

  useEffect(() => {
    const channel = supabase.channel(`${server.id}-members`).on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'Member',
        filter: `serverId=eq.${server.id}`,
      },
      async (payload) => {
        console.log(payload);
        const newMember = payload.new as Member;
        // @ts-ignore
        const oldMemberId = payload.old.id as string;

        if (payload.eventType === 'INSERT') {
          const { data: profileData, error: profileError } = await supabase
            .from('Profile')
            .select('username, imageUrl, id')
            .eq('id', newMember.profileId)
            .single();

          if (profileError) return;

          setMembers((prev) => [
            ...prev,
            {
              ...newMember,
              profile: {
                username: profileData.username || 'Unknown',
                imageUrl: profileData.imageUrl || '',
                id: profileData.id,
              },
            },
          ]);
        }

        if (payload.eventType === 'DELETE') {
          setMembers((prev) =>
            prev.filter((member) => member.id !== oldMemberId)
          );
        }
      }
    );

    channel.subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [server.id, supabase]);

  return { members };
};

export default useMembers;
