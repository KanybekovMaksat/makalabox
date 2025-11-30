import { z } from 'zod';
import { ArticleSchema } from '~entities/article/article.contracts';

export const LoginUserDtoSchema = z.object({
  email: z
    .string()
    .min(1, 'Введите ваш псевдоним или email')
    .refine((value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value) || value.length > 0;
    }, 'Введите действительный псевдоним или email'),
  password: z.string().min(6, 'Пароль должен состоять минимум из 6 символов'),
});

export const createUserSchema = z.object({
  email: z.string().email(),
  username: z
    .string()
    .min(3, 'Псевдоним должен состоять минимум из 6 символов'),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string().min(6, 'Пароль должен состоять минимум из 6 символов'),
});

export const editUserSchema = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  photo: z.instanceof(File).optional(),
});

export const ActivationData = z.object({
  uid: z.string(),
  token: z.string(),
});

export const UpdatePassword = z.object({
  uid: z.string(),
  token: z.string(),
  newPassword: z
    .string()
    .min(6, 'Пароль должен состоять минимум из 6 символов'),
  confirmPassword: z.string(),
});

export const TokensDtoSchema = z.object({
  access: z.string(),
  refresh: z.string(),
});

export const SendEmail = z.object({
  email: z
    .string()
    .email('Введите действительный  email')
    .min(1, 'Введите ваш  email'),
});

export const UserDtoSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  firstName: z.string(),
  official: z.boolean(),
  username: z.string(),
  lastName: z.string(),
  role: z.string(),
  photo: z.string(),
  favoriteArticles: z.array(ArticleSchema),
  articles: z.array(ArticleSchema),
});


