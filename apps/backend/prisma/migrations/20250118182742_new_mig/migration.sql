-- AlterTable
ALTER TABLE "testRound" ADD COLUMN     "correctAnswer" INTEGER DEFAULT 0,
ALTER COLUMN "TotalcorrectAnswerScore" DROP DEFAULT;
