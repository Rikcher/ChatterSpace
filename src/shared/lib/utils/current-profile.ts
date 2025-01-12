import { createClient, db } from '@/shared/lib/utils';

export const currentProfile = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const profile = await db.profile.findUnique({
    where: { userId: user.id },
  });

  return profile;
};
