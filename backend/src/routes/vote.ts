import express from 'express';
import { createVote } from '../controllers/votes/handlers/POST/createVote';

export const router = express.Router();

router.post('/:id', createVote);
