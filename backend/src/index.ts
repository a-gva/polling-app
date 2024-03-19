import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { createServer } from 'http';
import path from 'path';
import { Server as Io } from 'socket.io';
import swaggerUi from 'swagger-ui-express';
import { z } from 'zod';
import { allPollsCached, cachePolls } from './cache';
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

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(rootDir, 'public')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const messageSchema = z.string();
const messageId = z.string();

// BOOK INDEX
routes.forEach((route) => {
  app.use(route.path, route.handler);
});

const handleSocketConnection = io.on('connection', async (socket) => {
  console.log('A user connected: ' + socket.id);

  socket.on('readyForData', () => {
    console.log('===> readyForData event received');
    socket.emit('allPolls', allPollsCached);
  });

  // setInterval(() => {
  try {
    if (allPollsCached.length > 0) {
      console.log(
        'Polls sent to client - sample:',
        allPollsCached[allPollsCached.length - 1]
      );
    }
    console.log(
      '🟩 Polls sent to client on connection:',
      allPollsCached.length
    );
  } catch (error) {
    console.error('Error during sending polls:', error);
  }

  // }, 10000);

  socket.on('disconnect', () => {
    console.log('A user disconnected: ' + socket.id);
  });

  socket.on('message', (message) => {
    const parsedMessage = messageSchema.parse(message.body);
    const parsedMessageId = messageSchema.parse(socket.id);
    const output = {
      message: parsedMessage,
      sender: parsedMessageId,
    };
    console.log(output);
    socket.broadcast.emit('message', JSON.stringify(output));
  });
});

server.listen(port, async () => {
  console.log(`Server running on port ${port}`);
  try {
    await cachePolls();
    console.log('Caching completed');
  } catch (error) {
    console.error('Error during caching:', error);
  }
  handleSocketConnection;
});
