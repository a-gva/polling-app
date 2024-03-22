import dotenv from 'dotenv';
import { Request, Response } from 'express';
import { z } from 'zod';
import { cache } from '../../../../cache/provider';
import prisma from '../../../../prisma';
import { pollSchema } from '../../../../schema';

dotenv.config();

export async function getPollById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const parsedId = id as z.infer<typeof pollSchema>['id'];

    let poll = cache.get(`poll_${parsedId}`);

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
        }, Number(process.env.DB_ROUNDTRIP_TIMEOUT))
      );

      if (poll) {
        cache.set(`poll_${parsedId}`, poll, Number(process.env.CACHE_TIMEOUT));
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
