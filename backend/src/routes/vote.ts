import express from 'express';
import { getAllVotes } from '../controllers/votes/handlers/GET/getAllVotes';
import { getVotes } from '../controllers/votes/handlers/GET/getVotes';
import { createVote } from '../controllers/votes/handlers/POST/createVote';

export const router = express.Router();

router.post('/:id', createVote);
router.get('/', getAllVotes);
router.get('/:id', getVotes);
