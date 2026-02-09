import express from 'express';
import { requireAuth } from '../middleware/auth.middleware';
import { Login, signUp, getAllUsers, deleteUser, DeleteAccount, updateUser, UpdatePsw, status, logout } from '../controllers/auth.controller';
import { validateBody } from '../middleware/validate.middleware';
import { isLoginBody, isDeleteUser, isSignUpBody, isUpdPsw, isUpdateUser } from '../validators/auth.validator';
// left to add validate for body

const router = express.Router();

router.post("/login", validateBody(isLoginBody), Login);
router.post("/signup", validateBody(isSignUpBody), signUp);
router.get("/getUsers", requireAuth, getAllUsers);
router.delete("/deleteAcc", requireAuth, DeleteAccount);
router.post("/deleteUser", requireAuth, validateBody(isDeleteUser), deleteUser);
router.put("/updateUser", requireAuth, validateBody(isUpdateUser), updateUser);
router.put("/updatePsw", requireAuth, validateBody(isUpdPsw), UpdatePsw);
router.get("/status", requireAuth, status);
router.post("/logout", requireAuth, logout);


export default router;