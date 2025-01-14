import { z } from 'zod';
import { ChannelType } from '@prisma/client';

export const createChannelModalFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Channel name is required' })
    .refine((name) => name !== 'general', {
      message: 'Channel name cannot be "general"',
    }),
  type: z.nativeEnum(ChannelType),
});

export type createChannelModalFormType = z.infer<
  typeof createChannelModalFormSchema
>;
