import { Request, Response } from 'express';
import prisma from '../../../../prisma';
import { getAllPolls } from '../GET/getAllPolls';

export async function deleteAllPolls(req: Request, res: Response) {
  try {
    await prisma.pollVotes.deleteMany();
    await prisma.poll.deleteMany();
    console.log(`🟩 Polls deleted!`);
    getAllPolls(req, res);
  } catch (err) {
    res.status(404).send('Error!:' + err);
  }
}
