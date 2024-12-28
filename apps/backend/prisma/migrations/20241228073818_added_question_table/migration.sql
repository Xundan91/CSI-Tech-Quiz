-- CreateTable
CREATE TABLE "TestHistory" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "questionsAttempted" INTEGER NOT NULL,
    "correctAnswers" INTEGER NOT NULL,
    "percentage" DOUBLE PRECISION NOT NULL,
    "testDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TestHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TestHistory" ADD CONSTRAINT "TestHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
