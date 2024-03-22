import { pollsSchema, pollsWithResultsSchema } from '@/schema';
import { useSocket } from '@/socket/provider';
import { PollsProps, SinglePollProps, VotesRegistry } from '@/types';
import { useCallback, useEffect, useState } from 'react';

export default function useSocketsPolls() {
  const socket = useSocket();

  const [isConnected, setIsConnected] = useState(socket?.connected);
  const [allPolls, setAllPolls] = useState<SinglePollProps[] | null>([]);
  const [allPollsVotes, setAllPollsVotes] = useState<VotesRegistry | null>({});
  const [lastCreatedPoll, setLastCreatedPoll] = useState('');

  const onConnect = useCallback(() => setIsConnected(true), []);
  const onDisconnect = useCallback(() => setIsConnected(false), []);
  const onNewPollCreated = useCallback(
    (newPollId: string) => setLastCreatedPoll(newPollId),
    []
  );
  const onAllPollsDeleted = useCallback(() => {
    setLastCreatedPoll('');
    setAllPolls(null);
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
        console.log('allPollsVotes:', allPollsVotes);
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

      if (isConnected) {
        socket.emit('readyForData');
      }

      return () => {
        socket.off('connect', onConnect);
        socket.off('disconnect', onDisconnect);
        socket.off('newPollCreated', onNewPollCreated);
        socket.off('allPollsDeleted', onAllPollsDeleted);
        socket.off('allPolls');
        socket.off('allPollsVotes');
      };
    }
  }, [
    socket,
    isConnected,
    onConnect,
    onDisconnect,
    onNewPollCreated,
    onAllPollsDeleted,
  ]);

  return { isConnected, allPolls, allPollsVotes, setAllPollsVotes };
}
