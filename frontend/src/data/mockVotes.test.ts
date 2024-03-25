import { beatlesMembers, generateMockVotes } from '@/data/mockVotes';
import { expect } from '@jest/globals';

describe('mockVotes', () => {
  it('should return an array of votes', () => {
    const result1 = generateMockVotes(10, beatlesMembers);
    expect(result1).toHaveLength(10);
    const result2 = generateMockVotes(50, beatlesMembers);
    expect(result2).toHaveLength(50);
  });
});
