import express from 'express';
import { requireAuth } from '../middleware/auth.middleware';
import { OrderForm, orderHistory, topOrders, ActiveOrders, CancelOrder, getLiveOrder, takeToDeliver } from '../controllers/order.controller';

const router = express.Router();

router.get("/orderHistory", requireAuth, orderHistory);
router.get("/topOrders", requireAuth, topOrders);
router.post("/orderForm", requireAuth, OrderForm);
router.get("/activeOrders", requireAuth, ActiveOrders);
router.post("/cancelOrder", requireAuth, CancelOrder);
router.get("/getLiveOrders", requireAuth, getLiveOrder);
router.post("/takeToDeliver", requireAuth, takeToDeliver);

export default router;