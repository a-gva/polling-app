import { randomUUID } from 'crypto';
import { Request, Response } from 'express';
import { z } from 'zod';
import cache, {
  allPollsCached,
  cachePolls,
  clearPollsCache,
} from '../../../../cache';
import prisma from '../../../../prisma';
import { pollSchema } from '../../../schema';

export async function createPoll(req: Request, res: Response) {
  try {
    const id = randomUUID();
    req.body.id = id;
    const { question, options } = pollSchema.parse(req.body);

    const parsedDbPayload = {
      question: question as z.infer<typeof pollSchema>['question'],
      options: options as z.infer<typeof pollSchema>['options'],
      id: id as z.infer<typeof pollSchema>['id'],
    };

    const dbPollCreated = await prisma.poll.create({
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
      console.log(cache.get('allPolls'));
      const io = req.app.get('io');
      io.emit('newPollCreated', 'SERVER: A new poll has been created!');
      console.log('SERVER - AFTER IO: Poll created!');
    }

    console.log('🟩 SERVER: Poll created!');
    clearPollsCache();
    console.log('SERVER: Polls Cache cleared');
    cachePolls();
    console.log('SERVER: Polls Cached');
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
