import { BadRequestError } from "../http/http.error";
import { DeliveryModal } from "../models/delivery.model";
import { OrderModel } from "../models/orders.model";

export const DeliveryService = {

    async updateDel(deliveryID: number, userID: number, address: string, orderID: number, status: string) {
        //  address, orderID, status
        if (status === "delivered") {
            await DeliveryModal.updAsDelivered(deliveryID);
            await OrderModel.orderAsDelivered(status, address, orderID);
        }
        else {
            const res = await DeliveryModal.updateDelivery(deliveryID, userID);
            await OrderModel.orderAsDelivered(status, address, orderID);
            if (res.message !== "Update Successfully!") {
                throw new BadRequestError("Invalid request");
            }
            return res;
        }
    },

    async delivHisto(userID: number) {
        return await DeliveryModal.DeliveryHistory(userID);
    },

    async getAllDeliveries() {
        return await DeliveryModal.allDeliveries();
    },

    async delDelivery(deliveryID: number) {
        const res = await DeliveryModal.deleteDelivery(deliveryID);
        if (res.message !== "Deleted Successfully!") {
            throw new BadRequestError("Invalid request");
        }
        return res;
    },

    async getActiveDelivery(userID: number) {
        return await DeliveryModal.activeDelivery(userID);
    },

    async updateAsDelivered(deliveryID: number) {
        const res = await DeliveryModal.updAsDelivered(deliveryID);

        if (res.message !== "Update Successfully!") {
            throw new BadRequestError("Invalid request");
        }
    }
}