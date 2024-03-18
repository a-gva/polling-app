import axios from 'axios';
import dotenv from 'dotenv';
import NodeCache from 'node-cache';

dotenv.config();
const port = process.env.PORT;

const cache = new NodeCache();

export let allPollsCached = [];

export async function cachePolls() {
  try {
    const response = await axios.get('http://localhost:' + port + '/poll');
    allPollsCached = response.data;
    cache.set('allPolls', allPollsCached, Number(process.env.CACHE_TIMEOUT));
  } catch (error) {
    console.error('Failed to fetch polls:', error);
  }
}

export function clearPollsCache() {
  cache.del('allPolls');
}

export default cache;
