import { create } from 'zustand';
import { Channel, ChannelType, Profile, Server } from '@prisma/client';

export type ModalType =
  | 'createServer'
  | 'invite'
  | 'editServer'
  | 'members'
  | 'createChannel'
  | 'leaveServer'
  | 'deleteServer'
  | 'deleteChannel'
  | 'editChannel'
  | 'messageFile'
  | 'deleteMessage'
  | 'deleteFile'
  | 'deleteConversation'
  | 'createDm'
  | 'editProfile';

interface ModalData {
  server?: Server;
  serverId?: string;
  channelId?: string;
  channel?: Channel;
  channelType?: ChannelType;
  messageId?: string;
  fileUrl?: string;
  profileId?: string;
  profile?: Profile;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  isOpen: false,
  data: {},
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
