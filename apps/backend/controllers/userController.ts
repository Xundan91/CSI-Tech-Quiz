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

// export const Getmarksdata = async (req:any , res:any)=>{
//   const userid = req.userid?.id;
//   const usermarks = await prisma.testRound.findUnique({
//     userid,


//   })
// export const getallmarkswithuser = async (req:any , res:any)=>{
//   const {userId} = req.params;
//   const testRound = await prisma.testRound.findMany{
//     where :{
//       userid : parseInt( userId, 10)
//     }
//   }
// }


export const getUserTestDetails = async (req:any, res:any) => {
  try {
    console.log(req.user);
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
    const rankings = await prisma.testRound.findMany({
      where: {
        TestType: {
          in: ['APTITUDE', 'DSA', 'ADVANCEDSA'],
        },
      },
      orderBy: [
        { TotalcorrectAnswerScore: 'desc' }, 
        // { roundDate: 'asc' }, 
        { Totaltime: 'asc' }, 
      ],
      include: {
        User: true,
      },
    });

    const groupedRankings: any = {};

    rankings.forEach((round) => {
      const { TestType, userid } = round;

      if (!groupedRankings[TestType]) {
        groupedRankings[TestType] = {};
      }

      if (!groupedRankings[TestType][userid]) {
        groupedRankings[TestType][userid] = round;
      }
    });

    const formattedRankings = Object.keys(groupedRankings).reduce((acc: any, testType: string) => {
      acc[testType] = Object.values(groupedRankings[testType]); // Convert to array
      return acc;
    }, {});

    return res.status(200).json(formattedRankings);
  } catch (error) {
    console.error('Error fetching rankings:', error);
    return res.status(500).json({ message: 'Error fetching rankings' });
  }
};
