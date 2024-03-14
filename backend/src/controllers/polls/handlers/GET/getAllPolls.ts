import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import NodeCache from 'node-cache';

const prisma = new PrismaClient();
const myCache = new NodeCache();

export async function getAllPolls(req: Request, res: Response) {
  try {
    let allPolls = myCache.get('allPolls');

    if (!allPolls) {
      console.log('Fetching all polls from DB...');
      allPolls = await new Promise((resolve) =>
        setTimeout(async () => {
          const polls = await prisma.poll.findMany({
            orderBy: {
              id: 'asc',
            },
          });
          myCache.set('allPolls', polls, process.env.CACHE_TIMEOUT);
          resolve(polls);
        }, 1000)
      );
    }
    res.status(200).send(allPolls);
  } catch (err) {
    console.error(`🔴 ERROR: ${err.message}`);
    res.status(400).send(`🔴 ERROR: ${err.message}`);
  }
}
