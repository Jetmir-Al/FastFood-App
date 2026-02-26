
export interface IUpdDelivery {
    deliveryID: number,
    userID: number,
    address: string,
    orderID: number,
    status: string
}

export interface IDeleteDelivery {
    deliveryID: number;
}

export interface IMarkAsDelivered {
    deliveryID: number;
    orderID: number;
}