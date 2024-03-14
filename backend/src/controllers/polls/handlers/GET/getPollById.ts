import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import NodeCache from 'node-cache';
import { z } from 'zod';
import { pollSchema } from '../../../schema';

const prisma = new PrismaClient();
const myCache = new NodeCache();

export async function getPollById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const parsedId = id as z.infer<typeof pollSchema>['id'];

    let poll = myCache.get(`poll_${parsedId}`);

    if (!poll) {
      console.log(`🔴 Poll "${parsedId}" not found in cache...`);
      console.log(`🔴 Fetching poll "${parsedId}" from DB...`);

      poll = await new Promise((resolve) =>
        setTimeout(async () => {
          const pollFromDB = await prisma.poll.findUnique({
            where: {
              id: parsedId,
            },
          });
          resolve(pollFromDB);
        }, 1000)
      );

      if (poll) {
        myCache.set(
          `poll_${parsedId}`,
          poll,
          Number(process.env.CACHE_TIMEOUT)
        );
        console.log(
          `🟢 Poll "${parsedId}" fetched from DB and stored in cache!`
        );
      } else {
        console.log(`🔴 Poll "${parsedId}" not found in DB...`);
      }
    } else {
      console.log(`🟢 Poll "${parsedId}" found in cache!`);
    }
    res.status(200).send(poll);
  } catch (err) {
    res.send(err.message);
  }
}
