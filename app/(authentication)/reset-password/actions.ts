'use server';

import {
  ResetPasswordFormSchemaType,
  ResetPasswordFormSchema,
} from '@/views/reset-password';
import { createClient, getURL } from '@/shared/lib/utils';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function sendResetPasswordLink(data: ResetPasswordFormSchemaType) {
  const supabase = await createClient();
  const parsed = ResetPasswordFormSchema.safeParse(data);

  if (!parsed.success) {
    return {
      message: 'Invalid form data',
    };
  }
  const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
    redirectTo: `${getURL()}/update-password`,
  });

  if (error) {
    return {
      message: `Failed to send link: ${error.message}`,
    };
  }

  revalidatePath('/', 'layout');
  redirect('/login?resetPassword=true');
}
