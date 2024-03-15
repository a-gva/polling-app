import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { createServer } from 'http';
import path from 'path';
import { Server as Io } from 'socket.io';
import swaggerUi from 'swagger-ui-express';
import cache from './cache';
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

// BOOK INDEX
routes.forEach((route) => {
  app.use(route.path, route.handler);
});

export let allPollsCached = [];

io.on('connection', (socket) => {
  console.log('A user connected: ' + socket.id);

  socket.on('disconnect', () => {
    console.log('A user disconnected: ' + socket.id);
  });
  socket.on('message', (message) => {
    console.log('Messagem recebida:' + JSON.stringify(message));
    console.log('Enviada por:' + JSON.stringify(socket.id));
    socket.broadcast.emit('message', JSON.stringify(message));
  });
});

server.listen(port, async () => {
  console.log(`Server running on port ${port}`);

  try {
    const response = await axios.get('http://localhost:' + port + '/poll');
    allPollsCached = response.data;
    cache.set('allPolls', allPollsCached, Number(process.env.CACHE_TIMEOUT));
    // console.log('Polls fetched and stored in cache');
    // console.log(cache.get('allPolls'));
  } catch (error) {
    console.error('Failed to fetch polls:', error);
  }
});
