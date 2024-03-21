import dotenv from 'dotenv';
import { Poll, VotesRegistry } from '../../types';
import { cache } from '../provider';

dotenv.config();
const port = process.env.PORT;

export let allVoteResultsCached: VotesRegistry = {};

export function clearAllPollsVotesCache(): void {
  try {
    cache.del('allPollsVotes');
    console.log('💻 SERVER: All Polls Votes Cache cleared! \n');
  } catch (error) {
    console.error('Failed to clear cache:', error, '\n');
  }
}

export async function cacheAllPollsVotes(): Promise<void> {
  try {
    setTimeout(async () => {
      const response = await fetch('http://localhost:' + port + '/vote');
      const data = (await response.json()) as VotesRegistry;
      allVoteResultsCached = data;
      cache.set(
        'allPollsVotes',
        allVoteResultsCached,
        Number(process.env.CACHE_TIMEOUT)
      );
      console.log('🟢 All Polls Votes Cached on Server \n');
    }, 1000);
  } catch (error) {
    console.error('🔴 Failed to fetch All Polls Votes:', error);
  }
}

export function currentAllPollsVotes(): Poll[] | undefined {
  return cache.get('allPollsVotes');
}
