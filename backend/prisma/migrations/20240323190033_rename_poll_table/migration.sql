/*
  Warnings:

  - You are about to drop the `Poll` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PollVotes" DROP CONSTRAINT "PollVotes_pollId_fkey";

-- DropTable
DROP TABLE "Poll";

-- CreateTable
CREATE TABLE "Polls" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "options" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "options_length" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Polls_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PollVotes" ADD CONSTRAINT "PollVotes_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "Polls"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
