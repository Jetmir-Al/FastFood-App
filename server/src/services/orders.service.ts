import { BadRequestError } from "../http/http.error";
import { OrderModel } from "../models/orders.model";


export const OrderService = {

    async getTopOrders() {
        return await OrderModel.top3Orders();
    },

    async getOrderHistory(userID: number) {
        const history = await OrderModel.OrderHisto(userID);

        return history;
    },

    async orderForm(customerID: number, address: string, foodID: number, quantity: number) {
        const id = await OrderModel.Order(customerID, address);
        await OrderModel.InsertOrderItems(id, foodID, quantity);

    },

    async getLiveOrders(limit: number, offsetValue: number) {
        return OrderModel.LiveOrders(limit, offsetValue);
    },

    async deliverOrder(orderID: number, deliveryManID: number) {
        return await OrderModel.takeToDeliver(orderID, deliveryManID);
    },

    async activeOrders(customerID: number) {
        return await OrderModel.ActiveOrders(customerID);
    },

    async cancelOrder(orderID: number) {
        return await OrderModel.CancelOrder(orderID);
    },

    async DeleteOrder(orderID: number) {
        const res = await OrderModel.deleteOrder(orderID);
        if (res.message !== "Deleted Successfully!") {
            throw new BadRequestError("Invalid request");
        }
    },

    async AllOrders() {
        return await OrderModel.getAllOrders();
    }
}