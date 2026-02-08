import express from 'express';
import { getFoodItems, updateFoodImge, addNewFoodItem } from '../controllers/food.controller';
import { requireAuth } from '../middleware/auth.middleware';

const router = express.Router();

router.get("/getFoodItems", getFoodItems);
router.put("/updateFoodImg", requireAuth, updateFoodImge);
router.post("/addNewFood", requireAuth, addNewFoodItem);

export default router;