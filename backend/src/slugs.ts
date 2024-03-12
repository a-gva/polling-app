import { get404 } from './controllers/404';
import { router as createPoll } from './routes/createPoll';

export const routes = [
  { path: '/createPoll', handler: createPoll },
  { path: '/', handler: get404 },
];
