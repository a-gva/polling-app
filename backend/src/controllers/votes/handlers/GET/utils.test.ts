import { setOptionVotes } from './utils';

describe('setOptionVotes', () => {
  it('should increment totalVotes for each vote in votesRegistry', () => {
    const votesRegistry = {
      mockPoll: {
        votes: ['0', '1', '1', '1', '2', '3', '3'],
      },
    };

    const polls = {
      mockPoll: {
        votes: {
          '0': { totalVotes: 0, percentage: 0 },
          '1': { totalVotes: 0, percentage: 0 },
          '2': { totalVotes: 0, percentage: 0 },
          '3': { totalVotes: 0, percentage: 0 },
        },
        totalPollVotes: 0,
      },
    };

    setOptionVotes(votesRegistry, polls);

    expect(polls.mockPoll.votes['0'].totalVotes).toBe(1);
    expect(polls.mockPoll.votes['1'].totalVotes).toBe(3);
    expect(polls.mockPoll.votes['2'].totalVotes).toBe(1);
    expect(polls.mockPoll.votes['3'].totalVotes).toBe(2);
  });
});
