import { get404 } from './controllers/404';
import { router as poll } from './routes/poll';

export const routes = [
  { path: '/poll', handler: poll },
  { path: '/', handler: get404 },
];
