import {
  badRequest,
  forbidden,
  notFound,
  serverError,
  unauthorized,
} from '@/main/docs/components/';
import { apiKeyAuthSchema } from '@/main/docs/schemas/';

export default {
  securitySchemes: {
    apiKeyAuth: apiKeyAuthSchema,
  },
  badRequest,
  forbidden,
  notFound,
  serverError,
  unauthorized,
};
