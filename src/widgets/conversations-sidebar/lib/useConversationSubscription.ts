'use client';

import { useEffect } from 'react';
import { Conversation, Profile } from '@prisma/client';
import { clientCreateClient } from '@/shared/lib/utils';
import { ProfileWithConversations } from '@types';
import { useConversationsStore } from '../store/ConversationsStore';

const useConversationSubscription = (profile: ProfileWithConversations) => {
  const {
    conversations,
    updateConversation,
    addConversation,
    removeConversation,
    setSortedConversations,
  } = useConversationsStore();

  const supabase = clientCreateClient();

  useEffect(() => {
    const channel = supabase.channel(`${profile.id}-conversations`).on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'Conversation',
      },
      async (payload) => {
        const newConversation = payload.new as Conversation;

        if (
          newConversation.profileOneId !== profile.id &&
          newConversation.profileTwoId !== profile.id
        )
          return;
        // @ts-ignore
        const oldConversation = payload.old as Conversation;

        const otherProfileId =
          newConversation.profileOneId === profile.id
            ? newConversation.profileTwoId
            : newConversation.profileOneId;
        const { data: otherProfile, error: profileError } = await supabase
          .from('Profile')
          .select('username, imageUrl, id')
          .eq('id', otherProfileId)
          .single();

        const newConversationWithProfile = {
          ...newConversation,
          pinned: newConversation.pinned,
          profileOne:
            newConversation.profileOneId === profile.id
              ? profile
              : (otherProfile as Profile),
          profileTwo:
            newConversation.profileTwoId === profile.id
              ? profile
              : (otherProfile as Profile),
        };

        if (payload.eventType === 'INSERT') {
          if (profileError || !otherProfile) return;
          console.log('INSERT');
          addConversation(newConversationWithProfile);
        }

        if (payload.eventType === 'DELETE') {
          removeConversation(oldConversation.id);
          console.log('DELETE');
        }

        if (payload.eventType === 'UPDATE') {
          const pinnedForUser =
            !oldConversation.pinned.includes(profile.id) &&
            newConversation.pinned.includes(profile.id);
          const unpinnedForUser =
            oldConversation.pinned.includes(profile.id) &&
            !newConversation.pinned.includes(profile.id);
          if (pinnedForUser || unpinnedForUser) {
            updateConversation(newConversationWithProfile);
          }
        }
      }
    );

    channel.subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [profile.id, supabase]);

  // Sort conversations whenever the conversations state changes
  useEffect(() => {
    if (!conversations) return;

    const sorted = [...conversations].sort((a, b) => {
      const isPinnedA = a.pinned.includes(profile.id);
      const isPinnedB = b.pinned.includes(profile.id);

      if (isPinnedA && !isPinnedB) return -1;
      if (!isPinnedA && isPinnedB) return 1;
      return 0;
    });

    setSortedConversations(sorted);
  }, [profile, conversations]);
};

export default useConversationSubscription;
