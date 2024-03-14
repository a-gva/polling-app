import { Request, Response } from 'express';
import { z } from 'zod';
import { allPollsCached } from '../../../..';
import prisma from '../../../../prisma';
import { pollSchema } from '../../../schema';

export async function getVotes(req: Request, res: Response) {
  const { id } = req.params;

  const parsedPollId = id as z.infer<typeof pollSchema>['id'];

  const poll = allPollsCached.find((poll) => poll.id === parsedPollId);

  const dBResponse = await prisma.pollVotes.findMany({
    where: {
      pollId: parsedPollId,
    },
    select: {
      vote: true,
    },
  });

  let output = poll.options.map((option) => ({ option, count: 0 }));
  let myMap = new Map();
  dBResponse.map((vote) => {
    if (myMap.has(vote.vote)) {
      myMap.set(vote.vote, myMap.get(vote.vote) + 1);
    } else {
      myMap.set(vote.vote, 1);
    }
  });

  output = output.map((option, index) => {
    return { ...option, count: myMap.get(index) };
  });

  res.status(200).send(output);
}
