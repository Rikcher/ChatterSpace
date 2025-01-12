import { z } from 'zod';

export const createServerModalFormSchema = z.object({
  name: z.string().min(1, { message: 'Server name is required' }),
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

export type createServerModalFormType = z.infer<
  typeof createServerModalFormSchema
>;

export type createServerPayloadType = z.infer<typeof createNewServerPayload>;
