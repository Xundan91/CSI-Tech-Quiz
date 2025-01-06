/*
  Warnings:

  - The `options` column on the `Question` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `roundType` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "roundType" "RoundType" NOT NULL,
DROP COLUMN "options",
ADD COLUMN     "options" TEXT[];
