import { Request, Response } from 'express';
import { allPollsCached } from '../../../../cache';
import prisma from '../../../../prisma';

export async function getAllVotes(req: Request, res: Response) {
  let polls = {};

  allPollsCached.map((poll) => {
    polls = {
      ...polls,
      [poll.id]: {
        votes: [],
        options: poll.options,
        currentCount: poll.options.reduce((acc, option, index) => {
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

  console.log('polls', polls);

  const dbResponse = await Promise.all(
    Object.keys(polls).map(async (id) => {
      const pollVotesResponse = await prisma.pollVotes.findMany({
        where: {
          pollId: id,
        },
        select: {
          vote: true,
        },
      });
      pollVotesResponse.map((vote) => {
        polls[id].votes.push(vote.vote);
      });
      return pollVotesResponse;
    })
  );

  Object.keys(polls).map((poll) => {
    polls[poll].votes.map((vote) => {
      polls[poll].currentCount[vote].totalVotes += 1;
    });
  });

  Object.keys(polls).map((poll) => {
    Object.keys(polls[poll].currentCount).map((option) => {
      polls[poll].totalPollVotes += polls[poll].currentCount[option].totalVotes;
    });
  });

  Object.keys(polls).map((poll, index) => {
    polls[poll].votes.map((vote) => {
      const resultPercentage =
        Math.round(
          ((polls[poll].currentCount[vote].totalVotes /
            polls[poll].totalPollVotes) *
            100 +
            Number.EPSILON) *
            100
        ) / 100;

      polls[poll].currentCount[vote].percentage = resultPercentage;
    });
  });

  res.status(200).send(polls);
}
