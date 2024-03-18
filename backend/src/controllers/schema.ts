import { z } from 'zod';

export const pollSchema = z.object({
  id: z.string(),
  question: z.string(),
  options: z.array(z.string()),
});

export const voteSchema = z.object({
  voteId: z.string(),
  vote: z.number(),
});

export const populateSchema = z.object({
  quantity: z.number(),
});
