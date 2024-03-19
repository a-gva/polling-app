'use client';

import { VotingCard } from '@/components/sections/polls-cards/components/voting-card';
import useSocketsPolls from '@/components/sections/polls-cards/useSocketsPolls';

export default function PollsCards() {
  const { allPolls, isConnected } = useSocketsPolls();
  const showPolls = isConnected;

  return (
    <div className='flex flex-col'>
      <div className='grid grid-cols-3 gap-2'>
        {showPolls &&
          allPolls.map((poll, index) => (
            <VotingCard key={index} content={poll} />
          ))}
      </div>
    </div>
  );
}
