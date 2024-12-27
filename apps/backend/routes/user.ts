import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { hashPassword, comparePassword, generateToken } from "../utils/auth";

import { getAllUsers } from "../controllers/userController";
import { authenticate } from "../middlewares/authMiddleware";

const prisma = new PrismaClient();
const router = Router();


router.get("/getAllUsers", authenticate, getAllUsers);

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    res.json({ user });
  } catch (err) {
    res.status(400).json({ error: "User creation failed", details: err });
  }
});

router.post("/login", async (req:any, res:any) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = generateToken(user.id, "user");
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Login failed", details: err });
  }
});

export default router;
