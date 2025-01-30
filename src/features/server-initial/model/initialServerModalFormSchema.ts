import { z } from 'zod';

export const initialServerModalFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Server name is required' })
    .max(20, { message: 'Server name must be at most 20 characters long' }),
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

export const createNewServerPayload = z.object({
  name: z.string().min(1),
  imageUrl: z.string().min(1),
});

export type initialServerModalFormType = z.infer<
  typeof initialServerModalFormSchema
>;

export type initialServerPayloadType = z.infer<typeof createNewServerPayload>;
