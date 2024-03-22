import { Request, Response } from 'express';
import { z } from 'zod';
import {
  cachePolls,
  clearPollsCache,
  currentCachedPolls,
} from '../../../../cache/allPolls';
import prisma from '../../../../prisma';
import { pollSchema } from '../../../../schema';
import { socketClient } from '../../../../socket';
import { getAllPolls } from '../../../polls/handlers/GET/getAllPolls';

export async function deletePoll(req: Request, res: Response) {
  const io = socketClient(req);

  const { id } = req.params;
  const parsedId = id as z.infer<typeof pollSchema>['id'];

  try {
    await prisma.pollVotes.deleteMany({
      where: {
        pollId: parsedId,
      },
    });
    await prisma.poll.delete({
      where: {
        id: parsedId,
      },
    });
    console.log(`🟩 Poll number "${parsedId}" deleted!`);
    getAllPolls(req, res);
    clearPollsCache();
    await cachePolls();
    io.emit('allPolls', currentCachedPolls());
  } catch (err) {
    res.status(404).send('Error!:' + err);
  }
}
