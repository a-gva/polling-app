import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { z } from 'zod';
import { dbPollId, pollSchema } from '../../schema';
import { getPollById } from '../GET/getPollById';

const prisma = new PrismaClient();

export async function updatePoll(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const parsedId = Number(id) as z.infer<typeof dbPollId>['id'];

    if (isNaN(parsedId)) {
      res
        .status(400)
        .send(
          `Invalid Param ID: it should be a number. \n Received instead: "${id}" as ${typeof id}`
        );
      return;
    }

    const { name, question, options } = req.body;
    const parsedName = name as z.infer<typeof pollSchema>['name'];
    const parsedQuestion = question as z.infer<typeof pollSchema>['question'];
    const parsedOptions = options as z.infer<typeof pollSchema>['options'];

    const updatedPoll = await prisma.poll.update({
      where: {
        id: parsedId,
      },
      data: {
        name: parsedName,
        question: parsedQuestion,
        options: parsedOptions,
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
