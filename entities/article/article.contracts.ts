import { z } from 'zod';

export const ArticleSchema = z.object({
  id: z.number(),
  categories: z.array(z.string()),
  categoriesId: z.string(),
  totalLikes: z.number(),
  photo: z.string().url(),
  title: z.string(),
  subtitle: z.string(),
  body: z.array(z.object({})),
  likeCount: z.number(),
  viewCount: z.number(),
  readTime: z.number(),
  status: z.enum(['draft', 'pending', 'approved', 'rejected', 'archived']),
  moderatorComment: z.string(),
  updated: z.string(),
  created: z.string(),
  author: z.object({
    id: z.number(),
    fullName: z.string(),
    photo: z.string().url(),
  }),
  organization: z.object({
    id: z.number(),
    name: z.string(),
  }),
  likes: z.array(z.number()),
});

export const ArticlesList = z.object({
  count: z.number(),
  next: z.string().url(),
  previous: z.string().url(),
  results: z.array(ArticleSchema),
});

export const ArticleView = z.object({
  body: z.array(z.object({})),
});

export const ArticleLike = z.object({
  id: z.number(),
  likeCount: z.number(),
  likes: z.array(z.number()),
});

export const CreateArticleDtoSchema = z.object({
  title: z.string().min(3),
  subtitle: z.string().min(3),
  body: z.array(z.object({})),
  organization: z.number(),
  status: z.string(),
  readTime: z.number(),
  categories: z.array(z.string()),
  photo: z.instanceof(File),
});

export const CreateBoxDtoSchema = z.object({
  name: z.string().min(3),
  photo: z.instanceof(File),
  organization: z.number(),
  categories: z.array(z.string()),
  status: z.enum(['draft', 'pending', 'approved', 'rejected', 'archived']),
});

export const AddArticleBoxDtoSchema = z.object({
  articles: z.array(z.number()),
});
