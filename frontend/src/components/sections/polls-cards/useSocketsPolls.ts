import { pollsSchema, pollsWithResultsSchema } from '@/schema';
import { useSocket } from '@/socket/provider';
import { SinglePollProps, VotesRegistry } from '@/types';
import { useEffect, useState } from 'react';

export default function useSocketsPolls() {
  const socket = useSocket();

  const [isConnected, setIsConnected] = useState(socket?.connected);
  const [allPolls, setAllPolls] = useState<SinglePollProps[] | null>([]);
  const [allPollsVotes, setAllPollsVotes] = useState<VotesRegistry | null>({});
  const [lastCreatedPoll, setLastCreatedPoll] = useState('');

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
    };

    function onDisconnect() {
      setIsConnected(false);
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
    }

    return () => {
      if (socket) {
        socket.off('connect', onConnect);
        socket.off('disconnect', onDisconnect);
        socket.off('newPollCreated', onNewPollCreated);
      }
    };
  }, [socket, lastCreatedPoll]);

  useEffect(() => {
    if (socket) {
      socket.on('allPolls', (dataBuffer) => {
        try {
          // Convert the ArrayBuffer to a Buffer
          const data = Buffer.from(dataBuffer);

          // Convert the Buffer to a string
          const dataString = data.toString('utf8');

          // Parse the string to a JavaScript object
          const parsedAllPolls = pollsSchema.parse(JSON.parse(dataString));

          setAllPolls(parsedAllPolls);
        } catch (error) {
          console.error('Error parsing allPolls:', error);
          return;
        }
      });

      socket.on('allPollsVotes', (dataBuffer) => {
        try {
          console.log('dataBuffer:', dataBuffer);

          // Convert the ArrayBuffer to a Buffer
          const data = Buffer.from(dataBuffer);

          // Convert the Buffer to a string
          const dataString = data.toString('utf8');

          // Parse the string to a JavaScript object
          const parsedAllPollsVotes = pollsWithResultsSchema.parse(
            JSON.parse(dataString)
          );

          setAllPollsVotes(parsedAllPollsVotes);
        } catch (error) {
          console.log('pollsVotes:', dataBuffer);
          console.log('Error parsing allPollsVotes:', error);
          return;
        }
      });

      return () => {
        socket.off('allPolls');
        socket.off('allPollsVotes');
      };
    }
  }, []);

  useEffect(() => {
    if (isConnected) {
      try {
        socket?.emit('readyForData');
      } catch (error) {
        console.error('Error emitting readyForData:', error);
      }
    }
  }, [isConnected, socket]);

  return { isConnected, allPolls, allPollsVotes, setAllPollsVotes };
}
