import { PollsWithResults, VotesRegistry } from '../../../../types';

export function setOptionVotes(
  votesRegistry: VotesRegistry,
  polls: PollsWithResults
) {
  Object.keys(votesRegistry).map((poll) => {
    votesRegistry[poll].votes.map((vote) => {
      polls[poll].votes[vote].totalVotes += 1;
    });
  });
}

export function setTotalVotes(polls: PollsWithResults) {
  Object.keys(polls).map((poll) => {
    Object.keys(polls[poll].votes).map((option) => {
      polls[poll].totalPollVotes += polls[poll].votes[option].totalVotes;
    });
  });
}

export function setPercentage(
  votesRegistry: VotesRegistry,
  polls: PollsWithResults
) {
  Object.keys(polls).map((poll) => {
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
}
