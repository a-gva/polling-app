'use client';

import { pollsSchema, pollsWithResultsSchema } from '@/schema';
import { useSocket } from '@/socket/provider';
import { PollsProps, SinglePollProps, VotesRegistry } from '@/types';
import { useCallback, useEffect, useState } from 'react';

export default function useSocketsPolls() {
  const socket = useSocket();

  const [isConnected, setIsConnected] = useState(false); // Initialize as false
  const [allPolls, setAllPolls] = useState<SinglePollProps[] | null>([]);
  const [allPollsVotes, setAllPollsVotes] = useState<VotesRegistry | null>({});
  const [lastCreatedPoll, setLastCreatedPoll] = useState('');

  const onConnect = useCallback(() => {
    setIsConnected(true); // Set isConnected to true when the socket is connected
    socket.emit('readyForData'); // Emit readyForData when the socket is connected
  }, [socket]);
  const onDisconnect = useCallback(() => setIsConnected(false), []); // Set isConnected to false when the socket is disconnected
  const onNewPollCreated = useCallback(
    (newPollCreated: PollsProps) =>
      console.log('newPollCreated', newPollCreated),
    []
  );
  const onAllPollsDeleted = useCallback(() => {
    setLastCreatedPoll('');
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('connect', onConnect);
      socket.on('disconnect', onDisconnect);
      socket.on('newPollCreated', onNewPollCreated);
      socket.on('allPollsDeleted', onAllPollsDeleted);

      socket.on('allPolls', (allPolls: PollsProps[]) => {
        const parsedAllPolls = pollsSchema.safeParse(allPolls);
        if (parsedAllPolls.success) {
          setAllPolls(parsedAllPolls.data);
        } else {
          console.error('Error parsing allPolls:', parsedAllPolls.error);
        }
      });

      socket.on('allPollsVotes', (allPollsVotes: VotesRegistry) => {
        const parsedAllPollsVotes =
          pollsWithResultsSchema.safeParse(allPollsVotes);
        if (parsedAllPollsVotes.success) {
          setAllPollsVotes(parsedAllPollsVotes.data);
        } else {
          console.error(
            'Error parsing allPollsVotes:',
            parsedAllPollsVotes.error
          );
        }
      });

      return () => {
        socket.off('connect', onConnect);
        socket.off('disconnect', onDisconnect);
        socket.off('newPollCreated', onNewPollCreated);
        socket.off('allPollsDeleted', onAllPollsDeleted);
        socket.off('allPolls');
        socket.off('allPollsVotes');
      };
    }
  }, [socket, onConnect, onDisconnect, onNewPollCreated, onAllPollsDeleted]);

  useEffect(() => {
    console.log('allPolls state:', allPolls);
  }, [allPolls]);
  useEffect(() => {
    console.log('isConnected state:', isConnected);
  }, [isConnected]);
  useEffect(() => {
    console.log('socket state:', socket);
  }, [socket]);

  return { isConnected, allPolls, allPollsVotes, setAllPollsVotes };
}
