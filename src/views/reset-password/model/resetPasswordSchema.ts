import { z } from 'zod';

export const ResetPasswordFormSchema = z.object({
  email: z.string().email(),
});

export type ResetPasswordFormSchemaType = z.infer<
  typeof ResetPasswordFormSchema
>;
