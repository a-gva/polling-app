import axios from 'axios';
import dotenv from 'dotenv';
import NodeCache from 'node-cache';
import { Poll } from './types';

dotenv.config();
const port = process.env.PORT;

const cache = new NodeCache();

export let allPollsCached: Poll[] = [];

export function clearPollsCache(): void {
  try {
    cache.del('allPolls');
    console.log('SERVER: Cache cleared!');
  } catch (error) {
    console.error('Failed to clear cache:', error);
  }
}

export async function cachePolls(): Promise<void> {
  try {
    const response = await axios.get<Poll[]>(
      'http://localhost:' + port + '/poll'
    );
    allPollsCached = response.data;
    cache.set('allPolls', allPollsCached, Number(process.env.CACHE_TIMEOUT));
    console.log('SERVER: Polls Cached');
  } catch (error) {
    console.error('Failed to fetch polls:', error);
  }
}

export function currentCachedPolls(): Poll[] | undefined {
  return cache.get('allPolls');
}

export default cache;
