import { z } from 'zod';
import {
  ActivationData,
  LoginUserDtoSchema,
  SendEmail,
  TokensDtoSchema,
  UpdatePassword,
  UserDtoSchema,
  createUserSchema,
  editUserSchema,
} from './user.contracts';

export type UserDtoSchema = z.infer<typeof UserDtoSchema>;
export type LoginUserDto = z.infer<typeof LoginUserDtoSchema>;
export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type TokensDtoSchema = z.infer<typeof TokensDtoSchema>;
export type ActivationData = z.infer<typeof ActivationData>;
export type EditUserProfile = z.infer<typeof editUserSchema>;
export type UpdatePassword = z.infer<typeof UpdatePassword>;
export type SendEmail = z.infer<typeof SendEmail>;
