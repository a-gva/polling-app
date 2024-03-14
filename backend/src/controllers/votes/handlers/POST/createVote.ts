import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { z } from 'zod';
import { pollSchema, voteSchema } from '../../../schema';

const prisma = new PrismaClient();

export async function createVote(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { vote } = req.body;

    const parsedPollId = id as z.infer<typeof pollSchema>['id'];
    const parsedVote = vote as z.infer<typeof voteSchema>['vote'];

    const dbVote = await prisma.pollVotes.create({
      data: {
        pollId: parsedPollId,
        vote: parsedVote,
      },
    });
    res.status(200).send(dbVote);
  } catch (err) {
    if (err instanceof z.ZodError) {
      const errorMessage = err.errors
        .map(
          (error) => `🔴 ERROR on "${error.path.join('.')}" - ${error.message}`
        )
        .join('\n');
      console.error(errorMessage);
      res.status(400).send(errorMessage);
    } else {
      console.error(`🔴 ERROR: ${err.message}`);
      res.status(400).send(`🔴 ERROR: ${err.message}`);
    }
  }
}
