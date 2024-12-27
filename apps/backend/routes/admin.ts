import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { hashPassword, comparePassword, generateToken } from "../utils/auth";

import { getAllAdmins } from "../controllers/adminController";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware";

const prisma = new PrismaClient();
const router = Router();

router.get("/getalladmins", authenticate, authorizeAdmin, getAllAdmins);

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await hashPassword(password);
    const admin = await prisma.admin.create({
      data: { name, email, password: hashedPassword },
    });
    res.json({ admin });
  } catch (err) {
    res.status(400).json({ error: "Admin creation failed", details: err });
  }
});

router.post("/login", async (req:any, res:any) => {
  const { email, password } = req.body;
  try {
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin || !(await comparePassword(password, admin.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = generateToken(admin.id, "admin");
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Login failed", details: err });
  }
});

export default router;


