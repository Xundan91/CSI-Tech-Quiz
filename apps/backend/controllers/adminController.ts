import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllAdmins = async (req: Request, res: Response) => {
  try {
    const admins = await prisma.admin.findMany({});
    res.json(admins);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch admins", details: err });
  }
};
