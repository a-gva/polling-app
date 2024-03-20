import { Request } from 'express';

export const socketClient = (req: Request) => {
  return req.app.get('io');
};
