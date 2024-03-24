import { PrismaClient } from '@prisma/client';

const columnExists = async (
  prisma: PrismaClient,
  table: string,
  column: string
) => {
  const result = await prisma.$queryRaw`SELECT EXISTS (
      SELECT FROM information_schema.columns 
      WHERE  table_schema = 'public'
      AND    table_name   = ${table}
      AND    column_name  = ${column}
    );`;
  return result[0].exists;
};

describe('Database Connection', () => {
  let prisma: PrismaClient;

  beforeAll(() => {
    prisma = new PrismaClient();
    return prisma.$connect();
  });

  afterAll(() => {
    return prisma.$disconnect();
  });

  it('checks if Polls table exists and has proper columns', async () => {
    expect(await columnExists(prisma, 'Polls', 'id')).toBe(true);
    expect(await columnExists(prisma, 'Polls', 'question')).toBe(true);
    expect(await columnExists(prisma, 'Polls', 'created_at')).toBe(true);
    expect(await columnExists(prisma, 'Polls', 'updated_at')).toBe(true);
    expect(await columnExists(prisma, 'Polls', 'options')).toBe(true);
    expect(await columnExists(prisma, 'Polls', 'options_length')).toBe(true);
  });

  it('checks if PollVotes table exists and has proper columns', async () => {
    expect(await columnExists(prisma, 'PollVotes', 'id')).toBe(true);
    expect(await columnExists(prisma, 'PollVotes', 'pollId')).toBe(true);
    expect(await columnExists(prisma, 'PollVotes', 'vote')).toBe(true);
    expect(await columnExists(prisma, 'PollVotes', 'created_at')).toBe(true);
    expect(await columnExists(prisma, 'PollVotes', 'updated_at')).toBe(true);
  });
});
