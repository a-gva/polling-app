import { z } from 'zod';

export const messageSchema = z.string();

export const pollSchema = z.object({
  id: z.string(),
  question: z.string(),
  options: z.array(z.string()),
  created_at: z.date().optional(),
  options_length: z.number().optional(),
});

export const voteSchema = z.object({
  voteId: z.string(),
  vote: z.number(),
});

export const populateSchema = z.object({
  quantity: z.number(),
});

const optionVotesSchema = z.object({
  totalVotes: z.number(),
  percentage: z.number(),
});

const pollWithVotesSchema = z.object({
  options: z.array(z.string()),
  votes: z.record(optionVotesSchema),
  totalPollVotes: z.number(),
});

export const pollsWithResultsSchema = z.record(pollWithVotesSchema);
