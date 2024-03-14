import express from 'express';
import { pollControllers } from '../controllers/polls';

export const router = express.Router();

const { createPoll, deletePoll, getAllPolls, getPollById, updatePoll } =
  pollControllers;

router.post('/', createPoll);
router.delete('/:id', deletePoll);
router.get('/:id', getPollById);
router.get('/', getAllPolls);
router.patch('/:id', updatePoll);
