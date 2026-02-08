import express from 'express';
import { requireAuth } from '../middleware/auth.middleware';
import { deleteDelivery, getActiveDeliveries, UpdateDelivery, getDeliveryHistory, getAllDelivery } from "../controllers/delivery.controller";


const router = express.Router();

router.put("/updateDelivery", requireAuth, UpdateDelivery);
router.get("/deliveryHistory", requireAuth, getDeliveryHistory);
router.get("/allDeliveries", requireAuth, getAllDelivery);
router.get("/getActiveDeliveries", requireAuth, getActiveDeliveries);
router.post("/deleteDelivery", requireAuth, deleteDelivery);

export default router;