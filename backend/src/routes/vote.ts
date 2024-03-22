import express from 'express';
import { createVote } from '../controllers/vote/handlers/POST/createVote';

export const router = express.Router();

router.post('/:id', createVote);
