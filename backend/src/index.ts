import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { createServer } from 'http';
import path from 'path';
import { Server as Io } from 'socket.io';
import swaggerUi from 'swagger-ui-express';
import { allPollsCached, cachePolls } from './cache/allPolls';
import {
  allVoteResultsCached,
  cacheAllPollsVotes,
} from './cache/allPollsVotes';
import { messageSchema } from './schema';
import { routes } from './slugs';
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

const handleSocketConnection = io.on('connection', async (socket) => {
  console.log('🙋‍♂️ A user connected: ' + socket.id, '\n');

  socket.on('readyForData', () => {
    console.log(
      `📊 A "readyForData" event received from user: ${socket.id} \n`
    );
    socket.emit('allPolls', allPollsCached);
    socket.emit('allPollsVotes', allVoteResultsCached);
  });

  socket.on('disconnect', () => {
    console.log('🚫 A user disconnected: ' + socket.id, '\n');
  });

  socket.on('message', (message) => {
    const parsedMessage = messageSchema.parse(message.body);
    const parsedMessageId = messageSchema.parse(socket.id);
    const output = {
      message: parsedMessage,
      sender: parsedMessageId,
    };
    socket.broadcast.emit('message', JSON.stringify(output));
  });
});

server.listen(port, async () => {
  console.log(`💻 Server running on port ${port} \n`);
  try {
    await Promise.all([cachePolls(), cacheAllPollsVotes()]);
  } catch (error) {
    console.error('Error during caching:', error, '\n');
  }
  handleSocketConnection;
});
