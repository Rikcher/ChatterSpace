import { create } from 'zustand';
import { MessageWithProfile } from '@types';

interface MessagesStore {
  messages: MessageWithProfile[];
  pendingMessages: string[];
  addNextPage: (newMessages: MessageWithProfile[]) => void; // For bulk adding messages
  addMessage: (message: MessageWithProfile) => void; // For adding a single message
  updateMessage: (
    content: string | null,
    messageId: string,
    updatedAt: Date,
    deleted: boolean,
    fileUrls: string[]
  ) => void;
  getProperUrls: (messageId: string, fileUrls: string[]) => void;
  addToPendingMessages: (messageId: string) => void;
  removeFromPendingMessages: (messageId: string) => void;
  removeMessage: (messageId: string) => void;
  deleteMessage: (messageId: string) => void;
  removeFile: (messageId: string, fileUrl: string) => void;
}

export const useMessagesStore = create<MessagesStore>((set) => ({
  messages: [],
  pendingMessages: [],
  addNextPage: (newMessages) =>
    set(() => ({
      messages: newMessages, // Prepend new messages
    })),
  addMessage: (message) =>
    set((state) => ({
      messages: [message, ...state.messages], // Prepend single new message
    })),
  updateMessage: (content, messageId, updatedAt, deleted, fileUrls) =>
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.id === messageId
          ? {
              ...msg,
              content: content,
              updatedAt: updatedAt,
              deleted: deleted,
              fileUrls: fileUrls,
            }
          : msg
      ),
    })),
  getProperUrls: (messageId, fileUrls) =>
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.id === messageId
          ? {
              ...msg,
              fileUrls: fileUrls,
            }
          : msg
      ),
    })),
  addToPendingMessages: (messageId) =>
    set((state) => ({
      pendingMessages: [...state.pendingMessages, messageId],
    })),
  removeFromPendingMessages: (messageId) =>
    set((state) => ({
      pendingMessages: state.pendingMessages.filter((msg) => msg !== messageId),
      messages: state.messages.map((msg) =>
        msg.id === messageId ? { ...msg, pending: false } : msg
      ),
    })),
  removeMessage: (messageId) =>
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.id === messageId ? { ...msg, deleted: true } : msg
      ),
    })),
  deleteMessage: (messageId) =>
    set((state) => ({
      messages: state.messages.filter((msg) => msg.id !== messageId),
    })),
  removeFile: (messageId, fileUrl) =>
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.id === messageId
          ? {
              ...msg,
              fileUrls: msg.fileUrls.filter((file: string) => file !== fileUrl),
            }
          : msg
      ),
    })),
}));
