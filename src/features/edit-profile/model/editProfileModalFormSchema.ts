import { z } from 'zod';

export const editProfileModalFormSchema = z.object({
  name: z
    .string()
    .min(3, 'Username must be at least 3 characters long')
    .max(20, 'Username must be at most 20 characters long')
    .regex(
      /^[a-zA-Z0-9_\s]+$/,
      'Username can only contain letters, numbers, underscores, and spaces'
    ),
  image: z
    .any()
    .refine((value) => value !== null && value !== undefined, {
      message: 'Image is required',
    })
    .refine(
      (value) =>
        typeof value === 'string' ||
        (value instanceof File &&
          /\.(jpg|jpeg|png|gif|webp|bmp|tiff)$/i.test(value.name)),
      {
        message: 'Invalid image file. Only image files are allowed',
      }
    ),
});

export const editProfilePayload = z.object({
  name: z.string().min(1),
  imageUrl: z.string().min(1),
});

export type editProfileModalFormType = z.infer<
  typeof editProfileModalFormSchema
>;

export type editProfilePayloadType = z.infer<typeof editProfilePayload>;
