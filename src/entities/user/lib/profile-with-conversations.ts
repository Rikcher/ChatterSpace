import { createClient, db } from '@/shared/lib/utils';

export const profileWithConversations = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const profileWithConversations = await db.profile.findUnique({
    where: { userId: user.id },
    include: {
      conversationsInitiated: {
        include: {
          profileOne: true,
          profileTwo: true,
        },
      },
      conversationsReceived: {
        include: {
          profileOne: true,
          profileTwo: true,
        },
      },
    },
  });

  return profileWithConversations;
};
