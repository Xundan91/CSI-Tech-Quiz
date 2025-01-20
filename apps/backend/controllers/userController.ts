import { Request, Response } from "express";
import { PrismaClient, Prisma,TestType,testRound } from "@prisma/client";


const prisma = new PrismaClient();



export const getCurrentUser = async (req: any, res: any) => {
  try {
 
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(400).json({ error: "User ID is missing from the request." });
    }

    // Fetch the user with selected fields
    const user = await prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    res.status(200).json(user);
  } catch (error:any) {
    // Handle specific Prisma errors for clarity
    if (error.name === "NotFoundError") {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(500).json({ error: "Failed to fetch user data" });
  }
};

export const Aptitude = async (req: any, res: any) => {
  try {
    const { userid, questionattempted, correctAnswer, Totaltime, TotalcorrectAnswerScore, positiveAnswerScore, wrongAnswerScore } = req.body;

    // Calculate percentage
    const percentage = (correctAnswer / questionattempted) * 100;

    const testRound = await prisma.testRound.create({
      data: {
        userid,
        TestType: 'APTITUDE',
        questionattempted,
        correctAnswer,
        TotalcorrectAnswerScore,  
        positiveAnswerScore,      
        wrongAnswerScore,         
        percentage,
        Totaltime: Totaltime !== undefined ? Totaltime : null, // Handle Totaltime properly
      },
    });

    res.status(201).json(testRound);
  } catch (error: any) {
    console.error('Error storing aptitude test data:', error);
    res.status(500).json({
      msg: 'Error in storing aptitude test data',
      error: error.message,
    });
  }
};

export const Advancedsa = async (req: any, res: any) => {
  try {
    const { userid, questionattempted, correctAnswer, Totaltime, TotalcorrectAnswerScore, positiveAnswerScore, wrongAnswerScore } = req.body;

    // Calculate percentage
    const percentage = (correctAnswer / questionattempted) * 100;

    const testRound = await prisma.testRound.create({
      data: {
        userid,
        TestType: 'DSA',
        questionattempted,
        correctAnswer,
        TotalcorrectAnswerScore,  
        positiveAnswerScore,      
        wrongAnswerScore,         
        percentage,
        Totaltime: Totaltime !== undefined ? Totaltime : null, // Handle Totaltime properly
      },
    });

    res.status(201).json(testRound);
  } catch (error: any) {
    console.error('Error storing DSA test data:', error);
    res.status(500).json({
      msg: 'Error in storing DSA test data',
      error: error.message,
    });
  }
};

export const Superadvancedsa = async (req: any, res: any) => {
  try {
    const { userid, questionattempted, correctAnswer, Totaltime, TotalcorrectAnswerScore, positiveAnswerScore, wrongAnswerScore } = req.body;

    // Calculate percentage
    const percentage = (correctAnswer / questionattempted) * 100;

    const testRound = await prisma.testRound.create({
      data: {
        userid,
        TestType: 'ADVANCEDSA',
        questionattempted,
        correctAnswer,
        TotalcorrectAnswerScore,  
        positiveAnswerScore,      
        wrongAnswerScore,         
        percentage,
        Totaltime: Totaltime !== undefined ? Totaltime : null, // Handle Totaltime properly
      },
    });

    res.status(201).json(testRound);
  } catch (error: any) {
    console.error('Error storing Advanced DSA test data:', error);
    res.status(500).json({
      msg: 'Error in storing Advanced DSA test data',
      error: error.message,
    });
  }
};



