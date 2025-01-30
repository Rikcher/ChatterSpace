import { z } from 'zod';

export const editProfileModalFormSchema = z.object({
  name: z.string().min(1, { message: 'Profile name is required' }),
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
