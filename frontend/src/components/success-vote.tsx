'use client';

import { mockPolls } from '@/components/mockPolls';
import { VotingCard } from '@/components/radio';
import { useSocket } from '@/socket/provider';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useEffect, useState } from 'react';
import { z } from 'zod';

export const pollsSchema = z.array(
  z.object({
    id: z.string(),
    question: z.string(),
    options: z.array(z.string()),
    votes: z.array(z.unknown()),
    created_at: z.string(),
    updated_at: z.string(),
    options_length: z.number(),
  })
);

export type PollsProps = z.infer<typeof pollsSchema>;

export default function SuccessVote() {
  const socket = useSocket();
  console.log('Socket connected:', socket?.connected);

  const [isConnected, setIsConnected] = useState(socket?.connected);
  const [messageEvents, setMessageEvents] = useState<string[]>([]);
  const [allPolls, setAllPolls] = useState<PollsProps>(mockPolls);

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
      console.log('Connected to socket.io');
    };

    function onDisconnect() {
      setIsConnected(false);
      console.log('A user disconnected');
    }

    function onMessageEvent(value: string) {
      console.log('value:', value);
      setMessageEvents((previous) => [...previous, value]);
    }

    function onAllPollsEvent(polls: PollsProps) {
      console.log('Received allPolls:', polls);
      // setAllPolls(polls);
    }

    if (socket) {
      socket.on('connect', onConnect);
      socket.on('disconnect', onDisconnect);
      socket.on('allPolls', (polls) => {
        try {
          const parsedAllPolls = pollsSchema.parse(polls);
          // setAllPolls(parsedAllPolls);
          console.log('CLIENT - polls:', parsedAllPolls);
          console.log('CLIENT - id:', socket.id);
        } catch (error) {
          console.error('Error parsing allPolls:', error);
        }
      });
      socket.on('message', (message) => {
        const parsedMessage = JSON.parse(message);
        console.log('CLIENT - Message:', parsedMessage);
        console.log('CLIENT - Sender:', socket.id);
      });
    }

    return () => {
      if (socket) {
        socket.off('connect', onConnect);
        socket.off('disconnect', onDisconnect);
        socket.off('allPolls', onAllPollsEvent);
        socket.off('message', onMessageEvent);
      }
    };
  }, [socket]);

  return (
    <div className='flex flex-col'>
      <div className='grid grid-cols-3'>
        {allPolls &&
          allPolls.length > 0 &&
          allPolls.map((poll, index) => (
            <VotingCard key={index} content={poll} />
          ))}
      </div>

      <div className='flex flex-col items-center'>
        <CheckCircleIcon style={{ fontSize: '10rem', color: 'green' }} />
        <span>Your vote was succesfully computed!</span>
        Check realtime results in <a href=''>link</a>
      </div>
    </div>
  );
}
