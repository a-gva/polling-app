import { Request, Response } from 'express';
import {
  cachePolls,
  clearPollsCache,
  currentCachedPolls,
} from '../../../../cache/allPolls';
import prisma from '../../../../prisma';
import { socketClient } from '../../../../socket';
import { getAllPolls } from '../GET/getAllPolls';

export async function deleteAllPolls(req: Request, res: Response) {
  const io = socketClient(req);

  try {
    await prisma.pollVotes.deleteMany();
    await prisma.polls.deleteMany();
    console.log(`🟩 Polls deleted!`);
    getAllPolls(req, res);
    io.emit('allPollsDeleted');
    clearPollsCache();
    await cachePolls();
    io.emit('allPolls', currentCachedPolls());
  } catch (err) {
    res.status(404).send('Error!:' + err);
  }
}
