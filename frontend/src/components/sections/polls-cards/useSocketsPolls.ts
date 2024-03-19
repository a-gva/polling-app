import { pollsSchema } from '@/schema';
import { useSocket } from '@/socket/provider';
import { SinglePollProps } from '@/types';
import { useEffect, useState } from 'react';

export default function useSocketsPolls() {
  const socket = useSocket();
  console.log('Socket connected:', socket?.connected);

  const [isConnected, setIsConnected] = useState(socket?.connected);
  const [allPolls, setAllPolls] = useState<SinglePollProps[] | null>([]);
  const [lastCreatedPoll, setLastCreatedPoll] = useState('');

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
    };

    function onDisconnect() {
      setIsConnected(false);
      console.log('A user disconnected');
    }

    function onAllPollsEvent(polls: SinglePollProps[]) {
      setAllPolls(polls);
    }

    function onNewPollCreated(newPollId: string) {
      setLastCreatedPoll(newPollId);
      console.log('CLIENT: New poll:', newPollId);
    }

    function onAllPollsDeleted(message: string) {
      setLastCreatedPoll('');
      setAllPolls(null);
      console.log('CLIENT: New poll:', message);
    }

    if (socket) {
      socket.on('connect', onConnect);
      socket.on('disconnect', onDisconnect);
      socket.on('newPollCreated', onNewPollCreated);
      socket.on('allPollsDeleted', onAllPollsDeleted);
      socket.on('allPolls', (polls) => {
        try {
          const parsedAllPolls = pollsSchema.parse(polls);
          setAllPolls(parsedAllPolls);
        } catch (error) {
          console.error('Error parsing allPolls:', error);
        }
      });
    }

    return () => {
      if (socket) {
        socket.off('connect', onConnect);
        socket.off('disconnect', onDisconnect);
        socket.off('allPolls', onAllPollsEvent);
        socket.off('newPollCreated', onNewPollCreated);
      }
    };
  }, [socket, lastCreatedPoll]);

  useEffect(() => {
    console.log('CLIENT: Last created poll:', lastCreatedPoll);
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
  }, []);
  return { isConnected, allPolls };
}
