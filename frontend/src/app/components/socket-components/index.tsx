'use client';

import PollsCards from '@/app/components/polls-cards';
import useSocketData from '@/hooks/useSocketData';

export default function SocketComponents() {
  const { allPolls, allPollsVotes } = useSocketData();

  return <PollsCards allPolls={allPolls} allPollsVotes={allPollsVotes} />;
}
