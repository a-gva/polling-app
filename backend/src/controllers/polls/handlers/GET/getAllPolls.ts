import { Polls } from '@prisma/client';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import { cache } from '../../../../cache/provider';
import prisma from '../../../../prisma';

dotenv.config();

export async function getAllPolls(req: Request, res: Response) {
  try {
    let allPolls: Polls[] = cache.get('allPolls');

    if (!allPolls) {
      console.log('🏋️ Fetching all polls from DB... \n');
      allPolls = await new Promise((resolve) =>
        setTimeout(async () => {
          const polls = await prisma.polls.findMany({
            orderBy: {
              id: 'asc',
            },
          });
          cache.set('allPolls', polls, process.env.CACHE_TIMEOUT);
          console.log('🟢 All polls fetched from DB \n');
          resolve(polls);
        }, Number(process.env.DB_ROUNDTRIP_TIMEOUT))
      );
    }
    res.status(200).send(allPolls);
  } catch (err) {
    console.error(`🔴 ERROR: ${err.message}`);
    res.status(400).send(`🔴 ERROR: ${err.message}`);
  }
}
