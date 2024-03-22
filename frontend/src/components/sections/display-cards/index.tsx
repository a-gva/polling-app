'use client';

import PollsCards from '@/components/sections/polls-cards';
import useSocketsPolls from '@/components/sections/polls-cards/useSocketsPolls';

export default function DisplayCards() {
  const { allPolls, isConnected } = useSocketsPolls();
  const pollsAvailable = isConnected && allPolls && allPolls.length > 0;

  return (
    <>
      <PollsCards allPolls={allPolls} />
    </>
  );
}
