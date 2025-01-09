import { z } from 'zod';

export const BaseUpdatePasswordFormSchema = z.object({
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' })
    .max(24, { message: 'Password must not exceed 24 characters.' })
    .regex(/[a-z]/, {
      message: 'Password must contain at least one lowercase letter.',
    })
    .regex(/[A-Z]/, {
      message: 'Password must contain at least one uppercase letter.',
    })
    .regex(/[0-9]/, { message: 'Password must contain at least one digit.' })
    .regex(/[!@#$%&]/, {
      message: 'Password must contain at least one special character (!@#$%&).',
    }),

  passwordRepeat: z.string(),
});

export const UpdatePasswordFormSchema =
  BaseUpdatePasswordFormSchema.superRefine((data, ctx) => {
    if (data.password !== data.passwordRepeat) {
      ctx.addIssue({
        path: ['passwordRepeat'],
        message: 'Passwords do not match.',
        code: 'custom',
      });
    }
  });

export const UpdatePasswordFormPayloadSchema =
  BaseUpdatePasswordFormSchema.omit({
    passwordRepeat: true,
  });

export type UpdatePasswordFormSchemaType = z.infer<
  typeof UpdatePasswordFormSchema
>;
export type UpdatePasswordFormPayloadType = z.infer<
  typeof UpdatePasswordFormPayloadSchema
>;
