import { api } from "./api"


export const getOrderHistory = async () => {
    const res = await api.get("/order/orderHistory");
    return res.data;
}

export const getTopOrders = async () => {
    const res = await api.get("/order/topOrders");
    return res.data;
}

export const getLiveOrder = async () => {
    const res = await api.get("/oder/getLiveOrders");
    return res.data;
}

export const getActiveOrders = async () => {
    const res = await api.get("/order/activeOrders");
    return res.data;
}

export const orderForm = async (address: string, foodID: number, quantity: number) => {
    const res = await api.post("/order/orderForm", { address, foodID, quantity });
    return res.data;
}