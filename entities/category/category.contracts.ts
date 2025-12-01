import { z } from 'zod';

export const CategorySchema = z.object({
  id: z.number(),
  name: z.string(),
});
