'use client';

import { socket } from '@/app/socket';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

type NewPollFormInput = {
  question: string;
  mandatoryOptions: string[];
  nullableOptions?: string[];
};

export default function CreatePoll() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messageEvents, setMessageEvents] = useState<string[]>([]);

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

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('allPolls', (allPolls) => {
      console.log('allPolls:', allPolls);
    });
    socket.on('message', (message) => {
      const parsedMessage = JSON.parse(message);
      console.log('CLIENT - Message:', parsedMessage);
      console.log('CLIENT - Sender:', socket.id);
    });

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('message', onMessageEvent);
    };
  }, []);

  useEffect(() => {
    let userId = localStorage.getItem('userId');
    if (!userId) {
      const newUserId = uuidv4();
      localStorage.setItem('userId', newUserId);
    }
  }, []);

  const newPollSchema = z.object({
    question: z
      .string()
      .min(2, { message: 'Minimum 2 characters ' })
      .max(96, { message: 'Maximum 96 characters' }),
    nullableOptions: z
      .array(
        z
          .string()
          .refine(
            (option) =>
              option === null || option.length === 0 || option.length >= 2,
            {
              message: 'Optional, but minimum is 2 characters',
            }
          )
          .refine(
            (option) =>
              option === null || option.length === 0 || option.length <= 32,
            {
              message: 'Optional, but maximum is 32 characters',
            }
          )
      )
      .optional()
      .nullable(),
    mandatoryOptions: z
      .array(
        z
          .string()
          .min(2, { message: 'Minimum 2 characters' })
          .max(32, { message: 'Maximum 32 characters' })
      )
      .nonempty(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPollFormInput>({
    resolver: zodResolver(newPollSchema),
  });
  const onSubmit: SubmitHandler<NewPollFormInput> = async (data) => {
    let options = [...data.mandatoryOptions];

    if (data.nullableOptions) {
      data.nullableOptions.map((option) => {
        if (!option) {
          return;
        }
        options.push(option);
      });
    }

    const parsedPayload = {
      question: data.question,
      options: options,
    };

    const response = await fetch('http://localhost:3000/poll', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parsedPayload),
    });

    if (!response.ok) {
      console.error('Error:', response.status, response.statusText);
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-full'>
      <div className='flex flex-row w-full '>
        <div className='flex flex-col w-5/6 '>
          <label>New Poll Question</label>
          <textarea
            {...register('question', { required: true })}
            className='border border-slate-300 rounded'
            placeholder='What is your favorite color?'
          />
        </div>

        <div className='flex items-end justify-end w-1/6'>
          <Button className='bg-green-700 hover:bg-green-800'>
            <input className='cursor-pointer' type='submit' value='Create' />
          </Button>
        </div>
      </div>
      {errors.question && (
        <ErrorMessage>{`${errors.question.message}`}</ErrorMessage>
      )}
      <div className='flex flex-row w-full mt-4 gap-4'>
        <div className='flex flex-col w-full gap-2'>
          <div className='flex flex-col'>
            <label>Option 1</label>
            <input
              {...register(`mandatoryOptions.${0}`, { required: true })}
              className='border border-slate-300 rounded h-8'
            />
            {errors.mandatoryOptions && errors.mandatoryOptions[0] && (
              <ErrorMessage>{`${errors.mandatoryOptions[0].message}`}</ErrorMessage>
            )}
          </div>
          <div className='flex flex-col'>
            <label>Option 2</label>
            <input
              {...register(`mandatoryOptions.${1}`, { required: true })}
              className='border border-slate-300 rounded h-8'
            />
            {errors.mandatoryOptions && errors.mandatoryOptions[1] && (
              <ErrorMessage>{`${errors.mandatoryOptions[1].message}`}</ErrorMessage>
            )}{' '}
          </div>
        </div>
        <div className='flex flex-col w-full gap-2'>
          <div className='flex flex-col'>
            <label>Option 3 </label>
            <input
              {...register(`nullableOptions.${0}`)}
              className='border border-slate-300 rounded h-8'
              placeholder='Optional'
            />
            {errors.nullableOptions && errors.nullableOptions[0] && (
              <ErrorMessage>{`${errors.nullableOptions[0].message}`}</ErrorMessage>
            )}
          </div>
          <div className='flex flex-col'>
            <label>Option 4</label>
            <input
              {...register(`nullableOptions.${1}`)}
              className='border border-slate-300 rounded h-8'
              placeholder='Optional'
            />
            {errors.nullableOptions && errors.nullableOptions[1] && (
              <ErrorMessage>{`${errors.nullableOptions[1].message}`}</ErrorMessage>
            )}{' '}
          </div>
        </div>
      </div>
    </form>
  );
}

function ErrorMessage({ children }: { children?: React.ReactNode }) {
  return <span className='text-red-600 text-xs'>{children}</span>;
}
