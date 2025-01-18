/*
  Warnings:

  - You are about to drop the column `totalcorrectAnswer` on the `testRound` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "testRound" DROP COLUMN "totalcorrectAnswer",
ADD COLUMN     "correctAnswer" INTEGER DEFAULT 0,
ADD COLUMN     "correctAnswerScore" INTEGER,
ADD COLUMN     "positiveAnswerScore" INTEGER,
ADD COLUMN     "wrongAnswerScore" INTEGER;
