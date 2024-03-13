import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { z } from 'zod';
import { dbPollId, pollSchema } from './schema';

const prisma = new PrismaClient();

async function returnUpdatedPollList(req: Request, res: Response) {
  const allPolls = await prisma.poll.findMany();
  res.status(200).send(allPolls);
}

//CREATE
export async function createPoll(req: Request, res: Response) {
  try {
    const { name, question, options } = pollSchema.parse(req.body);

    const parsedDbPayload = {
      name: name as z.infer<typeof pollSchema>['name'],
      question: question as z.infer<typeof pollSchema>['question'],
      options: options as z.infer<typeof pollSchema>['options'],
    };
    await prisma.poll.create({
      data: {
        name: parsedDbPayload.name,
        question: parsedDbPayload.question,
        options: parsedDbPayload.options,
        created_at: new Date(),
      },
    });
    returnUpdatedPollList(req, res);
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

// READ
// export async function getAllPolls(req: Request, res: Response) {
//   returnUpdatedPollList(req, res);
// }

export async function getPollById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    console.log('🟩 id:', id); //string
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

// // UPDATE
// export async function updatePoll(req: Request, res: Response) {
//   const inputId = req.params.id;
//   const { name } = req.query;
//   try {
//     const updatePoll = await prisma.polls.update({
//       where: {
//         id: Number(inputId) as number,
//       },
//       data: {
//         name: name as string,
//       },
//     });
//     returnUpdatedPollList(req, res);
//   } catch (err) {
//     res.status(404).send('Error!');
//   }
// }

// // DELETE
// export async function deletePoll(req: Request, res: Response) {
//   const { id } = req.query;

//   try {
//     const deletePoll = await prisma.polls.delete({
//       where: {
//         id: Number(id) as number,
//       },
//     });
//     returnUpdatedPollList(req, res);
//   } catch (err) {
//     res.status(404).send('Error!');
//   }
// }
