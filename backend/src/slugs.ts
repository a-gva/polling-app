import { get404 } from './controllers/404';
import { router as poll } from './routes/poll';
import { router as polls } from './routes/polls';
import { router as populate } from './routes/populate';
import { router as vote } from './routes/vote';
import { router as votes } from './routes/votes';

export const routes = [
  { path: '/poll', handler: poll },
  { path: '/polls', handler: polls },
  { path: '/vote', handler: vote },
  { path: '/votes', handler: votes },
  { path: '/populate', handler: populate },
  { path: '/', handler: get404 },
];
