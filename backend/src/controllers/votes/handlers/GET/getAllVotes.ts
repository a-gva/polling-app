import { Request, Response } from 'express';
import { allPollsCached } from '../../../../cache';
import prisma from '../../../../prisma';

export async function getAllVotes(req: Request, res: Response) {
  let votesRegistry = {};
  let polls = {};

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

  const dbResponse = await Promise.all(
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

  // SET OPTION VOTES
  Object.keys(votesRegistry).map((poll) => {
    votesRegistry[poll].votes.map((vote) => {
      polls[poll].votes[vote].totalVotes += 1;
    });
  });

  // SET TOTAL VOTES
  Object.keys(polls).map((poll) => {
    Object.keys(polls[poll].votes).map((option) => {
      polls[poll].totalPollVotes += polls[poll].votes[option].totalVotes;
    });
  });

  // SET PERCENTAGE
  Object.keys(polls).map((poll, index) => {
    votesRegistry[poll].votes.map((vote) => {
      const resultPercentage =
        Math.round(
          ((polls[poll].votes[vote].totalVotes / polls[poll].totalPollVotes) *
            100 +
            Number.EPSILON) *
            100
        ) / 100;

      polls[poll].votes[vote].percentage = resultPercentage;
    });
  });

  res.status(200).send(polls);
}
