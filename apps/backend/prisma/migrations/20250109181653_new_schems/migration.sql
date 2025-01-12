/*
  Warnings:

  - You are about to drop the `Question` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TestHistory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TestRound` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TestType" AS ENUM ('APTITUDE', 'DSA', 'ADVANCEDSA');

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_testRoundId_fkey";

-- DropForeignKey
ALTER TABLE "TestHistory" DROP CONSTRAINT "TestHistory_userId_fkey";

-- DropForeignKey
ALTER TABLE "TestRound" DROP CONSTRAINT "TestRound_testHistoryId_fkey";

-- DropTable
DROP TABLE "Question";

-- DropTable
DROP TABLE "TestHistory";

-- DropTable
DROP TABLE "TestRound";

-- DropEnum
DROP TYPE "RoundType";

-- CreateTable
CREATE TABLE "testRound" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,
    "TestType" "TestType" NOT NULL,
    "questionattempted" INTEGER NOT NULL,
    "correctAnswer" INTEGER NOT NULL,
    "percentage" DOUBLE PRECISION NOT NULL,
    "roundDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "testRound_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "testRound" ADD CONSTRAINT "testRound_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
