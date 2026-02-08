import express from 'express';
import { requireAuth } from '../middleware/auth.middleware';
import { Login, signUp, getAllUsers, deleteUser, DeleteAccount, updateUser, UpdatePsw, status, logout } from '../controllers/auth.controller';

// left to add validate for body

const router = express.Router();

router.post("/login", Login);
router.post("/signup", signUp);
router.get("/getUsers", requireAuth, getAllUsers);
router.delete("/deleteAcc", requireAuth, DeleteAccount);
router.post("/deleteUser", requireAuth, deleteUser);
router.put("/updateUser", requireAuth, updateUser);
router.put("/updatePsw", requireAuth, UpdatePsw);
router.get("/status", requireAuth, status);
router.post("/logout", requireAuth, logout);


export default router;