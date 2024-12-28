/*
  Warnings:

  - You are about to drop the column `totalquestionsAttempted` on the `TestHistory` table. All the data in the column will be lost.
  - Added the required column `questionsAttempted` to the `TestHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TestHistory" DROP COLUMN "totalquestionsAttempted",
ADD COLUMN     "questionsAttempted" INTEGER NOT NULL;
