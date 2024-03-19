import { NewPollFormInputSchemaProps } from '@/types';
import { SubmitHandler } from 'react-hook-form';

export const onSubmitForm: SubmitHandler<NewPollFormInputSchemaProps> = async (
  data
) => {
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

  console.log('Successful HTTP request: Poll created!');
};
