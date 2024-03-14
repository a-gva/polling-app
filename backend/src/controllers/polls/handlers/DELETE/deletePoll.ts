import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { z } from 'zod';
import { dbPollId } from '../../schema';
import { getAllPolls } from '../GET/getAllPolls';

const prisma = new PrismaClient();

export async function deletePoll(req: Request, res: Response) {
  const { id } = req.params;
  const parsedId = Number(id) as z.infer<typeof dbPollId>['id'];

  if (isNaN(parsedId)) {
    res
      .status(400)
      .send(
        `Invalid Param ID: it should be a number. \n Received instead: "${id}" as ${typeof id}`
      );
    return;
  }

  try {
    await prisma.poll.delete({
      where: {
        id: parsedId,
      },
    });
    console.log(`🟩 Poll number "${parsedId}" deleted!`);
    getAllPolls(req, res);
  } catch (err) {
    res.status(404).send('Error!');
  }
}
