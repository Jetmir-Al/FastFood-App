import { api } from "./api"


export const getAllDeliveries = async () => {
    const res = await api.get("/delivery/allDeliveries", { withCredentials: true });
    return res.data;
}


export const getDeliveryHistory = async () => {
    const res = await api.get("/delivery/deliveryHistory", { withCredentials: true });

    return res.data;
}

export const getActiveDeliveries = async () => {
    const res = await api.get("/delivery/getActiveDeliveries", { withCredentials: true });

    return res.data;
}

export const updateAsDelivered = async (deliveryID: number, orderID: number) => {
    const res = await api.put("/delivery/markAsDelivered", { deliveryID, orderID }, { withCredentials: true });
    return res.data;
}

export const deleteDelivery = async (deliveryID: number) => {
    const res = await api.post("/delivery/deleteDelivery", { deliveryID }, { withCredentials: true });
    return res.data;
}

export const changeDeliveryMan = async (userID: number, deliveryID: number) => {
    const res = await api.put("/delivery/changeDeliveryMan", { userID, deliveryID }, { withCredentials: true });
    return res.data;
}