import { create } from 'zustand';
import { Conversation, Profile } from '@prisma/client';

export type ConversationWithProfiles = Conversation & {
  profileOne: Profile;
  profileTwo: Profile;
};

interface ConversationsStore {
  conversations: ConversationWithProfiles[];
  sortedConversations: ConversationWithProfiles[];
  addConversation: (newConversation: ConversationWithProfiles) => void;
  removeConversation: (conversationId: string) => void;
  updateConversation: (updatedConversation: ConversationWithProfiles) => void;
  setConversations: (newConversations: ConversationWithProfiles[]) => void;
  setSortedConversations: (
    newSortedConversations: ConversationWithProfiles[]
  ) => void;
}

export const useConversationsStore = create<ConversationsStore>((set) => ({
  conversations: [],
  sortedConversations: [],
  addConversation: (newConversation) =>
    set((state) => ({
      conversations: [...state.conversations, newConversation],
    })),
  removeConversation: (conversationId) =>
    set((state) => ({
      conversations: state.conversations.filter(
        (conversation) => conversation.id !== conversationId
      ),
    })),
  updateConversation: (updatedConversation) =>
    set((state) => ({
      conversations: state.conversations.map((conversation) =>
        conversation.id === updatedConversation.id
          ? { ...conversation, ...updatedConversation }
          : conversation
      ),
    })),
  setConversations: (newConversations) =>
    set(() => ({
      conversations: newConversations,
    })),
  setSortedConversations: (newSortedConversations) =>
    set(() => ({
      sortedConversations: newSortedConversations,
    })),
}));
