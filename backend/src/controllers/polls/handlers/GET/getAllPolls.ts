import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export async function getAllPolls(req: Request, res: Response) {
  try {
    const allPolls = await prisma.poll.findMany({
      orderBy: {
        id: 'asc',
      },
    });
    res.status(200).send(allPolls);
  } catch (err) {
    console.error(`🔴 ERROR: ${err.message}`);
    res.status(400).send(`🔴 ERROR: ${err.message}`);
  }
}
