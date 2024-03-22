import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { createServer } from 'http';
import path from 'path';
import { Server as Io } from 'socket.io';
import swaggerUi from 'swagger-ui-express';
import { cachePolls } from './cache/allPolls';
import { cacheAllPollsVotes } from './cache/allPollsVotes';
import { routes } from './slugs';
import { handleSocketConnection } from './socket';
import { swaggerDocs } from './swagger/swagger-config';
import { rootDir } from './utils/path';

dotenv.config();
const port = process.env.PORT;

const app = express();
const server = createServer(app);
const io = new Io(server, {
  cors: {
    origin: '*',
  },
});

app.set('io', io);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(rootDir, 'public')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

routes.forEach((route) => {
  app.use(route.path, route.handler);
});

handleSocketConnection(io);

server.listen(port, async () => {
  console.log(`💻 Server running on port ${port} \n`);
  try {
    await Promise.all([cachePolls(), cacheAllPollsVotes()]);
  } catch (error) {
    console.error('Error during caching:', error, '\n');
  }
  handleSocketConnection;
});
