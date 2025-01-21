import { Server, Member, Profile, Message, MemberRole } from '@prisma/client';

export type ServerWithMembersWithProfiles = Server & {
  members: (Member & { profile: Profile })[];
};

export type MessageWithProfile = Message & {
  profile: Pick<Profile, 'username' | 'imageUrl'>;
  role: MemberRole;
  pending?: boolean;
};
