import {
  Server,
  Member,
  Profile,
  Message,
  MemberRole,
  DirectMessage,
  Conversation,
} from '@prisma/client';

export type ServerWithMembersWithProfiles = Server & {
  members: (Member & { profile: Profile })[];
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
