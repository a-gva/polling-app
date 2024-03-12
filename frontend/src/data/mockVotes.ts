import { randomUUID } from 'crypto';

type BeatleMember = 'John' | 'Paul' | 'George' | 'Ringo';

export const beatlesMembers: BeatleMember[] = [
  'John',
  'Paul',
  'George',
  'Ringo',
];

export interface VotesSpecs {
  uuid: string;
  vote: BeatleMember;
}
export function generateMockVotes(size: number, voteOptions: BeatleMember[]) {
  let result = [];
  for (let i = 0; i < size; i++) {
    result.push({
      uuid: randomUUID(),
      vote: voteOptions[Math.floor(Math.random() * voteOptions.length)],
    });
  }
  return result;
}
