import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { z } from 'zod';
import { pollSchema } from '../../schema';
import { getAllPolls } from '../GET/getAllPolls';

const prisma = new PrismaClient();

export async function createPoll(req: Request, res: Response) {
  try {
    const { name, question, options } = pollSchema.parse(req.body);

    const parsedDbPayload = {
      name: name as z.infer<typeof pollSchema>['name'],
      question: question as z.infer<typeof pollSchema>['question'],
      options: options as z.infer<typeof pollSchema>['options'],
    };
    await prisma.poll.create({
      data: {
        name: parsedDbPayload.name,
        question: parsedDbPayload.question,
        options: parsedDbPayload.options,
        created_at: new Date(),
      },
    });
    getAllPolls(req, res);
    console.log('🟩 Poll created!');
  } catch (err) {
    if (err instanceof z.ZodError) {
      const errorMessage = err.errors
        .map(
          (error) => `🔴 ERROR on "${error.path.join('.')}" - ${error.message}`
        )
        .join('\n');
      console.error(errorMessage);
      res.status(400).send(errorMessage);
    } else {
      console.error(`🔴 ERROR: ${err.message}`);
      res.status(400).send(`🔴 ERROR: ${err.message}`);
    }
  }
}
