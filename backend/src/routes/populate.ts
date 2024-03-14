import express from 'express';
import { populatePollWithMockVotes } from '../controllers/populate/handlers/POST/populatePollWithMockVotes';

export const router = express.Router();

router.post('/:id', populatePollWithMockVotes);
