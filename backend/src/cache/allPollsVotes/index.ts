import dotenv from 'dotenv';
import { VotesRegistry } from '../../types';
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
    await new Promise<void>((resolve) => {
      setTimeout(async () => {
        try {
          const response = await fetch('http://localhost:' + port + '/votes');
          const data = (await response.json()) as VotesRegistry;
          allVoteResultsCached = data;
          cache.set(
            'allPollsVotes',
            allVoteResultsCached,
            Number(process.env.CACHE_TIMEOUT)
          );
          console.log('🟢 All Polls Votes Cached on Server \n');
          resolve();
        } catch (error) {
          console.error('🔴 Failed to fetch and cache All Polls Votes:', error);
          resolve();
        }
      }, 50);
    });
  } catch (error) {
    console.error(
      '🔴 Failed to set timeout for fetching and caching All Polls Votes:',
      error
    );
  }
}

export function currentAllPollsVotes(): VotesRegistry | undefined {
  return cache.get('allPollsVotes');
}
