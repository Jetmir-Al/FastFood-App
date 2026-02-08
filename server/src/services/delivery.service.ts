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
        }
    },

    async delivHisto(userID: number) {
        await DeliveryModal.DeliveryHistory(userID);
    },

    async getAllDeliveries() {
        await DeliveryModal.allDeliveries();
    },

    async delDelivery(deliveryID: number) {
        const res = await DeliveryModal.deleteDelivery(deliveryID);
        if (res.message !== "Deleted Successfully!") {
            throw new BadRequestError("Invalid request");
        }
    },

    async getActiveDelivery(userID: number) {
        await DeliveryModal.activeDelivery(userID);
    },

    async updateAsDelivered(deliveryID: number) {
        const res = await DeliveryModal.updAsDelivered(deliveryID);

        if (res.message !== "Update Successfully!") {
            throw new BadRequestError("Invalid request");
        }
    }
}