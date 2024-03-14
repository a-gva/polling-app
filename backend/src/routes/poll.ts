import express from 'express';
import { deletePoll } from '../controllers/polls/handlers/DELETE/deletePoll';
import { getAllPolls } from '../controllers/polls/handlers/GET/getAllPolls';
import { getPollById } from '../controllers/polls/handlers/GET/getPollById';
import { updatePoll } from '../controllers/polls/handlers/PATCH/updatePoll';
import { createPoll } from '../controllers/polls/handlers/POST/createPoll';

export const router = express.Router();

router.post('/', createPoll);
router.delete('/:id', deletePoll);
router.get('/:id', getPollById);
router.get('/', getAllPolls);
router.patch('/:id', updatePoll);
