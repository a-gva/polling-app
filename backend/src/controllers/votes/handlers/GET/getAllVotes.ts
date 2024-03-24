import { Request, Response } from 'express';
import { allPollsCached, cachePolls } from '../../../../cache/allPolls';
import { cache } from '../../../../cache/provider';
import prisma from '../../../../prisma';
import { pollsWithResultsSchema } from '../../../../schema';
import { PollsWithResults, VotesRegistry } from '../../../../types';
import {
  setOptionVotes,
  setPercentage,
  setTotalVotes,
} from './getAllVotesUtils';

export async function getAllVotes(req: Request, res: Response) {
  try {
    await cachePolls();
  } catch (error) {
    console.error('🔴 Failed to cache polls:', error);
    res.status(500).send('Failed to cache polls');
    return;
  }

  const cachedAllPollsVotes: PollsWithResults = cache.get('allPollsVotes');

  if (cachedAllPollsVotes && Object.keys(cachedAllPollsVotes).length > 0) {
    console.log('🟢 Cached All Polls Votes sent back to client \n');
    res.status(200).send(cachedAllPollsVotes);
    return;
  }

  let votesRegistry: VotesRegistry = {};
  let polls: PollsWithResults = {};

  allPollsCached.map((poll) => {
    votesRegistry = {
      ...votesRegistry,
      [poll.id]: {
        votes: [],
      },
    };
  });

  allPollsCached.map((poll) => {
    polls = {
      ...polls,
      [poll.id]: {
        options: poll.options,
        votes: poll.options.reduce((acc, option, index) => {
          acc[index] = {
            totalVotes: 0,
            percentage: 0,
          };
          return acc;
        }, {}),
        totalPollVotes: 0,
      },
    };
  });

  await Promise.all(
    Object.keys(votesRegistry).map(async (id) => {
      try {
        const pollVotesResponse = await prisma.pollVotes.findMany({
          where: {
            pollId: id,
          },
          select: {
            vote: true,
          },
        });
        pollVotesResponse.map((vote) => {
          votesRegistry[id].votes.push(vote.vote);
        });
        return pollVotesResponse;
      } catch (error) {
        console.error('Error fetching all poll votes:', error);
        return;
      }
    })
  );

  setOptionVotes(votesRegistry, polls);
  setTotalVotes(polls);
  setPercentage(votesRegistry, polls);

  try {
    const parsedPolls = pollsWithResultsSchema.parse(polls);
    cache.set('allPollsVotes', parsedPolls, Number(process.env.CACHE_TIMEOUT));
    res.status(200).send(parsedPolls);
  } catch (error) {
    console.error('Error parsing allPolls:', error);
    return;
  }
}
