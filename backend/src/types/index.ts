import { z } from 'zod';
import { pollSchema } from '../schema';

export type Poll = z.infer<typeof pollSchema>;
