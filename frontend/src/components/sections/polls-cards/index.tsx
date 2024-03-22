'use client';

import { VotingCard } from '@/components/sections/polls-cards/components/voting-card';
import useSocketsPolls from '@/components/sections/polls-cards/useSocketsPolls';

export default function PollsCards() {
  const { allPolls, isConnected } = useSocketsPolls();
  const showPolls = isConnected && allPolls && allPolls.length > 0;

  return (
    <div className='flex flex-col gap-8 md:gap-8 w-full'>
      {showPolls && (
        <h1 className='text-2xl font-bold md:text-center'>Active Polls</h1>
      )}
      <div className='grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 '>
        {showPolls &&
          allPolls.map((poll, index) => (
            <VotingCard key={index} content={poll} />
          ))}
      </div>
    </div>
  );
}
