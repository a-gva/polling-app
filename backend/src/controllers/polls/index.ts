import { deletePoll } from './handlers/DELETE/deletePoll';
import { getAllPolls } from './handlers/GET/getAllPolls';
import { getPollById } from './handlers/GET/getPollById';
import { updatePoll } from './handlers/PATCH/updatePoll';
import { createPoll } from './handlers/POST/createPoll';

export const pollControllers = {
  createPoll,
  updatePoll,
  deletePoll,
  getAllPolls,
  getPollById,
};
