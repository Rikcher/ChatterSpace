import {
  Server,
  Member,
  Profile,
  Message,
  MemberRole,
  DirectMessage,
  Conversation,
} from '@prisma/client';

export type MemberWithProfile = Member & {
  profile: { imageUrl: string; username: string; id: string; email: string };
};

export type ServerWithMembersWithProfiles = Server & {
  members: MemberWithProfile[];
};

export type MessageWithProfile = (Message | DirectMessage) & {
  profile: Pick<Profile, 'username' | 'imageUrl'>;
  role?: MemberRole;
  pending?: boolean;
};

export type ProfileWithConversations = Profile & {
  conversationsInitiated: (Conversation & {
    profileOne: Profile;
    profileTwo: Profile;
  })[];
  conversationsReceived: (Conversation & {
    profileOne: Profile;
    profileTwo: Profile;
  })[];
};
