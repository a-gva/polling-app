import { NextFunction, Request, Response } from 'express';

import path from 'path';
import { rootDir } from '../utils/path';

export const get404 = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
};
