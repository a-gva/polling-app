'use client';

import { newPollSchemaValidation } from '@/app/components/create-poll/form-validation';
import { onSubmitForm } from '@/app/components/create-poll/on-submit-form';
import { Button } from '@/components/ui/button';
import { NewPollFormInputSchemaProps } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export default function CreatePoll() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPollFormInputSchemaProps>({
    resolver: zodResolver(newPollSchemaValidation),
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className='flex flex-col w-full'
    >
      <div className='flex flex-row w-full gap-8'>
        <div className='flex flex-col w-5/6 gap-4'>
          <label className='font-bold text-lg'>New Poll Question</label>
          <textarea
            {...register('question', { required: true })}
            className='border border-slate-300 rounded p-2'
            placeholder='What is your favorite color?'
          />
        </div>
        <div className='flex items-end justify-end w-1/6'>
          <Button className='bg-green-700 hover:bg-green-800'>
            <input
              className='cursor-pointer'
              type='submit'
              value='Create'
              data-cy={'form-submit'}
            />
          </Button>
        </div>
      </div>
      {errors.question && (
        <ErrorMessage>{`${errors.question.message}`}</ErrorMessage>
      )}
      <div className='flex flex-col md:flex-row w-full mt-4 gap-2 md:gap-4'>
        <div className='flex flex-col w-full gap-2'>
          <div className='flex flex-col'>
            <label htmlFor='option1'>Option 1</label>
            <input
              id='option1'
              {...register(`mandatoryOptions.${0}`, { required: true })}
              className='border border-slate-300 rounded h8 p-2'
            />
            {errors.mandatoryOptions && errors.mandatoryOptions[0] && (
              <ErrorMessage>{`${errors.mandatoryOptions[0].message}`}</ErrorMessage>
            )}
          </div>
          <div className='flex flex-col'>
            <label htmlFor='option2'>Option 2</label>
            <input
              id='option2'
              {...register(`mandatoryOptions.${1}`, { required: true })}
              className='border border-slate-300 rounded h8 p-2'
            />
            {errors.mandatoryOptions && errors.mandatoryOptions[1] && (
              <ErrorMessage>{`${errors.mandatoryOptions[1].message}`}</ErrorMessage>
            )}{' '}
          </div>
        </div>
        <div className='flex flex-col w-full gap-2'>
          <div className='flex flex-col'>
            <label htmlFor='option3'>Option 3 </label>
            <input
              id='option3'
              {...register(`nullableOptions.${0}`)}
              className='border border-slate-300 rounded h8 p-2'
              // placeholder='Optional'
            />
            {errors.nullableOptions && errors.nullableOptions[0] && (
              <ErrorMessage>{`${errors.nullableOptions[0].message}`}</ErrorMessage>
            )}
          </div>
          <div className='flex flex-col'>
            <label htmlFor='option4'>Option 4</label>
            <input
              id='option4'
              {...register(`nullableOptions.${1}`)}
              className='border border-slate-300 rounded h8 p-2'
              // placeholder='Optional'
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
