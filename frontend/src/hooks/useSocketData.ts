'use client';

import { socket } from '@/app/socket';
import { PollsProps, VotesRegistry } from '@/types';
import { useEffect, useState } from 'react';

export default function useSocketData() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [allPolls, setAllPolls] = useState<PollsProps | null>([]);
  const [allPollsVotes, setAllPollsVotes] = useState<
    VotesRegistry | null | undefined
  >({});

  useEffect(() => {
    function onDisconnect() {
      console.log('🔴 Disconnected from the server');
      setIsConnected(false);
    }

    function onAllPollsEvent(allPolls: PollsProps) {
      console.log('1. allPolls', allPolls);
      setAllPolls(allPolls);
      // console.log('📊 allPolls:', allPolls);
    }
    function onAllPollsVotesEvent(allPollsVotes: VotesRegistry) {
      console.log('1. allPollsVotes', allPollsVotes);
      setAllPollsVotes(allPollsVotes);
    }

    socket.on('connect', () => {
      console.log('🟢 Connected to the server');
      setIsConnected(true);
      socket.emit('readyForData');
      console.log('📡 readyForData emitted');
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

  // useEffect(() => {
  //   if (isConnected === true) {
  //     socket.emit('readyForData');
  //     console.log('📡 readyForData emitted');
  //   }
  // }, [isConnected]);

  return { allPolls, allPollsVotes };
}
