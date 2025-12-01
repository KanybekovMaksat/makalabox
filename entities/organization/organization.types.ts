import { z } from 'zod';
import { OrganizationSchema } from './organization.contracts';

export type OrganizationSchema = z.infer<typeof OrganizationSchema>;
