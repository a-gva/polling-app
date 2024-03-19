import { Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../../../../prisma';
import { pollSchema } from '../../../schema';
import { getAllPolls } from '../GET/getAllPolls';

export async function deletePoll(req: Request, res: Response) {
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
  } catch (err) {
    res.status(404).send('Error!:' + err);
  }
}
