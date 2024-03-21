import { Poll } from '@prisma/client';
import { Request, Response } from 'express';
import { cache } from '../../../../cache/provider';
import prisma from '../../../../prisma';

export async function getAllPolls(req: Request, res: Response) {
  try {
    let allPolls: Poll[] = cache.get('allPolls');

    if (!allPolls) {
      console.log('🏋️ Fetching all polls from DB... \n');
      allPolls = await new Promise((resolve) =>
        setTimeout(async () => {
          const polls = await prisma.poll.findMany({
            orderBy: {
              id: 'asc',
            },
          });
          cache.set('allPolls', polls, process.env.CACHE_TIMEOUT);
          console.log('🟢 All polls fetched from DB \n');
          resolve(polls);
        }, 10)
      );
    }
    res.status(200).send(allPolls);
  } catch (err) {
    console.error(`🔴 ERROR: ${err.message}`);
    res.status(400).send(`🔴 ERROR: ${err.message}`);
  }
}
