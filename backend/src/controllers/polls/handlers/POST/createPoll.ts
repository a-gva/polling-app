import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';
import { Request, Response } from 'express';
import { z } from 'zod';
import cache from '../../../../cache';
import { pollSchema } from '../../../schema';

const prisma = new PrismaClient();

export async function createPoll(req: Request, res: Response) {
  try {
    const id = randomUUID();
    req.body.id = id;
    const { name, question, options } = pollSchema.parse(req.body);

    const parsedDbPayload = {
      name: name as z.infer<typeof pollSchema>['name'],
      question: question as z.infer<typeof pollSchema>['question'],
      options: options as z.infer<typeof pollSchema>['options'],
      id: id as z.infer<typeof pollSchema>['id'],
    };

    const dbPollCreated = await prisma.poll.create({
      data: {
        id: parsedDbPayload.id,
        name: parsedDbPayload.name,
        question: parsedDbPayload.question,
        options: parsedDbPayload.options,
        created_at: new Date(),
        options_length: parsedDbPayload.options.length,
      },
    });

    if (dbPollCreated) {
      cache.set(`poll_${id}`, dbPollCreated);
      const cachedResult = cache.get(`poll_${id}`);
    }

    console.log('🟩 Poll created!');
    res.status(201).send(dbPollCreated); // Send the created poll in the response
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
