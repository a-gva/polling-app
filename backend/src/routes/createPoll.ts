import express from 'express';

export const router = express.Router();

import {
  createPoll,
  deletePoll,
  getPollById,
  updatePoll,
} from '../controllers/polls/index';

// CREATE
router.post('/', createPoll);
// DELETE
router.delete('/', deletePoll);
// READ
router.get('/:id', getPollById);
// UPDATE
router.patch('/:id', updatePoll);