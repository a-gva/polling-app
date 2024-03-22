import { Request, Response } from 'express';
import { z } from 'zod';
import { allPollsCached } from '../../../../cache/allPolls';
import {
  cacheAllPollsVotes,
  clearAllPollsVotesCache,
  currentAllPollsVotes,
} from '../../../../cache/allPollsVotes';
import prisma from '../../../../prisma';
import { pollSchema, populateSchema } from '../../../../schema';
import { socketClient } from '../../../../socket';

export async function populatePollWithMockVotes(req: Request, res: Response) {
  const io = socketClient(req);

  let output = [];

  const { id } = req.params;
  const { quantity } = req.query;

  const parsedPollId = id as z.infer<typeof pollSchema>['id'];
  const parsedQuantity = Number(quantity) as z.infer<
    typeof populateSchema
  >['quantity'];

  const poll = allPollsCached.find((poll) => poll.id === parsedPollId);

  if (!poll) {
    res.status(404).send('Poll not found');
    return;
  }

  function createVote(pollId: string) {
    return {
      pollId,
      vote: Math.floor(Math.random() * poll.options_length),
    };
  }

  for (let i = 0; i < parsedQuantity; i++) {
    output.push(createVote(parsedPollId));
  }

  output.map(async (vote) => {
    await prisma.pollVotes.create({
      data: {
        pollId: vote.pollId,
        vote: vote.vote,
      },
    });
    console.log('🗳️ Vote registered! \n');
    console.log(`${vote.pollId} - ${vote.vote}`);
    clearAllPollsVotesCache();
    await cacheAllPollsVotes();
    const allPollsVotes = currentAllPollsVotes();
    io.emit('allPollsVotes', allPollsVotes);
  });

  res
    .status(200)
    .send(
      `- poll id: ${parsedPollId} \n- ${parsedQuantity} new votes registered`
    );
}
