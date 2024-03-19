import { z } from 'zod';

export const newPollSchemaValidation = z.object({
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
