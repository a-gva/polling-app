import { Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../../../../prisma';
import { pollSchema } from '../../../schema';
import { getPollById } from '../GET/getPollById';

export async function updatePoll(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const parsedId = id as z.infer<typeof pollSchema>['id'];

    const { name, question, options } = req.body;
    const parsedName = name as z.infer<typeof pollSchema>['name'];
    const parsedQuestion = question as z.infer<typeof pollSchema>['question'];
    const parsedOptions = options as z.infer<typeof pollSchema>['options'];
    const parsedOptionsLength = parsedOptions.length;

    const updatedPoll = await prisma.poll.update({
      where: {
        id: parsedId,
      },
      data: {
        name: parsedName,
        question: parsedQuestion,
        options: parsedOptions,
        options_length: parsedOptionsLength,
      },
    });

    if (!updatedPoll) {
      res.status(404).send('Poll not found.');
      return;
    }

    getPollById(req, res);
  } catch (err) {
    console.error(`🔴 ERROR: ${err.message}`);
    res.status(500).send('An error occurred while updating the poll.');
  }
}
