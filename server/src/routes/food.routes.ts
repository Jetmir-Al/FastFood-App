import express from 'express';
import { getFoodItems, updateFoodImge, addNewFoodItem, getTopFoods } from '../controllers/food.controller';
import { requireAuth } from '../middleware/auth.middleware';
import { validateBody } from '../middleware/validate.middleware';
import { isAddFoodItemBody, isUpdateFoodImg } from '../validators/food.validator';
import { upload } from '../utils/storage';

const router = express.Router();

router.get("/getFoodItems", getFoodItems);
router.get("/getTopFoods", getTopFoods);
router.put("/updateFoodImg", requireAuth, validateBody(isUpdateFoodImg), updateFoodImge);
router.post("/addNewFood", requireAuth, upload.single("foodImg"), validateBody(isAddFoodItemBody), addNewFoodItem);

export default router;