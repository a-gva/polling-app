import { z } from 'zod';
import {
  pollSchema,
  pollsWithResultsSchema,
  pollWithVotesSchema,
} from '../schema';

export type Poll = z.infer<typeof pollSchema>;
export type PollsWithResults = z.infer<typeof pollsWithResultsSchema>;
export type VotesRegistry = z.infer<typeof pollWithVotesSchema>;
