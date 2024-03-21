import {
  newPollFormInputSchema,
  pollsSchema,
  singlePollSchema,
  votesRegistrySchema,
} from '@/schema';
import { z } from 'zod';

export type SinglePollProps = z.infer<typeof singlePollSchema>;
export type PollsProps = z.infer<typeof pollsSchema>;
export type NewPollFormInputSchemaProps = z.infer<
  typeof newPollFormInputSchema
>;
export type VotesRegistry = z.infer<typeof votesRegistrySchema>;
