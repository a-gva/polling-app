import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';

import { routes } from './slugs';
import { rootDir } from './utils/path';

dotenv.config();
const port = process.env.PORT;

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(rootDir, 'public')));

// BOOK INDEX
routes.forEach((route) => {
  app.use(route.path, route.handler);
});

app.listen(`${port}`);
