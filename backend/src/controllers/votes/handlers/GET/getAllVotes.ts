import { Request, Response } from 'express';
import { allPollsCached } from '../../../../cache';
import prisma from '../../../../prisma';
import { pollsWithResultsSchema } from '../../../../schema';
import { PollsWithResults, VotesRegistry } from '../../../../types';
import { setOptionVotes, setPercentage, setTotalVotes } from './utils';

export async function getAllVotes(req: Request, res: Response) {
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
    })
  );

  setOptionVotes(votesRegistry, polls);
  setTotalVotes(polls);
  setPercentage(votesRegistry, polls);

  try {
    const parsedPolls = pollsWithResultsSchema.parse(polls);
    res.status(200).send(parsedPolls);
  } catch (error) {
    console.error('Error parsing allPolls:', error);
    return;
  }
}
