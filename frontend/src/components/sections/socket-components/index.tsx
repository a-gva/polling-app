'use client';

import { socket } from '@/app/socket';
import PollsCards from '@/components/sections/polls-cards';
import { PollsProps, VotesRegistry } from '@/types';
import { useEffect, useState } from 'react';

export default function SocketComponents() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [allPolls, setAllPolls] = useState<PollsProps[]>([]);
  const [allPollsVotes, setAllPollsVotes] = useState<VotesRegistry>({});

  useEffect(() => {
    function onDisconnect() {
      console.log('🔴 Disconnected from the server');
      setIsConnected(false);
    }

    function onAllPollsEvent(allPolls: PollsProps[]) {
      console.log('1️⃣', allPolls);
      setAllPolls((previous: PollsProps[] | null) => {
        if (previous === null) {
          return allPolls;
        } else {
          return [...previous, ...allPolls];
        }
      });
    }
    function onAllPollsVotesEvent(allPollsVotes: VotesRegistry) {
      console.log('2️⃣', allPollsVotes);
      setAllPollsVotes((previous: VotesRegistry) => {
        if (previous === null) {
          return allPollsVotes;
        } else {
          return { ...previous, ...allPollsVotes };
        }
      });
    }

    socket.on('connect', () => {
      console.log('🟢 Connected to the server');
      setIsConnected(true);
    });
    socket.on('disconnect', onDisconnect);
    socket.on('allPolls', onAllPollsEvent);
    socket.on('allPollsVotes', onAllPollsVotesEvent);

    return () => {
      socket.off('connect');
      socket.off('disconnect', onDisconnect);
      socket.off('allPolls', onAllPollsEvent);
      socket.off('allPollsVotes', onAllPollsVotesEvent);
    };
  }, []);

  useEffect(() => {
    if (isConnected === true) {
      socket.emit('readyForData');
      console.log('📡 readyForData emitted');
    }
  }, [isConnected]);

  return (
    <div className='App'>
      {/* <ConnectionState isConnected={isConnected} /> */}
      {/* <ConnectionManager /> */}
      <PollsCards allPolls={allPolls} />
    </div>
  );
}
