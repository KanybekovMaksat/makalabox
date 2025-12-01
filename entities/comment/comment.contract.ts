import { z } from 'zod';

export const CommentSchema = z.object({
  id: z.number(),
  author: z.object({
    username: z.string(),
    id: z.number(),
    photo: z.string().url(),
  }),
  content: z.string(),
  created: z.string().datetime(),
  article: z.number(),
});

export const CreateCommentSchema = z.object({
  content: z.string(),
  article: z.number(),
});
