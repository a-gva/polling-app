import dotenv from 'dotenv';
import { Poll } from '../../types';
import { cache } from '../provider';

dotenv.config();
const port = process.env.PORT;

export let allPollsCached: Poll[] = [];

export function clearPollsCache(): void {
  try {
    cache.del('allPolls');
    console.log('💻 SERVER: Cache cleared! \n');
  } catch (error) {
    console.error('Failed to clear cache:', error, '\n');
  }
}

export async function cachePolls(): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(async () => {
        const response = await fetch('http://localhost:' + port + '/poll');
        const data = (await response.json()) as Poll[];
        allPollsCached = data;
        cache.set(
          'allPolls',
          allPollsCached,
          Number(process.env.CACHE_TIMEOUT)
        );
        console.log('🟢 All Polls Cached on Server \n');
        resolve();
      }, 1000);
    } catch (error) {
      console.error('🔴 Failed to fetch polls:', error);
      reject(error);
    }
  });
}

export function currentCachedPolls(): Poll[] | undefined {
  return cache.get('allPolls');
}
