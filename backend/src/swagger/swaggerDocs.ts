import { pollSwagger } from '../controllers/poll/swagger-poll';
import { pollsSwagger } from '../controllers/polls/swagger-polls';
import { populateSwagger } from '../controllers/populate/swagger-populate';
import { voteSwagger } from '../controllers/vote/swagger-vote';
import { votesSwagger } from '../controllers/votes/swagger-votes';

export const swaggerDocsData = {
  ...pollSwagger,
  ...pollsSwagger,
  ...populateSwagger,
  ...voteSwagger,
  ...votesSwagger,
};
