import { setOptionVotes, setPercentage, setTotalVotes } from './utils';

describe('utils', () => {
  let votesRegistry = {};
  let polls = {};

  votesRegistry = {
    'some-id': {
      votes: [0, 1, 1, 1, 2, 3, 3],
    },
    'alternate-id': {
      votes: [0, 0, 0, 1, 2, 3],
    },
  };

  polls = {
    'some-id': {
      votes: {
        '0': { totalVotes: 0, percentage: 0 },
        '1': { totalVotes: 0, percentage: 0 },
        '2': { totalVotes: 0, percentage: 0 },
        '3': { totalVotes: 0, percentage: 0 },
      },
      totalPollVotes: 0,
    },
    'alternate-id': {
      votes: {
        '0': { totalVotes: 0, percentage: 0 },
        '1': { totalVotes: 0, percentage: 0 },
        '2': { totalVotes: 0, percentage: 0 },
        '3': { totalVotes: 0, percentage: 0 },
      },
      totalPollVotes: 0,
    },
  };

  describe('setOptionVotes', () => {
    it('should increment totalVotes for each vote in votesRegistry', () => {
      setOptionVotes(votesRegistry, polls);

      expect(polls['some-id'].votes['0'].totalVotes).toBe(1);
      expect(polls['some-id'].votes['1'].totalVotes).toBe(3);
      expect(polls['some-id'].votes['2'].totalVotes).toBe(1);
      expect(polls['some-id'].votes['3'].totalVotes).toBe(2);
      expect(polls['alternate-id'].votes['0'].totalVotes).toBe(3);
      expect(polls['alternate-id'].votes['1'].totalVotes).toBe(1);
      expect(polls['alternate-id'].votes['2'].totalVotes).toBe(1);
      expect(polls['alternate-id'].votes['3'].totalVotes).toBe(1);
    });
  });

  describe('setTotalVotes', () => {
    it('should sum up totalVotes for each poll', () => {
      setTotalVotes(polls);

      expect(polls['some-id'].totalPollVotes).toBe(7);
      expect(polls['alternate-id'].totalPollVotes).toBe(6);
    });
  });

  describe('setPercentage', () => {
    it('should calculate the correct percentage for each vote', () => {
      setPercentage(votesRegistry, polls);

      expect(polls['some-id'].votes['0'].percentage).toBeCloseTo(14.29);
      expect(polls['some-id'].votes['1'].percentage).toBeCloseTo(42.86);
      expect(polls['some-id'].votes['2'].percentage).toBeCloseTo(14.29);
      expect(polls['some-id'].votes['3'].percentage).toBeCloseTo(28.57);
      expect(polls['alternate-id'].votes['0'].percentage).toBe(50);
      expect(polls['alternate-id'].votes['1'].percentage).toBe(16.67);
      expect(polls['alternate-id'].votes['2'].percentage).toBe(16.67);
      expect(polls['alternate-id'].votes['3'].percentage).toBe(16.67);
    });
  });
});
