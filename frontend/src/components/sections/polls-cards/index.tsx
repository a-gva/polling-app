'use client';

import { VotingCard } from '@/components/sections/polls-cards/components/voting-card';
import { SinglePollProps } from '@/types';

type PollsCardsProps = {
  allPolls: SinglePollProps[] | null;
};

export default function PollsCards({ allPolls }: PollsCardsProps) {
  if (!allPolls) {
    return;
  }
  return (
    <div className='flex flex-col gap-8 md:gap-8 w-full'>
      <h1 className='text-2xl font-bold md:text-center'>Active Polls</h1>
      <div className='grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 '>
        {allPolls.map((poll: SinglePollProps, index) => (
          <VotingCard
            key={index}
            id={poll.id}
            question={poll.question}
            options={poll.options}
          />
        ))}
      </div>
    </div>
  );
}
