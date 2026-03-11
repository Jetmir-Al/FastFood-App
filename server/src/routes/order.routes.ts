import express from 'express';
import { requireAuth } from '../middleware/auth.middleware';
import { OrderForm, orderHistory, topOrders, ActiveOrders, CancelOrder, getLiveOrder, takeToDeliver, getAllOrders, deleteOrder } from '../controllers/order.controller';
import { validateBody } from '../middleware/validate.middleware';
import { isCancelOrder, isDeleteOrder, isOrderFormBody, isTakeToDeliverBody } from '../validators/order.validator';

const router = express.Router();

router.get("/orderHistory", requireAuth, orderHistory);
router.get("/topOrders", requireAuth, topOrders);
router.post("/orderForm", requireAuth, validateBody(isOrderFormBody), OrderForm);
router.get("/activeOrders", requireAuth, ActiveOrders);
router.post("/cancelOrder", requireAuth, validateBody(isCancelOrder), CancelOrder);
router.get("/getLiveOrders", getLiveOrder);
router.get("/getAllOrders", requireAuth, getAllOrders);
router.post("/takeToDeliver", requireAuth, validateBody(isTakeToDeliverBody), takeToDeliver);
router.post("/deleteOrder", requireAuth, validateBody(isDeleteOrder), deleteOrder);

export default router;