import { Request } from 'express';

export const socketClient = (req: Request) => {
  const io = req.app.get('io');
  return io;
};
