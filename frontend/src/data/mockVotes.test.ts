import { beatlesMembers, generateMockVotes } from '@/data/mockVotes';

describe('mockVotes', () => {
  it('should return an array of votes', () => {
    const result = generateMockVotes(10, beatlesMembers);
    expect(result).toHaveLength(10);
    const result2 = generateMockVotes(50, beatlesMembers);
    expect(result2).toHaveLength(50);
  });
});
