import express from 'express';
import { pollControllers } from '../controllers/polls';

export const router = express.Router();

const { createPoll, deletePoll, getAllPolls, getPollById, updatePoll } =
  pollControllers;

// CREATE
router.post('/', createPoll);
// DELETE
router.delete('/:id', deletePoll);
// READ
router.get('/:id', getPollById);
// READ ALL
router.get('/', getAllPolls);
// UPDATE
router.patch('/:id', updatePoll);
