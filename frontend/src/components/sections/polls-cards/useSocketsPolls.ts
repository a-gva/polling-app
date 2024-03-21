import { pollsSchema, pollsWithResultsSchema } from '@/schema';
import { useSocket } from '@/socket/provider';
import { PollsProps, SinglePollProps, VotesRegistry } from '@/types';
import { useEffect, useState } from 'react';

export default function useSocketsPolls() {
  const socket = useSocket();

  const [isConnected, setIsConnected] = useState(socket?.connected);
  const [allPolls, setAllPolls] = useState<SinglePollProps[] | null>([]);
  const [allPollsVotes, setAllPollsVotes] = useState<VotesRegistry | null>({});
  const [lastCreatedPoll, setLastCreatedPoll] = useState('');

  useEffect(() => {
    if (socket?.connected !== isConnected) {
      console.log('Socket connected:', socket?.connected);
      setIsConnected(socket?.connected);
    }
  }, [isConnected, socket?.connected]);

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
    };

    function onDisconnect() {
      setIsConnected(false);
    }

    function onAllPollsEvent(polls: SinglePollProps[]) {
      setAllPolls(polls);
    }

    function onAllPollsVotesEvent(polls: SinglePollProps[]) {
      setAllPolls(polls);
    }

    function onNewPollCreated(newPollId: string) {
      setLastCreatedPoll(newPollId);
    }

    function onAllPollsDeleted(message: string) {
      setLastCreatedPoll('');
      setAllPolls(null);
    }

    if (socket) {
      socket.on('connect', onConnect);
      socket.on('disconnect', onDisconnect);
      socket.on('newPollCreated', onNewPollCreated);
      socket.on('allPollsDeleted', onAllPollsDeleted);
      socket.on('allPolls', (polls: PollsProps) => {
        try {
          console.log('🔴 Parsed allPolls:', polls);
          const parsedAllPolls = pollsSchema.parse(polls);
          setAllPolls(parsedAllPolls);
        } catch (error) {
          console.error('Error parsing allPolls:', error);
          return;
        }
      });
      socket.on('allPollsVotes', (pollsVotes: VotesRegistry) => {
        try {
          const parsedAllPollsVotes = pollsWithResultsSchema.parse(pollsVotes);
          console.log('🟢 Parsed allPollsVotes:', parsedAllPollsVotes);
          setAllPollsVotes(parsedAllPollsVotes);
        } catch (error) {
          console.log('pollsVotes:', pollsVotes);
          console.log('Error parsing allPollsVotes:', error);
          return;
        }
      });
    }

    return () => {
      if (socket) {
        socket.off('connect', onConnect);
        socket.off('disconnect', onDisconnect);
        socket.off('allPolls', onAllPollsEvent);
        socket.off('allPollsVotes', onAllPollsVotesEvent);
        socket.off('newPollCreated', onNewPollCreated);
      }
    };
  }, [socket, lastCreatedPoll]);

  // useEffect(() => {
  //   console.log('Updated allPollsVotes:', allPollsVotes);
  // }, [allPollsVotes]);

  useEffect(() => {
    if (isConnected) {
      try {
        socket?.emit('readyForData');
        console.log('===> readyForData emitted');
      } catch (error) {
        console.error('Error emitting readyForData:', error);
      }
    }
  }, [lastCreatedPoll, isConnected, socket]);

  useEffect(() => {
    if (isConnected) {
      try {
        socket?.emit('readyForData');
        console.log('===> readyForData emitted');
      } catch (error) {
        console.error('Error emitting readyForData:', error);
      }
    }
  }, [isConnected, socket]);

  return { isConnected, allPolls, allPollsVotes, setAllPollsVotes };
}
