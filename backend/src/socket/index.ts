import { Request } from 'express';
import { Server as Io } from 'socket.io';
import { allPollsCached } from '../cache/allPolls';
import { allVoteResultsCached } from '../cache/allPollsVotes';

export const socketClient = (req: Request) => {
  return req.app.get('io');
};

export function handleSocketConnection(io: Io) {
  io.on('connection', async (socket) => {
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
  });
}
