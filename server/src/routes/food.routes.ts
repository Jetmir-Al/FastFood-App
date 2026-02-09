import express from 'express';
import { getFoodItems, updateFoodImge, addNewFoodItem } from '../controllers/food.controller';
import { requireAuth } from '../middleware/auth.middleware';
import { validateBody } from '../middleware/validate.middleware';
import { isAddFoodItemBody, isUpdateFoodImg } from '../validators/food.validator';

const router = express.Router();

router.get("/getFoodItems", getFoodItems);
router.put("/updateFoodImg", requireAuth, validateBody(isUpdateFoodImg), updateFoodImge);
router.post("/addNewFood", requireAuth, validateBody(isAddFoodItemBody), addNewFoodItem);

export default router;