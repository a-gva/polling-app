import express, { Request, Response } from 'express';
import request from 'supertest';

jest.mock('../../routes/polls', () => {
  return (req: Request, res: Response) => {
    res.status(200).json({ data: 'mock data' });
  };
});

const app = express();
app.use('/polls', require('../../routes/polls'));

describe('GET /polls', () => {
  it('responds with json', async () => {
    const response = await request(app)
      .get('/polls')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual({ data: 'mock data' });
  });
});
