import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();


export const getAllQuestionsWithOptions = async (req: any, res: any) => {
  try {
    const questions = await prisma.question.findMany({
      select: {
        id: true,
        questionText: true,
        options: true,
        correctAnswer: true,
      },
    });

    return res.status(200).json({
      success: true,
      data: questions,
    });
  } catch (error) {
    console.error("Error fetching questions with options:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const getCurrentUser = async (req: any, res: any) => {
  try {
    console.log("hello");
    const userId = req.user?.id;
    console.log(userId);
    
    console.log("hello");
    

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

// export const submitTestController = async (req:any, res:any) => {
//   try {
//     const { userId, questionsAttempted, correctAnswers } = req.body;

//     // Input validation
//     if (!userId || questionsAttempted === undefined || correctAnswers === undefined) {
//       return res.status(400).json({ message: 'All fields are required: userId, questionsAttempted, correctAnswers' });
//     }

//     // Calculate percentage
//     const percentage = (correctAnswers / questionsAttempted) * 100;

//     // Create a new test record in the database
//     const newTest = await prisma.testHistory.create({
//       data: {
//         userId,
//         questionsAttempted,
//         correctAnswers,
//         percentage,
//       },
//     });

//     res.status(201).json({ message: 'Test data submitted successfully', data: newTest });
//   } catch (error:any) {
//     console.error('Error submitting test data:', error);
//     res.status(500).json({ message: 'An error occurred while submitting test data', error: error.message });
//   }
// };



// export const getTestSubmission = async (req:any  ,res:any ) =>{

//   try {

//     const userId = req.user?.id;

//     if (!userId) {
//       return res.status(400).json({
//         message: 'User ID is required',
//       });
//     }

//     const testSubmissions = await prisma.testHistory.findMany({
//       where: { userId }, // Filter test history by userId
//     });

//     res.status(200).json({
//       message: 'User test submissions fetched successfully',
//       data: testSubmissions,
//     });

    
//   } catch (error:any) {
//     console.error('Error fetching user test submissions:', error);
//     res.status(500).json({
//       message: 'Failed to fetch test submissions',
//       error: error.message,
//     });    
//   }

// }