'use server';

import {
  RegistrationFormPayloadType,
  RegistrationFormPayloadSchema,
} from '@/views/registration';
import { createClient } from '@/shared/lib/utils';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function register(data: RegistrationFormPayloadType) {
  const supabase = await createClient();
  const parsed = RegistrationFormPayloadSchema.safeParse(data);

  if (!parsed.success) {
    return {
      message: 'Invalid form data',
    };
  }
  const { error } = await supabase.auth.signUp(data);

  if (error) {
    return {
      message: `Failed to register: ${error.message}`,
    };
  }

  revalidatePath('/', 'layout');
  redirect('/login?confirmRegistration=true');
}
