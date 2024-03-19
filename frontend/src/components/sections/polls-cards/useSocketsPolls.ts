import { pollsSchema } from '@/schema';
import { useSocket } from '@/socket/provider';
import { SinglePollProps } from '@/types';
import { useEffect, useState } from 'react';

export default function useSocketsPolls() {
  const socket = useSocket();
  console.log('Socket connected:', socket?.connected);

  const [isConnected, setIsConnected] = useState(socket?.connected);
  const [allPolls, setAllPolls] = useState<SinglePollProps[]>([]);

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

    function onNewPollCreated(message: string) {
      console.log('CLIENT: New poll created:', message);
    }

    if (socket) {
      socket.on('connect', onConnect);
      socket.on('disconnect', onDisconnect);
      socket.on('newPollCreated', onNewPollCreated);
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
  }, [socket]);

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
  return { isConnected, allPolls };
}
