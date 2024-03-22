'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import useSocketsPolls from '@/components/sections/polls-cards/useSocketsPolls';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/components/ui/use-toast';
import { useState } from 'react';

interface VotingProps {
  id: string;
  question: string;
  options: string[];
}
interface VotingCardProps {
  content: VotingProps;
}

export function VotingCard({ content }: VotingCardProps) {
  const [hasSubmitedVote, setHasSubmitedVote] = useState(false);
  const { allPollsVotes, setAllPollsVotes } = useSocketsPolls();

  const { id, question, options } = content;
  const FormSchema = z.object({
    option: z
      .string()
      .transform((val) => parseInt(val))
      .refine((value) => !isNaN(value), {
        message: 'Option must be a number',
        path: ['option'],
      })
      .refine((value) => value >= 0 && value < options.length, {
        message: `Option must be between 0 and ${options.length - 1}`,
        path: ['option'],
      }),
    id: z.string(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: {
      id,
    },
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const bodyPayload = {
      vote: data.option,
    };

    const response = await fetch(`http://localhost:3000/vote/${data.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyPayload),
    });

    if (!response.ok) {
      console.error('Error:', response.status, response.statusText);
      return;
    }

    toast({
      title: 'Your vote was succesfully computed!',
      description: (
        <div className='flex mt-2 w-[340px] rounded-md bg-green-50 p-4 items-center justify-center'>
          <CheckCircleIcon style={{ fontSize: '5rem', color: 'green' }} />
        </div>
      ),
    });

    setHasSubmitedVote(true);
  }

  return (
    <Card className='p-6 lg:p-6 w-full'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <FormField
            control={form.control}
            name='option'
            render={({ field }) => (
              <FormItem className='flex flex-col space-y-3 gap-4'>
                <FormLabel className='text-xl font-bold'>{question}</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    className='flex flex-col space-y-1'
                  >
                    {options.map((option, index) => (
                      <FormItem
                        key={index}
                        className='flex items-center space-x-3 space-y-0 rounded-sm  relative'
                      >
                        <div
                          style={{
                            background: '#00000030',
                            width: allPollsVotes
                              ? `${allPollsVotes[id]?.votes[index].percentage}%`
                              : '0%',
                          }}
                          className='absolute left-0 top-0 bottom-0 rounded-sm'
                        />
                        <div className='relative z-10 flex space-x-3 h-8 items-center'>
                          <FormControl>
                            <RadioGroupItem
                              value={index.toString()}
                              aria-label={option}
                            />
                          </FormControl>
                          <FormLabel className='font-normal'>
                            {option}
                          </FormLabel>
                        </div>

                        {allPollsVotes &&
                          allPollsVotes[id]?.totalPollVotes > 0 && (
                            <p className='text-slate-500'>
                              {allPollsVotes[id]?.votes[index].percentage}%
                            </p>
                          )}
                      </FormItem>
                    ))}
                    <input type='hidden' {...form.register('id')} />
                  </RadioGroup>
                </FormControl>
                {allPollsVotes && allPollsVotes[id]?.totalPollVotes > 0 && (
                  <p className='tracking-tighter text-slate-600'>
                    Total votes: {allPollsVotes[id]?.totalPollVotes}
                  </p>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className='bg-sky-700 hover:bg-sky-800' type='submit'>
            Submit
          </Button>
        </form>
      </Form>
    </Card>
  );
}
