import { IChangeDeliveryMan, IDeleteDelivery, IUpdDelivery } from "../types/Delivery";




export const isUpdateDeliveryBody = (body: any): body is IUpdDelivery => {
    return (
        typeof body === "object" &&
        typeof body.deliveryID === "number" &&
        body.deliveryID !== 0 &&
        typeof body.address === "string" &&
        body.address !== "" &&
        typeof body.orderID === "number" &&
        body.orderID !== 0 &&
        typeof body.status === "string" &&
        body.status !== ""
    );
}

export const isDeleteDeliveryBody = (body: any): body is IDeleteDelivery => {
    return (
        typeof body === "object" &&
        typeof body.deliveryID === "number" &&
        body.deliveryID !== 0
    )
}

export const isMarkAsDeliveredBody = (body: any): body is IDeleteDelivery => {
    return (
        typeof body === "object" &&
        typeof body.deliveryID === "number" &&
        body.deliveryID !== 0 &&
        typeof body.orderID === "number" &&
        body.orderID !== 0
    )
}

export const isChangeDeliveryMan = (body: any): body is IChangeDeliveryMan => {
    return (
        typeof body === "object" &&
        typeof body.userID === "number" &&
        body.userID !== 0 &&
        typeof body.deliveryID === "number" &&
        body.deliveryID !== 0
    )
}