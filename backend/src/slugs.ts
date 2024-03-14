import { get404 } from './controllers/404';
import { router as poll } from './routes/poll';
import { router as populate } from './routes/populate';
import { router as vote } from './routes/vote';

export const routes = [
  { path: '/poll', handler: poll },
  { path: '/vote', handler: vote },
  { path: '/populate', handler: populate },
  { path: '/', handler: get404 },
];
