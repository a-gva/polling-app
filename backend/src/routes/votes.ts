import express from 'express';
import { getAllVotes } from '../controllers/votes/handlers/GET/getAllVotes';
import { getVotes } from '../controllers/votes/handlers/GET/getVotes';

export const router = express.Router();

router.get('/', getAllVotes);
router.get('/:id', getVotes);
