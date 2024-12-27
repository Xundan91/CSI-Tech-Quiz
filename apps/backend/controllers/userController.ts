import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { log } from "node:console";

const prisma = new PrismaClient();

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users", details: err });
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
