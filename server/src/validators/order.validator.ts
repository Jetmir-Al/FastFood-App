import { IDeleteOrder, IOrderForm, ITakeToDeliver } from "../types/Order";


export const isOrderFormBody = (body: any): body is IOrderForm => {
    return (
        typeof body === "object" &&
        typeof body.address === "string" &&
        body.address !== "" &&
        typeof body.foodID === "number" &&
        body.foodID !== 0 &&
        typeof body.quantity === "number" &&
        body.quantity !== 0
    );
}

export const isTakeToDeliverBody = (body: any): body is ITakeToDeliver => {
    return (
        typeof body === "object" &&
        typeof body.orderID === "number" &&
        body.orderID !== 0
    );
}

export const isDeleteOrder = (body: any): body is IDeleteOrder => {
    return (
        typeof body === "object" &&
        typeof body.orderID === "number" &&
        body.orderID !== 0
    );
}



export const isCancelOrder = (body: any): body is ITakeToDeliver => {
    return (
        typeof body === "object" &&
        typeof body.orderID === "number" &&
        body.orderID !== 0
    );
}

