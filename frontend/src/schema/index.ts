import { z } from 'zod';

export const singlePollSchema = z.object({
  id: z.string(),
  question: z.string(),
  options: z.array(z.string()),
  votes: z.array(z.unknown()),
  created_at: z.string(),
  updated_at: z.string(),
  options_length: z.number(),
});

export const pollsSchema = z.array(singlePollSchema);

export const newPollFormInputSchema = z.object({
  question: z.string(),
  mandatoryOptions: z.array(z.string()),
  nullableOptions: z.array(z.string()).optional(),
});
