import { z } from 'zod';
import {
  ArticleSchema,
  ArticlesList,
  ArticleLike,
  CreateArticleDtoSchema,
  CreateBoxDtoSchema,
  AddArticleBoxDtoSchema,
} from './article.contracts';

export type Article = z.infer<typeof ArticleSchema>;
export type ArticlesList = z.infer<typeof ArticlesList>;
export type ArticleLike = z.infer<typeof ArticleLike>;
export type CreateArticleDto = z.infer<typeof CreateArticleDtoSchema>;
export type CreateBox = z.infer<typeof CreateBoxDtoSchema>
export type AddArticleBoxDtoSchema = z.infer<typeof AddArticleBoxDtoSchema>