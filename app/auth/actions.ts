'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/shared/lib/utils';

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/login');
}
