import express from 'express';
import { getVotes } from '../controllers/votes/handlers/GET/getVotes';
import { createVote } from '../controllers/votes/handlers/POST/createVote';

export const router = express.Router();

router.post('/:id', createVote);
router.get('/:id', getVotes);
