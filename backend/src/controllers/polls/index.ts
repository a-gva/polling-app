import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

async function returnUpdatedPollList(req: Request, res: Response) {
  const allPolls = await prisma.poll.findMany();
  res.status(200).send(allPolls);
}

//CREATE
export async function createPoll(req: Request, res: Response) {
  const { name, question, options } = req.body;

  try {
    const poll = await prisma.poll.create({
      data: {
        name: name as string,
        question: question as string,
        options: options,
        created_at: new Date(),
      },
    });
    returnUpdatedPollList(req, res);
  } catch (err) {
    res.send(`🔴 ERROR: ${err.message}`);
  }
}

// // READ
// export async function getAllPolls(req: Request, res: Response) {
//   returnUpdatedPollList(req, res);
// }

// export async function getPollById(req: Request, res: Response) {
//   const inputId = req.params.id;
//   try {
//     const poll = await prisma.polls.findUnique({
//       where: {
//         id: Number(inputId) as number,
//       },
//     });
//     res.status(200).send(poll);
//   } catch (err) {
//     res.send(err.message);
//   }
// }

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
