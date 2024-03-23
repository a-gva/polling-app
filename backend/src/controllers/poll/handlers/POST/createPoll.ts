import { randomUUID } from 'crypto';
import { Request, Response } from 'express';
import { z } from 'zod';
import {
  allPollsCached,
  cachePolls,
  clearPollsCache,
  currentCachedPolls,
} from '../../../../cache/allPolls';
import { cache } from '../../../../cache/provider';
import prisma from '../../../../prisma';
import { pollSchema } from '../../../../schema';
import { socketClient } from '../../../../socket';

export async function createPoll(req: Request, res: Response) {
  const io = socketClient(req);

  try {
    const id = randomUUID();
    req.body.id = id;
    const { question, options } = pollSchema.parse(req.body);

    const parsedDbPayload = {
      question: question as z.infer<typeof pollSchema>['question'],
      options: options as z.infer<typeof pollSchema>['options'],
      id: id as z.infer<typeof pollSchema>['id'],
    };

    const dbPollCreated = await prisma.polls.create({
      data: {
        id: parsedDbPayload.id,
        question: parsedDbPayload.question,
        options: parsedDbPayload.options,
        created_at: new Date(),
        options_length: parsedDbPayload.options.length,
      },
    });

    if (dbPollCreated) {
      const allPolls = [...allPollsCached, dbPollCreated];
      cache.set('allPolls', allPolls, Number(process.env.CACHE_TIMEOUT));
      io.emit('newPollCreated', dbPollCreated);
    }

    clearPollsCache();
    await cachePolls();
    io.emit('allPolls', currentCachedPolls());
    console.log('🟢 IO - Updated/cached polls sent back to clients \n');
    res.status(201).send(currentCachedPolls());
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
