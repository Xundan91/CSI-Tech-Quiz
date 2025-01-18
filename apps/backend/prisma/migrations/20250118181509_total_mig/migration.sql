/*
  Warnings:

  - You are about to drop the column `correctAnswer` on the `testRound` table. All the data in the column will be lost.
  - You are about to drop the column `correctAnswerScore` on the `testRound` table. All the data in the column will be lost.
  - You are about to drop the column `positiveAnswer` on the `testRound` table. All the data in the column will be lost.
  - You are about to drop the column `wrongAnswer` on the `testRound` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "testRound" DROP COLUMN "correctAnswer",
DROP COLUMN "correctAnswerScore",
DROP COLUMN "positiveAnswer",
DROP COLUMN "wrongAnswer",
ADD COLUMN     "TotalcorrectAnswerScore" INTEGER DEFAULT 0;
