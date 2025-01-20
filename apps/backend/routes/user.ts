import { Router } from "express";
import { PrismaClient, User } from "@prisma/client";
import { hashPassword, comparePassword, generateToken } from "../utils/auth";

import { getCurrentUser,getUserTestDetails,getTopStudents } from "../controllers/userController";
import { authenticate } from "../middlewares/authMiddleware";
import { Aptitude, Superadvancedsa , Advancedsa ,getRankings} from "../controllers/userController";
const prisma = new PrismaClient();
const router = Router();

router.get('/getusermarks',authenticate , getUserTestDetails)

router.get('/gettop5' , getTopStudents);

router.post('/aptitude',authenticate,Aptitude)
router.post('/advancedsa',authenticate,Advancedsa)
router.post('/superadvancedsa',authenticate,Superadvancedsa)


router.get("/profile",authenticate, getCurrentUser);

router.get('/rankings',authenticate, getRankings);

interface UserInput {
  name: string;
  email: string;
  password: string;
}

router.post("/signupall", async (req:any, res:any) => {
  const users = req.body.users; // An array of user objects with name, email, and password

  try {
    // Hash passwords for all users
    const hashedPasswords = await Promise.all(
      users.map(async (user:UserInput) => {
        return {
          name: user.name,
          email: user.email,
          password: await hashPassword(user.password),
        };
      })
    );

    
    const createdUsers = await prisma.user.createMany({
      data: hashedPasswords,
    });

    res.json({ createdUsers });
  } catch (err) {
    console.error(err); // Log the full error to get more details
    res.status(400).json({ error: "User creation failed", details: err });  }
});


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
