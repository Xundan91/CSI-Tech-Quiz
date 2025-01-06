// controllers/examController.ts
import { Request, Response } from "express";
import { PrismaClient, RoundType, Prisma } from "@prisma/client";
import {Question} from "../utils/type"
interface ExamAnswer {
  question: string;
  options: string[];
  userAnswer: string;
  correctAnswer: string;
}

interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
  };
}

const prisma = new PrismaClient();

export const submitTestController = async (req: any, res: any) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const { roundType, answers } = req.body as {
      roundType: RoundType;
      answers: ExamAnswer[];
    };

    if (!roundType || !answers || !Array.isArray(answers)) {
      return res.status(400).json({
        success: false,
        message: "Invalid submission data",
      });
    }

    const questionsAttempted = answers.length;
    const correctAnswers = answers.filter(
      (answer) => answer.userAnswer === answer.correctAnswer
    ).length;
    const percentage = (correctAnswers / questionsAttempted) * 100;

    const result = await prisma.$transaction(async (tx) => {
      // Find or create TestHistory
      let testHistory = await tx.testHistory.findFirst({
        where: { userId },
        orderBy: { testDate: "desc" },
      });

      if (!testHistory) {
        testHistory = await tx.testHistory.create({
          data: {
            userId,
            questionsAttempted,
            totalcorrectAnswers: correctAnswers,
            percentage,
          },
        });
      } else {
        testHistory = await tx.testHistory.update({
          where: { id: testHistory.id },
          data: {
            questionsAttempted: {
              increment: questionsAttempted,
            },
            totalcorrectAnswers: {
              increment: correctAnswers,
            },
            percentage: {
              set:
                ((testHistory.totalcorrectAnswers + correctAnswers) /
                  (testHistory.questionsAttempted + questionsAttempted)) *
                100,
            },
          },
        });
      }

      // Create TestRound with properly typed question data
      const testRound = await tx.testRound.create({
        data: {
          testHistoryId: testHistory.id,
          roundType,
          questionsAttempted,
          correctAnswers,
          percentage,
          questions: {
            create: answers.map((answer) => ({
              roundType,
              questionText: answer.question,
              options: answer.options,
              userAnswer: answer.userAnswer,
              correctAnswer: answer.correctAnswer, // Added missing required field
            })),
          },
        },
      });

      return {
        testHistoryId: testHistory.id,
        testRoundId: testRound.id,
        questionsAttempted,
        correctAnswers,
        percentage,
      };
    });

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error submitting test:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getTestSubmission = async (req: any, res: any) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const examHistory = await prisma.testHistory.findMany({
      where: { userId },
      include: {
        rounds: {
          include: {
            questions: true,
          },
        },
      },
      orderBy: {
        testDate: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      data: examHistory,
    });
  } catch (error) {
    console.error("Error fetching test submissions:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getCurrentRound = async (req: any, res: any) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const latestTest = await prisma.testHistory.findFirst({
      where: { userId },
      include: {
        rounds: {
          orderBy: {
            roundDate: "desc",
          },
          take: 1,
        },
      },
      orderBy: {
        testDate: "desc",
      },
    });

    let nextRound: RoundType  = RoundType.APTITUDE;

    // Handle the possible undefined rounds array
    if (latestTest?.rounds && latestTest.rounds.length > 0) {
      const lastRound = latestTest.rounds[0].roundType;
      switch (lastRound) {
        case RoundType.APTITUDE:
          nextRound = RoundType.DSA_BASIC;
          break;
        case RoundType.DSA_BASIC:
          nextRound = RoundType.DSA_ADVANCED;
          break;
        case RoundType.DSA_ADVANCED:
          nextRound = RoundType.APTITUDE; // Or handle completion differently
          break;
      }
    }

    return res.status(200).json({
      success: true,
      data: {
        currentRound: nextRound,
        testHistory: latestTest,
      },
    });
  } catch (error) {
    console.error("Error fetching current round:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};