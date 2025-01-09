import { z } from 'zod';

// Define the base schema without superRefine
const BaseRegistrationFormSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address (e.g., name@example.com).',
  }),
  options: z.object({
    data: z.object({
      username: z
        .string()
        .min(3, 'Username must be at least 3 characters long')
        .max(20, 'Username must be at most 20 characters long')
        .regex(
          /^[a-zA-Z0-9_]+$/,
          'Username can only contain letters, numbers, and underscores'
        ),
    }),
  }),
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

export const RegistrationFormSchema = BaseRegistrationFormSchema.superRefine(
  (data, ctx) => {
    if (data.password !== data.passwordRepeat) {
      ctx.addIssue({
        path: ['passwordRepeat'],
        message: 'Passwords do not match.',
        code: 'custom',
      });
    }
  }
);

export const RegistrationFormPayloadSchema = BaseRegistrationFormSchema.omit({
  passwordRepeat: true,
});

export type RegistrationFormType = z.infer<typeof RegistrationFormSchema>;
export type RegistrationFormPayloadType = z.infer<
  typeof RegistrationFormPayloadSchema
>;
