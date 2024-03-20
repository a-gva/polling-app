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
        currentCount: {},
      },
    };
  });

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

  Object.keys(polls).map((poll, index) => {
    let pollVotesCount = {};
    polls[poll].votes.map((vote) => {
      if (pollVotesCount[vote] === undefined) {
        pollVotesCount[vote] = { absolute: 1 };
      } else {
        pollVotesCount[vote].absolute += 1;
      }
    });
    polls[poll].currentCount = pollVotesCount;
    // polls[poll].currentCount[index] = Object.keys(pollVotesCount).map(
    //   (option) => {
    //     return {
    //       option,
    //       percentage:
    //         Math.round(
    //           ((pollVotesCount[option] / polls[poll].votes.length) * 100 +
    //             Number.EPSILON) *
    //             100
    //         ) / 100,
    //     };
    //   }
    // );
  });

  // output = output.map((option, index) => {
  //   return { ...option, count: myMap.get(index) };
  // });

  res.status(200).send(polls);
}
