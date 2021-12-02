import { Request, Response } from 'express';

import { Controller } from '@/presentation/contracts';

export const adaptRoute = (controller: Controller) => {
  return async (request: Request, response: Response): Promise<any> => {
    const httpRequest = {
      ...(request.body || {}),
      ...(request.params || {}),
      accountId: request.accountId,
    };
    const httpResponse = await controller.handle(httpRequest);
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      return response.status(httpResponse.statusCode).json(httpResponse.body);
    } else {
      return response.status(httpResponse.statusCode).json({
        error: httpResponse.body.message,
      });
    }
  };
};
