import { pollsSwagger } from '../controllers/polls/swagger-polls';
import { populateSwagger } from '../controllers/populate/swagger-populate';
import { votesSwagger } from '../controllers/votes/swagger-votes';

export const swaggerDocsData = {
  ...pollsSwagger,
  ...populateSwagger,
  ...votesSwagger,
};
