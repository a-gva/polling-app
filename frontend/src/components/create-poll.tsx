'use client';

import { socket } from '@/app/socket';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

type NewPollFormInput = {
  name: string;
  question: string;
  mandatoryOptions: string[];
  nullableOptions?: string[];
};

export default function CreatePoll() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState<string[]>([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value: string) {
      setFooEvents((previous) => [...previous, value]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('foo', onFooEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('foo', onFooEvent);
    };
  }, []);
  useEffect(() => {
    let userId = localStorage.getItem('userId');
    if (!userId) {
      userId = uuidv4();
      localStorage.setItem('userId', userId);
    }
  }, []);

  const newPollSchema = z.object({
    name: z
      .string()
      .min(2, { message: 'Name: minimum 2 characters ' })
      .max(64, { message: 'Name: maximum 64 characters ' }),
    question: z
      .string()
      .min(2, { message: 'Question: minimum 2 characters ' })
      .max(96, { message: 'Question: maximum 96 characters' }),
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
          .min(2, { message: 'Option: minimum 2 characters' })
          .max(32, { message: 'Option: maximum 32 characters' })
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
  const onSubmit: SubmitHandler<NewPollFormInput> = (data) => {
    const payload = {
      name: data.name,
      question: data.question,
      options: [...data.mandatoryOptions, ...(data.nullableOptions || [])],
    };
    console.log(payload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-row gap-6'>
      <div className='flex flex-col'>
        <label>Name</label>
        <input
          {...register('name', { required: true })}
          className='border border-slate-300 rounded'
        />
        {errors.name && <ErrorMessage>{`${errors.name.message}`}</ErrorMessage>}
        <label>Question</label>
        <input
          {...register('question', { required: true })}
          className='border border-slate-300 rounded'
        />
        {errors.question && (
          <ErrorMessage>{`${errors.question.message}`}</ErrorMessage>
        )}
      </div>
      <div className='flex flex-col'>
        <label>Option 1</label>
        <input
          {...register(`mandatoryOptions.${0}`, { required: true })}
          className='border border-slate-300 rounded'
        />
        {errors.mandatoryOptions && errors.mandatoryOptions[0] && (
          <ErrorMessage>{`${errors.mandatoryOptions[0].message}`}</ErrorMessage>
        )}
        <label>Option 2</label>
        <input
          {...register(`mandatoryOptions.${1}`, { required: true })}
          className='border border-slate-300 rounded'
        />
        {errors.mandatoryOptions && errors.mandatoryOptions[1] && (
          <ErrorMessage>{`${errors.mandatoryOptions[1].message}`}</ErrorMessage>
        )}{' '}
      </div>
      <div className='flex flex-col'>
        <label>Option 3</label>
        <input
          {...register(`nullableOptions.${0}`)}
          className='border border-slate-300 rounded'
        />
        {errors.nullableOptions && errors.nullableOptions[0] && (
          <ErrorMessage>{`${errors.nullableOptions[0].message}`}</ErrorMessage>
        )}
        <label>Option 4</label>
        <input
          {...register(`nullableOptions.${1}`)}
          className='border border-slate-300 rounded'
        />
        {errors.nullableOptions && errors.nullableOptions[1] && (
          <ErrorMessage>{`${errors.nullableOptions[1].message}`}</ErrorMessage>
        )}{' '}
      </div>

      <div className='flex flex-col items-center justify-center'>
        <Button>
          <input type='submit' />
        </Button>
      </div>
    </form>
  );
}

function ErrorMessage({ children }: { children?: React.ReactNode }) {
  return <span className='text-red-600 font-bold text-xs'>{children}</span>;
}
