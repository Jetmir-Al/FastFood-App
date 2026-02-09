import { Request, Response } from "express";
import { DeliveryService } from "../services/delivery.service";
import { HttpError } from "../http/http.error";
import { IDeleteDelivery, IUpdDelivery } from "../types/Delivery";
import { verifyToken } from "../utils/jwt";




export const UpdateDelivery = async (req: Request, res: Response) => {
    try {
        const { deliveryID, address, orderID, status }: IUpdDelivery = req.body;
        const token = req.cookies.access_token;
        if (!token) {
            return res.status(404).json({ message: "Cookie not found" });
        }
        const payload = verifyToken(token)

        await DeliveryService.updateDel(deliveryID, payload.userID, address, orderID, status);

        res.status(200).json({ message: "Updated Successfully" });

    } catch (error: any) {
        if (error instanceof HttpError) {
            return res.status(error.statusCode).json({ message: error.message });
        }

        res.status(500).json({ message: error.message });
    }
};


export const getDeliveryHistory = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.access_token;
        if (!token) {
            return res.status(404).json({ message: "Cookie not found" });
        }
        const payload = verifyToken(token);
        const history = await DeliveryService.delivHisto(payload.userID);

        res.status(200).json(history);

    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllDelivery = async (req: Request, res: Response) => {
    try {
        const deliveries = await DeliveryService.getAllDeliveries();
        res.status(200).json(deliveries);

    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};


export const deleteDelivery = async (req: Request, res: Response) => {
    try {
        const { deliveryID }: IDeleteDelivery = req.body;

        await DeliveryService.delDelivery(deliveryID);

    } catch (error: any) {
        if (error instanceof HttpError) {
            return res.status(error.statusCode).json({ message: error.message });
        }

        res.status(500).json({ message: error.message });
    }
}

export const getActiveDeliveries = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.access_token;
        if (!token) {
            return res.status(404).json({ message: "Cookie not found" });
        }
        const payload = verifyToken(token)
        const active = await DeliveryService.getActiveDelivery(payload.userID);

        res.status(200).json(active)

    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}