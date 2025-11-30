import { z } from 'zod';
import { CommentSchema, CreateCommentSchema } from './comment.contract';

export type Comment = z.infer<typeof CommentSchema>;
export type CreateComment = z.infer<typeof CreateCommentSchema>;
