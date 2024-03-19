'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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

interface VotingProps {
  id: string;
  question: string;
  options: string[];
}
interface VotingCardProps {
  content: VotingProps;
}

export function VotingCard({ content }: VotingCardProps) {
  //   console.log('content:', content);
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
    console.log(data);
    const bodyPayload = {
      vote: data.option,
    };

    console.log('bodyPayload:', bodyPayload);

    const response = await fetch(`http://localhost:3000/vote/${data.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyPayload),
    });

    if (!response.ok) {
      console.error('Alexy Error:', response.status, response.statusText);
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
  }

  return (
    <Card className='p-6'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-2/3 space-y-6'
        >
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
                        className='flex items-center space-x-3 space-y-0'
                      >
                        <FormControl>
                          <RadioGroupItem value={index.toString()} />
                        </FormControl>
                        <FormLabel className='font-normal'>{option}</FormLabel>
                      </FormItem>
                    ))}
                    <input type='hidden' {...form.register('id')} />
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className='bg-sky-600 hover:bg-sky-700' type='submit'>
            Submit
          </Button>
        </form>
      </Form>
    </Card>
  );
}
