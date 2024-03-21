import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { allPollsCached } from '../../../../cache/allPolls';
import {
  cacheAllPollsVotes,
  clearAllPollsVotesCache,
} from '../../../../cache/allPollsVotes';
import prisma from '../../../../prisma';
import { pollSchema, voteSchema } from '../../../../schema';

export async function createVote(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const { vote } = req.body;

    const parsedPollId = id as z.infer<typeof pollSchema>['id'];
    const parsedVote = vote as z.infer<typeof voteSchema>['vote'];

    const poll = allPollsCached.find((poll) => poll.id === parsedPollId);

    if (!poll) {
      console.error(`Poll with id "${parsedPollId}" not found`);
      res.status(404).send(`Poll with id "${parsedPollId}" not found`);
      return;
    }

    if (vote >= 0 && vote < poll.options.length) {
      const dbVote = await prisma.pollVotes.create({
        data: {
          pollId: parsedPollId,
          vote: parsedVote,
        },
      });
      console.log('🗳️ Vote registered! \n');
      res.status(200).send(dbVote);
      clearAllPollsVotesCache();
      cacheAllPollsVotes();
    } else {
      console.error(`Vote "${parsedVote}" is out of range`);
      res.status(400).send(`Vote "${parsedVote}" is out of range`);
    }
  } catch (err) {
    if (err instanceof z.ZodError) {
      const errorMessage = err.errors
        .map(
          (error) =>
            `3. 🔴 ERROR on "${error.path.join('.')}" - ${error.message}`
        )
        .join('\n');
      console.error(errorMessage);
      res.status(400).send(errorMessage);
    } else {
      console.error(`4. 🔴 ERROR: ${err.message}`);
      res.status(400).send(`5. 🔴 ERROR: ${err.message}`);
    }
  }
}
