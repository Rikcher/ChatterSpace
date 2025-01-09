'use server';

import {
  UpdatePasswordFormPayloadType,
  UpdatePasswordFormPayloadSchema,
} from '@/views/update-password';
import { createClient } from '@/shared/lib/utils';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function updatePassword(data: UpdatePasswordFormPayloadType) {
  const supabase = await createClient();
  const parsed = UpdatePasswordFormPayloadSchema.safeParse(data);

  if (!parsed.success) {
    return {
      message: 'Invalid form data',
    };
  }
  const { error } = await supabase.auth.updateUser({
    password: data.password,
  });

  if (error) {
    return {
      message: `Failed to update password: ${error.message}`,
    };
  }

  revalidatePath('/', 'layout');
  redirect('/private');
}

export async function exchangeCodeForSession(data: string) {
  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(data);

  if (error) {
    return {
      message: `Failed to to exchange code: ${error.message}`,
    };
  }
}
