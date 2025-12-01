import { z } from 'zod';

export const OrganizationSchema = z.object({
  id: z.number(),
  name: z.string(),
  children: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    })
  ),
  photo: z.string().url(),
});
