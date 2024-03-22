import express from 'express';
import { deleteAllPolls } from '../controllers/polls/handlers/DELETE/deleteAllPolls';
import { getAllPolls } from '../controllers/polls/handlers/GET/getAllPolls';

export const router = express.Router();

router.get('/', getAllPolls);
router.delete('/', deleteAllPolls);
