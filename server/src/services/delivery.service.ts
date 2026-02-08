import { DeliveryModal } from "../models/delivery.model";

export const DeliveryService = {

    async updateDelivery(deliveryID: number, userID: number, address: string, orderID: number, status: string) {
        await DeliveryModal.updateDelivery(deliveryID, userID, address, orderID, status);
    },

    async delivHisto(userID: number) {
        await DeliveryModal.DeliveryHistory(userID);
    },

    async getAllDeliveries() {
        await DeliveryModal.allDeliveries();
    },

    async delDelivery(deliveryID: number) {
        await DeliveryModal.deleteDelivery(deliveryID);
    },

    async getActiveDelivery(userID: number) {
        await DeliveryModal.activeDelivery(userID);
    },

    async updateAsDelivered(deliveryID: number, orderID: number) {
        await DeliveryModal.updAsDelivered(deliveryID, orderID);
    }
}