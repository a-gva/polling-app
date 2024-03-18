import { pollsSwagger } from '../controllers/polls/swagger-polls';
import { populateSwagger } from '../controllers/populate/swagger-populate';

export const swaggerDocsData = { ...pollsSwagger, ...populateSwagger };
