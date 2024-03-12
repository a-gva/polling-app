'use client';

import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

type NameInput = {
  name: string;
  email: string;
};

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters long',
    })
    .max(96, {
      message: 'Name must be at most 96 characters long',
    }),
  email: z
    .string()
    .email('Invalid email address')
    .transform((email) => email.trim().toLowerCase()),
});

export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<NameInput>({
    resolver: zodResolver(formSchema),
  });
  const onSubmit: SubmitHandler<NameInput> = (data) => console.log(data);

  return (
    <div className='flex flex-col w-1/2'>
      <form className='flex flex-col w-full' onSubmit={handleSubmit(onSubmit)}>
        <label>Name:</label>
        <input
          placeholder='name'
          className='border border-slate-300 rounded'
          {...register('name', { required: true })}
        />
        {errors.name && <span>{errors.name.message}</span>}
        <label>Email:</label>
        <input
          placeholder='email'
          className='border border-slate-300 rounded'
          {...register('email', { required: true })}
        />
        {errors.email && <span>{errors.email.message}</span>}

        <Button>
          <input type='submit' />
        </Button>
      </form>
    </div>
  );
}