export const getUserTestDetails = async (req:any, res:any) => {
  try {
    const userId = req.user?.id;
    // Fetch the oldest test rounds for APTITUDE, DSA, and ADVANCEDSA
    const testRounds = await prisma.testRound.findMany({
      where: {
        userid: parseInt(userId, 10),
        TestType: { in: [TestType.APTITUDE, TestType.DSA, TestType.ADVANCEDSA] },
      },
      orderBy: {
        roundDate: 'asc',
      },
    });

    const groupedData: Partial<Record<TestType, testRound>> = {};
    testRounds.forEach((test) => {
      if (!groupedData[test.TestType]) {
        groupedData[test.TestType] = test;
      }
    });

    // Prepare response
    const response = [TestType.APTITUDE, TestType.DSA, TestType.ADVANCEDSA].map((type) => {
      const test = groupedData[type];
      return test
        ? {
            TestType: type,
            questionAttempted: test.questionattempted,
            correctAnswer: test.correctAnswer,
            percentage: test.percentage,
            timeTaken: test.Totaltime,
            TotalcorrectAnswerScore :test.TotalcorrectAnswerScore,
            positiveAnswerScore : test.positiveAnswerScore,
            wrongAnswerScore :test.wrongAnswerScore


          }
        : { TestType: type, message: 'No data available' };
    });

    return res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching test details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const getRankings = async (req: any, res: any) => {
  try {
    // Fetch only the top user from each round
    const rankings = await prisma.testRound.groupBy({
      by: ['TestType', 'userid'], // Use 'userid' if that matches your schema
      where: {
        TestType: {
          in: ['APTITUDE', 'DSA', 'ADVANCEDSA'],
        },
      },
      _max: {
        TotalcorrectAnswerScore: true, // Get max correct score
      },
      _min: {
        Totaltime: true, // Get shortest time if scores are tied
      },
    });

    // Fetch user details for the grouped results
    const userRankings = await Promise.all(
      rankings.map(async (group) => {
        const user = await prisma.user.findUnique({
          where: { id: group.userid }, // Ensure 'userid' matches your schema
        });

        return {
          TestType: group.TestType,
          User: user,
          Score: group._max.TotalcorrectAnswerScore,
          Time: group._min.Totaltime,
        };
      })
    );

    return res.status(200).json(userRankings);
  } catch (error) {
    console.error('Error fetching rankings:', error);
    return res.status(500).json({ message: 'Error fetching rankings' });
  }
};






export const getTopStudents = async (req: Request, res: Response) => {
    try {
        // Get all students who have completed both APTITUDE and DSA rounds
        const studentsWithBothRounds = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                rounds: {
                    where: {
                        TestType: {
                            in: [TestType.APTITUDE, TestType.DSA]
                        }
                    },
                    orderBy: {
                        roundDate: 'asc'
                    },
                    select: {
                        TestType: true,
                        percentage: true,
                        TotalcorrectAnswerScore: true,
                        Totaltime: true
                    }
                }
            },
            where: {
                AND: [
                    {
                        rounds: {
                            some: {
                                TestType: TestType.APTITUDE
                            }
                        }
                    },
                    {
                        rounds: {
                            some: {
                                TestType: TestType.DSA
                            }
                        }
                    }
                ]
            }
        });

        // Process and calculate average scores
        const processedStudents = studentsWithBothRounds
            .map(student => {
                const aptitudeRound = student.rounds.find(r => r.TestType === TestType.APTITUDE);
                const dsaRound = student.rounds.find(r => r.TestType === TestType.DSA);

                if (!aptitudeRound || !dsaRound) {
                    return null;
                }

                return {
                    id: student.id,
                    name: student.name,
                    email: student.email,
                    aptitudeScore: aptitudeRound.percentage,
                    dsaScore: dsaRound.percentage,
                    averagePercentage: (aptitudeRound.percentage + dsaRound.percentage) / 2,
                    rounds: {
                        aptitude: {
                            percentage: aptitudeRound.percentage,
                            correctScore: aptitudeRound.TotalcorrectAnswerScore,
                            timeSpent: aptitudeRound.Totaltime
                        },
                        dsa: {
                            percentage: dsaRound.percentage,
                            correctScore: dsaRound.TotalcorrectAnswerScore,
                            timeSpent: dsaRound.Totaltime
                        }
                    }
                };
            })
            .filter((student): student is NonNullable<typeof student> => student !== null)
            // Sort by average percentage in descending order
            .sort((a, b) => b.averagePercentage - a.averagePercentage)
            // Take top 5
            .slice(0, 5);

        res.status(200).json({
            success: true,
            data: processedStudents,
            message: "Top 5 students retrieved successfully"
        });

    } catch (error) {
        console.error("Error fetching top students:", error);
        res.status(500).json({
            success: false,
            error: "Failed to fetch top students",
            message: error instanceof Error ? error.message : "Unknown error occurred"
        });
    }
};