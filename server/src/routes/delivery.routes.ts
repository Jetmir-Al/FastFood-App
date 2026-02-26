import express from 'express';
import { requireAuth } from '../middleware/auth.middleware';
import { deleteDelivery, getActiveDeliveries, UpdateDelivery, getDeliveryHistory, getAllDelivery, MarkAsDelivered } from "../controllers/delivery.controller";
import { validateBody } from '../middleware/validate.middleware';
import { isUpdateDeliveryBody, isDeleteDeliveryBody, isMarkAsDeliveredBody } from '../validators/delivery.validator';

const router = express.Router();

router.put("/updateDelivery", requireAuth, validateBody(isUpdateDeliveryBody), UpdateDelivery);
router.put("/markAsDelivered", requireAuth, validateBody(isMarkAsDeliveredBody), MarkAsDelivered)
router.get("/deliveryHistory", requireAuth, getDeliveryHistory);
router.get("/allDeliveries", requireAuth, getAllDelivery);
router.get("/getActiveDeliveries", requireAuth, getActiveDeliveries);
router.post("/deleteDelivery", requireAuth, validateBody(isDeleteDeliveryBody), deleteDelivery);

export default router;