/*
  Warnings:

  - You are about to drop the column `correctAnswer` on the `testRound` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "testRound" DROP COLUMN "correctAnswer",
ADD COLUMN     "positiveAnswer" INTEGER,
ADD COLUMN     "totalcorrectAnswer" INTEGER DEFAULT 0,
ADD COLUMN     "wrongAnswer" INTEGER;
