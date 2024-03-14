import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { z } from 'zod';
import { dbPollId } from '../../schema';

const prisma = new PrismaClient();

export async function getPollById(req: Request, res: Response) {
  try {
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

    const poll = await prisma.poll.findUnique({
      where: {
        id: parsedId,
      },
    });
    res.status(200).send(poll);
  } catch (err) {
    res.send(err.message);
  }
}
