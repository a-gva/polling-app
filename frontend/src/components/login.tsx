'use client';

import { Button } from '@/components/ui/button';
import { SubmitHandler, useForm } from 'react-hook-form';

type NameInput = {
  name: string;
  email: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<NameInput>();
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
        {errors.name && <span>This field is required</span>}
        <label>Email:</label>
        <input
          placeholder='email'
          className='border border-slate-300 rounded'
          {...register('email', { required: true })}
        />
        {errors.email && <span>This field is required</span>}

        <Button>
          <input type='submit' />
        </Button>
      </form>
    </div>
  );
}
