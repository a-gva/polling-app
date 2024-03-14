import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import cache from './cache';
import { routes } from './slugs';
import { rootDir } from './utils/path';

dotenv.config();
const port = process.env.PORT;

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(rootDir, 'public')));

// BOOK INDEX
routes.forEach((route) => {
  app.use(route.path, route.handler);
});

export let allPollsCached = [];

app.listen(port, async () => {
  console.log(`Server running on port ${port}`);

  try {
    const response = await axios.get('http://localhost:' + port + '/poll');
    allPollsCached = response.data;
    cache.set('allPolls', allPollsCached, Number(process.env.CACHE_TIMEOUT));
    console.log('Polls fetched and stored in cache');
    console.log(cache.get('allPolls'));
  } catch (error) {
    console.error('Failed to fetch polls:', error);
  }
});
