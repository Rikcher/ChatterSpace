import { createClient, db } from '@/shared/lib/utils';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const initialProfile = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    revalidatePath('/', 'layout');
    redirect('/login');
  }

  const profile = await db.profile.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (profile) {
    return profile;
  }

  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      username: user.user_metadata.username || user.user_metadata.name,
      imageUrl: user.user_metadata.picture,
      email: user.email!,
    },
  });

  return newProfile;
};
