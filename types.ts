import {
  Server,
  Member,
  Profile,
  Message,
  MemberRole,
  DirectMessage,
} from '@prisma/client';

export type ServerWithMembersWithProfiles = Server & {
  members: (Member & { profile: Profile })[];
};

export type MessageWithProfile = (Message | DirectMessage) & {
  profile: Pick<Profile, 'username' | 'imageUrl'>;
  role?: MemberRole;
  pending?: boolean;
};
