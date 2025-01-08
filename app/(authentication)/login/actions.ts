'use server';

import { createClient, getURL } from '@/shared/lib/utils';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { LoginFormType, LoginFormSchema } from '@/views/login';

export async function login(data: LoginFormType) {
  const supabase = await createClient();
  const parsed = LoginFormSchema.safeParse(data);

  if (!parsed.success) {
    return {
      message: 'Invalid form data',
    };
  }
  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return {
      message: `Failed to login: ${error.message}`,
    };
  }

  revalidatePath('/', 'layout');
  redirect('/private');
}

export async function oAuthSignIn(provider: 'discord' | 'google') {
  const supabase = await createClient();
  const redirectUrl = `${getURL()}auth/callback?provider=${provider}`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: provider,
    options: {
      redirectTo: redirectUrl,
    },
  });

  if (error) {
    return {
      message: `Failed to login: ${error.message}`,
    };
  }

  return redirect(data.url);
}
