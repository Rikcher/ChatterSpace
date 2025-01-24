import { z } from 'zod';

export const createDmModalFormSchema = z.object({
  email: z.string().min(1),
});

export type createDmModalFormType = z.infer<typeof createDmModalFormSchema>;
