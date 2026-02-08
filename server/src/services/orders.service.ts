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
        await OrderModel.Order(customerID, address, foodID, quantity);
    },

    async getLiveOrders() {
        return await OrderModel.LiveOrders();
    },

    async deliver(orderID: number, deliveryManID: number) {
        await OrderModel.takeToDeliver(orderID, deliveryManID);
    },

    async activeOrders(customerID: number) {
        await OrderModel.ActiveOrders(customerID);
    },

    async cancelOrder(orderID: number) {
        await OrderModel.CancelOrder(orderID);
    }
}