/*
  Warnings:

  - You are about to drop the column `correctAnswers` on the `TestHistory` table. All the data in the column will be lost.
  - You are about to drop the column `questionsAttempted` on the `TestHistory` table. All the data in the column will be lost.
  - Added the required column `totalcorrectAnswers` to the `TestHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalquestionsAttempted` to the `TestHistory` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RoundType" AS ENUM ('APTITUDE', 'DSA_BASIC', 'DSA_ADVANCED');

-- AlterTable
ALTER TABLE "TestHistory" DROP COLUMN "correctAnswers",
DROP COLUMN "questionsAttempted",
ADD COLUMN     "totalcorrectAnswers" INTEGER NOT NULL,
ADD COLUMN     "totalquestionsAttempted" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "TestRound" (
    "id" SERIAL NOT NULL,
    "testHistoryId" INTEGER NOT NULL,
    "roundType" "RoundType" NOT NULL,
    "questionsAttempted" INTEGER NOT NULL,
    "correctAnswers" INTEGER NOT NULL,
    "percentage" DOUBLE PRECISION NOT NULL,
    "roundDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TestRound_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "testRoundId" INTEGER NOT NULL,
    "questionText" TEXT NOT NULL,
    "options" JSONB NOT NULL,
    "correctAnswer" TEXT NOT NULL,
    "userAnswer" TEXT,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TestRound" ADD CONSTRAINT "TestRound_testHistoryId_fkey" FOREIGN KEY ("testHistoryId") REFERENCES "TestHistory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_testRoundId_fkey" FOREIGN KEY ("testRoundId") REFERENCES "TestRound"("id") ON DELETE CASCADE ON UPDATE CASCADE;
