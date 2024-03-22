import express from 'express';
import { deletePoll } from '../controllers/poll/handlers/DELETE/deletePoll';
import { getPollById } from '../controllers/poll/handlers/GET/getPollById';
import { updatePoll } from '../controllers/poll/handlers/PATCH/updatePoll';
import { createPoll } from '../controllers/poll/handlers/POST/createPoll';

export const router = express.Router();

router.post('/', createPoll);
router.delete('/:id', deletePoll);
router.get('/:id', getPollById);
router.patch('/:id', updatePoll);
