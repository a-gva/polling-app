'use client';

import { VotingCard } from '@/components/sections/polls-cards/components/voting-card';
import { SinglePollProps, VotesRegistry } from '@/types';

type PollsCardsProps = {
  allPolls: SinglePollProps[] | null;
  allPollsVotes: VotesRegistry;
};

export default function PollsCards({
  allPolls,
  allPollsVotes,
}: PollsCardsProps) {
  if (!allPolls) {
    return;
  }

  console.log('2. allPolls:', allPolls);

  console.log(
    '2. allPollsVotes:',
    allPollsVotes['18ee7364-2774-4528-bdc0-9f1a953843da']
  );

  return (
    <div className='flex flex-col gap-8 md:gap-8 w-full'>
      <h1 className='text-2xl font-bold md:text-center'>Active Polls</h1>
      <div className='grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 '>
        {allPolls.map((poll: SinglePollProps, index) => (
          <VotingCard
            key={index}
            poll={poll}
            votes={allPollsVotes ? allPollsVotes[poll.id] : null}
          />
        ))}
      </div>
    </div>
  );
}
