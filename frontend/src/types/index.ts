import {
  newPollFormInputSchema,
  pollWithVotesSchema,
  pollsSchema,
  pollsWithResultsSchema,
  singlePollSchema,
} from '@/schema';
import { z } from 'zod';

export type SinglePollProps = z.infer<typeof singlePollSchema>;
export type PollsProps = z.infer<typeof pollsSchema>;
export type NewPollFormInputSchemaProps = z.infer<
  typeof newPollFormInputSchema
>;
export type SinglePollVotes = z.infer<typeof pollWithVotesSchema>;
export type VotesRegistry = z.infer<typeof pollsWithResultsSchema>;
