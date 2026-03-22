import type { IOrderParams } from "../types/orderTypes";
import { api } from "./api"


export const getOrderHistory = async () => {
    const res = await api.get("/order/orderHistory", { withCredentials: true });
    return res.data;
}

export const getTopOrders = async () => {
    const res = await api.get("/order/topOrders", { withCredentials: true });
    return res.data;
}

export const getLiveOrder = async ({ params }: IOrderParams) => {
    const res = await api.get("/order/getLiveOrders",
        {
            params: {
                page: params.page,
                totalPages: params.totalPages
            },
            withCredentials: true
        },
    );
    return res.data;
}

export const getActiveOrders = async () => {
    const res = await api.get("/order/activeOrders", { withCredentials: true });
    return res.data;
}

export const orderForm = async (address: string, foodID: number, quantity: number) => {
    const res = await api.post("/order/orderForm", { address, foodID, quantity }, { withCredentials: true });
    return res.data;
}

export const cancelOrder = async (orderID: number) => {
    const res = await api.post("/order/cancelOrder", { orderID }, { withCredentials: true });
    return res.data;
}

export const takeToDeliver = async (orderID: number) => {
    const res = await api.post("/order/takeToDeliver", { orderID }, { withCredentials: true });
    return res.data;
}

export const getAllOrders = async ({ params }: IOrderParams) => {
    const res = await api.get("/order/getAllOrders", {
        params: {
            page: params.page,
            totalPages: params.totalPages
        },
        withCredentials: true
    });
    return res.data;
}


export const deleteOrder = async (orderID: number) => {
    const res = await api.post("/order/deleteOrder", { orderID }, { withCredentials: true });
    return res.data;
}