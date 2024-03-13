import { z } from 'zod';

export const pollSchema = z.object({
  name: z.string(),
  question: z.string(),
  options: z.array(z.string()),
});

export const dbPollId = z.object({
  id: z.number(),
});
