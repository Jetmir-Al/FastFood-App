import { Request, Response } from "express";
import { HttpError } from "../http/http.error";
import { verifyToken } from "../utils/jwt";
import { OrderService } from "../services/orders.service";
import { IOrderForm } from "../types/Order";


export const topOrders = async (req: Request, res: Response) => {
    try {
        const orders = OrderService.getTopOrders();

        res.status(200).json(orders);

    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};


export const orderHistory = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.access_token;
        if (!token) {
            return res.status(404).json({ message: "Cookie not found" });
        }
        const payload = verifyToken(token);
        const history = await OrderService.getOrderHistory(payload.userID);

        res.status(200).json(history);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const OrderForm = async (req: Request, res: Response) => {
    try {
        const { address, foodID, quantity }: IOrderForm = req.body;
        const token = req.cookies.access_token;
        if (!token) {
            return res.status(404).json({ message: "Cookie not found" });
        }
        const payload = verifyToken(token);
        await OrderService.orderForm(payload.userID, address, foodID, quantity);

        res.status(200).json({ message: "Inserted Successfully!" });

    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}


export const getLiveOrder = async (req: Request, res: Response) => {
    try {

        const live = await OrderService.getLiveOrders();
        res.status(200).json(live);

    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const takeToDeliver = async (req: Request, res: Response) => {
    try {
        const { orderID }: { orderID: number } = req.body;
        const token = req.cookies.access_token;
        if (!token) {
            return res.status(404).json({ message: "Cookie not found" });
        }
        const payload = verifyToken(token);
        await OrderService.deliverOrder(orderID, payload.userID);


    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}


export const ActiveOrders = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.access_token;
        if (!token) {
            return res.status(404).json({ message: "Cookie not found" });
        }
        const payload = verifyToken(token);
        const ative = await OrderService.activeOrders(payload.userID);

        res.status(200).json(ative);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const CancelOrder = async (req: Request, res: Response) => {
    try {
        const { orderID }: { orderID: number } = req.body;

        await OrderService.cancelOrder(orderID);
        res.status(200).json({ message: "Canceled Successfully!" });

    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}